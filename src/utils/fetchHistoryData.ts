import { fetchReportById } from './fetchReport';
import { fetchDataByField } from './fetchData';

import { SongData } from './fetchSongs';
import { AlbumData } from './fetchAlbums';
import { YoutubeVideo } from './fetchYoutubeData';
import { YoutubeComment } from './fetchYoutubeComments';
import { Performance } from './fetchPerformance';
import { AlbumCommentsAnalysis } from './fetchAlbumCommentsAnalysis';
import { parse, getYear, isValid } from 'date-fns';

export interface YearlyData {
    year: number;
    albumReleases: AlbumData[];
    songReleases: SongData[];
    performances: Performance[];
    youtubeVideos: YoutubeVideo[];
    youtubeComments: YoutubeComment[];
    earnings: number;
    musicEarnings: number;
    contentsEarning: number;
    managementEarning: number;
    albumCommentsAnalysis: AlbumCommentsAnalysis[];
}

const EARNINGS_PER_ALBUM = 20000;
const EARNINGS_PER_STREAMS = 6;
const EARNINGS_PER_YOUTUBE_VIDEO = 4;

/**
 * YearlyData 초기화 함수
 * @param year 연도
 * @returns 초기화된 YearlyData 객체
 */
const initializeYearlyData = (year: number): YearlyData => ({
    year,
    albumReleases: [],
    songReleases: [],
    performances: [],
    youtubeVideos: [],
    youtubeComments: [],
    earnings: 0,
    musicEarnings: 0,
    contentsEarning: 0,
    managementEarning: 0,
    albumCommentsAnalysis: [],
});

// 가능한 날짜 형식 목록
const DATE_FORMATS = [
    "yyyy-MM-dd'T'HH:mm:ssX", // "2018-06-02T13:37:30Z"
    'yyyy-MM-dd',             // "2016-01-13"
    'yyyy.MM.dd',             // "2016.03.11"
    'yyyy.MM.dd.',            // "2017.05.31."
    'yyyy/MM/dd',             // "2016/03/11"
    'MM/dd/yyyy',             // "03/11/2016"
    'dd-MM-yyyy',             // "11-03-2016"
    // 필요에 따라 더 많은 형식 추가
];

/**
 * 날짜 문자열을 정제하여 파싱 가능한 형태로 변환
 * @param dateString 원본 날짜 문자열
 * @returns 정제된 날짜 문자열
 */
const sanitizeDateString = (dateString: string): string => {
    return dateString.trim().replace(/\.$/, ''); // 끝에 오는 점 제거
};

/**
 * 날짜에서 연도를 추출하는 함수
 * @param dateString 날짜 문자열
 * @param id 데이터 항목의 ID (로깅 용도)
 * @param type 데이터 항목의 타입 (로깅 용도)
 * @returns 추출된 연도 또는 null
 */
const extractYear = (dateString: string | undefined, id: string, type: string): number | null => {
    if (!dateString) {
        console.warn(`${type} ID ${id}에 날짜 문자열이 없습니다.`);
        return null;
    }

    const sanitizedDate = sanitizeDateString(dateString);

    for (const format of DATE_FORMATS) {
        try {
            const parsedDate = parse(sanitizedDate, format, new Date());
            if (isValid(parsedDate)) {
                return getYear(parsedDate);
            }
        } catch (error) {
            // 특정 형식에서 파싱 실패 시 계속 시도
            continue;
        }
    }

    // 모든 형식에서 파싱 실패
    console.warn(`${type} ID ${id}의 날짜 형식을 인식할 수 없습니다: ${dateString}`);
    return null;
};

