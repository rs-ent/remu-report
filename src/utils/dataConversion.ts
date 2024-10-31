// src/utils/dataConversion.ts

import { AlbumData } from './fetchCircleCharts';
import { SongData } from './fetchSongs';

export const convertAlbumDataToSongData = (album: AlbumData): SongData => {
    return {
        album: album.album,
        album_id: album.melon_album_id,
        album_title: album.album,
        artist_id: "", // 기본값 또는 적절한 값을 설정합니다.
        artist_name: Array.isArray(album.artist) ? album.artist.join(', ') : album.artist, // 수정된 부분
        creators: [],
        flac_info: "",
        genre: [], // 필요에 따라 장르 데이터 채우기
        hearts: 0,
        listeners: 0,
        lyrics: "",
        related_videos: [],
        release_date: "",
        released_date: "",
        song_id: "", // 기본값 또는 적절한 값을 설정합니다.
        song_title: album.title,
        spotify_album_image_url: album.album_img,
        spotify_album_name: album.album,
        spotify_album_release_date: "",
        spotify_album_total_tracks: 0,
        spotify_album_url: album.melon_album_url,
        spotify_artists: [],
        spotify_audio_features: {
            acousticness: 0,
            danceability: 0,
            duration_ms: 0,
            energy: 0,
            instrumentalness: 0,
            key: 0,
            liveness: 0,
            loudness: 0,
            mode: 0,
            speechiness: 0,
            tempo: 0,
            time_signature: 0,
            valence: 0,
        },
        spotify_id: "",
        spotify_isrc: "",
        spotify_popularity: 0,
        spotify_preview_url: "",
        spotify_track_duration_ms: 0,
        spotify_track_name: album.title,
        spotify_track_number: 1,
        spotify_track_url: album.melon_album_url,
        streams: 0,
        timestamp: new Date().toISOString(),
    };
};
