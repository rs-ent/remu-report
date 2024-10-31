import { collection, getDocs, query, where, DocumentData } from 'firebase/firestore';
import { db } from '../firebase';

export interface AlbumData {
    album: string;
    album_img: string;
    artist: string[];
    distribution: string[];
    melon_album_id: string;
    melon_album_url: string;
    production: string[];
    rank: number;
    rank_status: string;
    seq_mom: string;
    title: string;
}

export interface CircleChartData {
    id: string;
    target: string;
    timestamp: string;
    global_chart: AlbumData[];
    streaming_chart: AlbumData[];
    retail_chart: AlbumData[];
}

const fixAlbumImgUrl = (url: string): string => {
    if (url.startsWith('https://circlechart.kr/uploadDir/')) return url;
    const split_url = url.split('thumb/');
    return `https://circlechart.kr/uploadDir/albumImg/thumb/${split_url[1]}`;
};

export const fetchCircleChartsData = async (target: string): Promise<CircleChartData | null> => {
    const circleChartsCollection = collection(db, 'CircleCharts');
    const q = query(circleChartsCollection, where("target", "==", target));
    const querySnapshot = await getDocs(q);

    const doc = querySnapshot.docs[0];
    if (!doc) return null;
    
    const docData = doc.data();
    return {
        id: doc.id,
        target: docData.target,
        timestamp: docData.timestamp,
        global_chart: docData.global.map((album: DocumentData) => ({
            album: album.album,
            album_img: fixAlbumImgUrl(album.album_img),
            artist: album.artist,
            distribution: album.distribution,
            melon_album_id: album.melon_album_id,
            melon_album_url: album.melon_album_url,
            production: album.production,
            rank: album.rank,
            rank_status: album.rank_status,
            seq_mom: album.seq_mom,
            title: album.title,
        })),
        streaming_chart: docData.streaming.map((album: DocumentData) => ({
            album: album.album,
            album_img: fixAlbumImgUrl(album.album_img),
            artist: album.artist,
            distribution: album.distribution,
            melon_album_id: album.melon_album_id,
            melon_album_url: album.melon_album_url,
            production: album.production,
            rank: album.rank,
            rank_status: album.rank_status,
            seq_mom: album.seq_mom,
            title: album.title,
        })),
        retail_chart: docData.retail.map((album: DocumentData) => ({
            album: album.album,
            album_img: fixAlbumImgUrl(album.album_img),
            artist: album.artist,
            distribution: album.distribution,
            melon_album_id: album.melon_album_id,
            melon_album_url: album.melon_album_url,
            production: album.production,
            rank: album.rank,
            rank_status: album.rank_status,
            seq_mom: album.seq_mom,
            title: album.title,
        })),
    };
};