export const fetchHistoryData = async (artistEng: string): Promise<YearlyData[]> => {
    // 1. 아티스트 정보 가져오기
    const report = await fetchReportById(artistEng);
    if (!report || !report.melon_artist_id) {
        throw new Error('Artist not found');
    }
    const artistId = report.melon_artist_id;

    // 2. 비동기적으로 모든 데이터 페칭
    const [
        songsResult,
        albumsResult,
        youtubeVideosResult,
        youtubeCommentsResult,
        performancesResult,
        albumCommentsAnalysesResult
    ] = await Promise.allSettled([
        fetchDataByField<SongData>('songs', 'artist_id', artistId),
        fetchDataByField<AlbumData>('albums', 'artist_id', artistId),
        fetchDataByField<YoutubeVideo>('YoutubeVideos', 'melon_artist_id', artistId),
        fetchDataByField<YoutubeComment>('YoutubeComments', 'melon_artist_id', artistId),
        fetchDataByField<Performance>('performance', 'melon_artist_id', artistId),
        fetchDataByField<AlbumCommentsAnalysis>('AlbumCommentsAnalysis', 'melon_artist_id', artistId),
    ]);

    const songs = songsResult.status === 'fulfilled' ? songsResult.value : [];
    const albums = albumsResult.status === 'fulfilled' ? albumsResult.value : [];
    const youtubeVideos = youtubeVideosResult.status === 'fulfilled' ? youtubeVideosResult.value : [];
    const youtubeComments = youtubeCommentsResult.status === 'fulfilled' ? youtubeCommentsResult.value : [];
    const performances = performancesResult.status === 'fulfilled' ? performancesResult.value : [];
    const albumCommentsAnalyses = albumCommentsAnalysesResult.status === 'fulfilled' ? albumCommentsAnalysesResult.value : [];

    // 3. Pre-group albums by year and album_id
    const dataMap: { [year: number]: YearlyData } = {};
    const albumsById = new Map<string, AlbumData>();

    albums.forEach((album) => {
        const releaseYear = extractYear(album.released_date, album.album_id, '앨범');
        if (releaseYear === null) return;

        albumsById.set(album.album_id, album); // album_id로 앨범 참조 가능

        if (!dataMap[releaseYear]) {
            dataMap[releaseYear] = initializeYearlyData(releaseYear);
        }

        const yearlyData = dataMap[releaseYear];
        const revenue = EARNINGS_PER_ALBUM * (typeof album.total_sales === 'number' ? album.total_sales : 0);
        yearlyData.earnings += revenue;
        yearlyData.musicEarnings += revenue;
        yearlyData.albumReleases.push(album);
    });

    // 4. Pre-group songs by album_id
    const songsByAlbumId = new Map<string, SongData[]>();
    songs.forEach((song) => {
        if (!song.album_id) {
            console.warn(`Song ID ${song.song_id}에 album_id가 없습니다.`);
            return;
        }
        if (!songsByAlbumId.has(song.album_id)) {
            songsByAlbumId.set(song.album_id, []);
        }
        songsByAlbumId.get(song.album_id)!.push(song);
    });

    // 5. Pre-group AlbumCommentsAnalysis by album_id
    const analysesByAlbumId = new Map<string, AlbumCommentsAnalysis[]>();
    albumCommentsAnalyses.forEach((analysis) => {
        if (!analysis.album_id) {
            console.warn(`AlbumCommentsAnalysis ID ${analysis.id}에 album_id가 없습니다.`);
            return;
        }
        if (!analysesByAlbumId.has(analysis.album_id)) {
            analysesByAlbumId.set(analysis.album_id, []);
        }
        analysesByAlbumId.get(analysis.album_id)!.push(analysis);
    });

    // 6. Assign Songs to their respective years based on album_id
    songsByAlbumId.forEach((songsList, albumId) => {
        const album = albumsById.get(albumId);
        if (!album) {
            console.warn(`album_id ${albumId}에 해당하는 앨범을 찾을 수 없습니다. 해당 album_id를 가진 Songs는 무시됩니다.`);
            return;
        }
        const releaseYear = extractYear(album.released_date, album.album_id, '앨범');
        if (releaseYear === null) return;

        const yearlyData = dataMap[releaseYear];
        songsList.forEach(song => {
            const revenue = EARNINGS_PER_STREAMS * (typeof song.streams === 'number' ? song.streams : 0);
            yearlyData.earnings += revenue;
            yearlyData.musicEarnings += revenue;
        })
        yearlyData.songReleases.push(...songsList);
    });

    // 7. Assign AlbumCommentsAnalysis to their respective years based on album_id
    analysesByAlbumId.forEach((analysesList, albumId) => {
        const album = albumsById.get(albumId);
        if (!album) {
            console.warn(`album_id ${albumId}에 해당하는 앨범을 찾을 수 없습니다. 해당 album_id를 가진 AlbumCommentsAnalysis는 무시됩니다.`);
            return;
        }
        const releaseYear = extractYear(album.released_date, album.album_id, '앨범');
        if (releaseYear === null) return;

        const yearlyData = dataMap[releaseYear];
        yearlyData.albumCommentsAnalysis.push(...analysesList);
    });

    // 8. Process YouTube Videos
    youtubeVideos.forEach((video) => {
        const publishYear = extractYear(video.snippet.publishedAt, video.id, '유튜브 비디오');
        if (publishYear === null) return;

        if (!dataMap[publishYear]) {
            dataMap[publishYear] = initializeYearlyData(publishYear);
        }

        const yearlyData = dataMap[publishYear];
        const revenue = EARNINGS_PER_YOUTUBE_VIDEO * Number(video.statistics.viewCount);
        yearlyData.earnings += revenue;
        yearlyData.contentsEarning += revenue;
        yearlyData.youtubeVideos.push(video);
    });

    // 9. Process YouTube Comments
    youtubeComments.forEach((comment) => {
        const commentYear = extractYear(comment.published_at, comment.id, '유튜브 댓글');
        if (commentYear === null) return;

        if (!dataMap[commentYear]) {
            dataMap[commentYear] = initializeYearlyData(commentYear);
        }

        const yearlyData = dataMap[commentYear];
        yearlyData.youtubeComments.push(comment);
    });

    // 10. Process Performances
    console.log("PERFORMANCES : ", performances);
    const filteredPerformances = performances.filter((p: Performance) => {
        const revenueNumber = p.revenue ? Number(p.revenue.replace(/,/g, "")) : NaN;
        return !isNaN(revenueNumber) && revenueNumber !== 0;
    });

    console.log("FILTERED PERFORMANCES : ", filteredPerformances);
    
    const performanceRevenues: number[] = filteredPerformances.map((p: Performance) =>
        Number(p.revenue.replace(/,/g, "")) // Remove commas and parse directly
    );
    performanceRevenues.sort((a, b) => a - b);
    
    let medianRevenue: number;
    const mid = Math.floor(performanceRevenues.length / 2);

    if (performanceRevenues.length === 0) {
        medianRevenue = 0; // Handle case with no valid revenues
        console.log("No valid revenues found. Median Revenue: ", medianRevenue);
    } else if (performanceRevenues.length % 2 === 0) {
        // If even, median is the average of the two middle values
        medianRevenue = (performanceRevenues[mid - 1] + performanceRevenues[mid]) / 2;
        console.log("Even number of revenues. Median Revenue: ", medianRevenue);
    } else {
        // If odd, median is the middle value
        medianRevenue = performanceRevenues[mid];
        console.log("Odd number of revenues. Median Revenue: ", medianRevenue);
    }

    console.log("MEDIAN PERFORMANCE REVENUE: ", medianRevenue);

    performances.forEach((performance) => {
        const startYear = extractYear(performance.start_period, performance.id, '공연');
        if (startYear === null) return;

        if (!dataMap[startYear]) {
            dataMap[startYear] = initializeYearlyData(startYear);
        }

        const yearlyData = dataMap[startYear];
        const revenueStr = performance.revenue?.replace(/,/g, '') || '0';
        const revenue = Number(revenueStr);
        if (isNaN(revenue)) {
            console.warn(`공연 ID ${performance.id}의 revenue 형식이 유효하지 않습니다: ${performance.revenue}`);
            return;
        }

        yearlyData.earnings += medianRevenue;
        yearlyData.contentsEarning += medianRevenue;
        yearlyData.performances.push(performance);
    });

    // 11. Convert dataMap to sorted YearlyData array
    const structuredData: YearlyData[] = Object.values(dataMap)
        .sort((a, b) => a.year - b.year);

    return structuredData;
};