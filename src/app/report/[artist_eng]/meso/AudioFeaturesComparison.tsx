// src/components/AudioFeaturesComparison.tsx

'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { fetchSongsData_ArtistID, fetchSongsData_AlbumID, SongData } from '../../../../utils/fetchSongs';
import AudioFeaturesRadarChart from '../../../../components/meso/AudioFeaturesRadarChart';
import Spinner from '../../../../components/Spinner';
import ErrorMessage from '../../../../components/ErrorMessage';
import AudioFeaturesScatterPlot from '../../../../components/meso/AudioFeaturesScatterPlot';
import { CircleChartData } from '../../../../utils/fetchCircleCharts';

interface AudioFeaturesComparisonProps {
    melon_artist_id: string;
    circlechart_data: CircleChartData;
}

interface AudioFeatures {
    [key: string]: number;
}

const AudioFeaturesComparison: React.FC<AudioFeaturesComparisonProps> = ({ melon_artist_id, circlechart_data }) => {
    const [targetArtistSongs, setTargetArtistSongs] = useState<SongData[]>([]);
    const [similarGenreSongs, setSimilarGenreSongs] = useState<SongData[]>([]);
    const [features] = useState<(keyof SongData['spotify_audio_features'])[]>([
        'acousticness',
        'danceability',
        'energy',
        'liveness',
        'speechiness',
        'valence',
    ]);
    const [radarData, setRadarData] = useState<{ label: string; values: AudioFeatures }[]>([]);
    const [scatterData, setScatterData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Memoize songIds to prevent recalculations unless circlechart_data changes
    const songIds: string[] = useMemo(() => {
        return [
            ...circlechart_data.global_chart,
            ...circlechart_data.streaming_chart,
            ...circlechart_data.retail_chart,
        ]
        .filter((song) => song.melon_album_id)
        .map((song) => song.melon_album_id);
    }, [circlechart_data]);

    const translateFeature = (feature: string): string => {
        const translations: { [key: string]: string } = {
            acousticness: '자연음향',
            danceability: '리듬감',
            energy: '강렬함',
            liveness: '현장감',
            speechiness: '음성비중',
            valence: '감성적온도',
        };
        return translations[feature] || feature;
    };    

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                // 타겟 아티스트 곡 데이터 가져오기
                const targetSongs = await fetchSongsData_ArtistID(melon_artist_id);
                setTargetArtistSongs(targetSongs);

                const targetGenres = new Set<string>();
                targetSongs.forEach(song => {
                    song.genre.forEach(g => targetGenres.add(g));
                });

                // songIds로 fetchSongs 호출하여 유사 장르 곡 가져오기
                const allSongs = await Promise.all(songIds.map(id => fetchSongsData_AlbumID(id)));
                const flatSongs = allSongs.flat(); // 중첩 배열 평탄화

                const filteredSongs = flatSongs.filter(song =>
                    song.genre.some(genre => targetGenres.has(genre))
                );

                console.log("targetGenres", targetGenres);
                console.log("filteredSongs : ", filteredSongs);

                setSimilarGenreSongs(filteredSongs);
            } catch (err) {
                console.error('데이터를 가져오는 중 오류 발생:', err);
                setError('데이터를 가져오는 중 오류가 발생했습니다.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [melon_artist_id, songIds]);

    // 오디오 특징 평균 계산 함수
    const calculateAverageFeatures = (songs: SongData[]): AudioFeatures => {
        const featureSums: AudioFeatures = {};
        features.forEach(feature => {
            featureSums[feature] = 0;
        });

        songs.forEach(song => {
            features.forEach(feature => {
                const value = song.spotify_audio_features?.[feature];
                featureSums[feature] += typeof value === 'number' ? value : 0;
            });
        });

        const featureAverages: AudioFeatures = {};
        features.forEach(feature => {
            featureAverages[feature] = songs.length > 0 ? featureSums[feature] / songs.length : 0;
        });

        return featureAverages;
    };

    useEffect(() => {
        if (targetArtistSongs.length > 0 && similarGenreSongs.length > 0) {
            const targetAverageFeatures = calculateAverageFeatures(targetArtistSongs);
            const similarAverageFeatures = calculateAverageFeatures(similarGenreSongs);

            const radarData = [
                { label: targetArtistSongs[0].artist_name, values: targetAverageFeatures },
                { label: '장르 평균', values: similarAverageFeatures },
            ];

            setRadarData(radarData);
        } else {
            setRadarData([]);
        }
    }, [targetArtistSongs, similarGenreSongs, features]);

    // 스트리밍 수와 오디오 특징의 상관관계 데이터 준비
    useEffect(() => {
        if (similarGenreSongs.length > 0) {
            const data = similarGenreSongs.map(song => ({
                energy: song.spotify_audio_features.energy,
                danceability: song.spotify_audio_features.danceability,
                acousticness: song.spotify_audio_features.acousticness,
                liveness: song.spotify_audio_features.liveness,
                speechiness: song.spotify_audio_features.speechiness,
                valence: song.spotify_audio_features.valence,
                streaming_count: song.streams, // 가정: streaming_count 필드 존재
                artist: song.artist_name,
                song: song.song_title,
            })).filter(song => song.streaming_count !== undefined && song.streaming_count !== null);

            setScatterData(data);
        } else {
            setScatterData([]);
        }
    }, [similarGenreSongs]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Spinner />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <ErrorMessage message={error} />
            </div>
        );
    }

    return (
        <div className="audio-features-comparison p-1 space-y-12 max-w-7xl mx-auto">
            {/* 차트인한 곡들의 분석 섹션 */}
            <section>
                <div className="flex flex-col lg:flex-row justify-around items-center space-y-4 lg:space-y-0 lg:space-x-0 mx-auto">
                    <div className="w-full lg:w-1/2 p-1 rounded-lg">
                        <AudioFeaturesRadarChart
                            data={radarData}
                            features={features}
                            width={500}
                            height={400}
                        />
                    </div>
                    <div className="w-full lg:w-1/2 p-1 rounded-lg">
                        <AudioFeaturesScatterPlot
                            data={scatterData}
                            key="energy"
                            yKey="streaming_count"
                            width={500}
                            height={400}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AudioFeaturesComparison;
