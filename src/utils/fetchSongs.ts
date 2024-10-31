import { collection, getDocs, query, where, DocumentData } from 'firebase/firestore';
import { db } from '../firebase';

export interface SongData {
    album: string;
    album_id: string;
    album_title: string;
    artist_id: string;
    artist_name: string;
    creators: { id: string; name: string; type: string }[];
    flac_info: string;
    genre: string[];
    hearts: number;
    listeners: number;
    lyrics: string;
    related_videos: string[];
    release_date: string;
    released_date: string;
    song_id: string;
    song_title: string;
    spotify_album_image_url: string;
    spotify_album_name: string;
    spotify_album_release_date: string;
    spotify_album_total_tracks: number;
    spotify_album_url: string;
    spotify_artists: { spotify_id: string; spotify_name: string; spotify_url: string }[];
    spotify_audio_features: {
        acousticness: number;
        danceability: number;
        duration_ms: number;
        energy: number;
        instrumentalness: number;
        key: number;
        liveness: number;
        loudness: number;
        mode: number;
        speechiness: number;
        tempo: number;
        time_signature: number;
        valence: number;
    };
    spotify_id: string;
    spotify_isrc: string;
    spotify_popularity: number;
    spotify_preview_url: string;
    spotify_track_duration_ms: number;
    spotify_track_name: string;
    spotify_track_number: number;
    spotify_track_url: string;
    streams: number;
    timestamp: string;
}

export const fetchSongsData_ArtistID = async (artistId: string): Promise<SongData[]> => {
    const songsCollection = collection(db, 'songs');
    const q = query(songsCollection, where("artist_id", "==", artistId));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => {
        const data = doc.data() as DocumentData;
        return {
            album: data.album,
            album_id: data.album_id,
            album_title: data.album_title,
            artist_id: data.artist_id,
            artist_name: data.artist_name,
            creators: data.creators,
            flac_info: data.flac_info,
            genre: data.genre,
            hearts: data.hearts,
            listeners: data.listeners,
            lyrics: data.lyrics,
            related_videos: data.related_videos,
            release_date: data.release_date,
            released_date: data.released_date,
            song_id: data.song_id,
            song_title: data.song_title,
            spotify_album_image_url: data.spotify_album_image_url,
            spotify_album_name: data.spotify_album_name,
            spotify_album_release_date: data.spotify_album_release_date,
            spotify_album_total_tracks: data.spotify_album_total_tracks,
            spotify_album_url: data.spotify_album_url,
            spotify_artists: data.spotify_artists,
            spotify_audio_features: data.spotify_audio_features,
            spotify_id: data.spotify_id,
            spotify_isrc: data.spotify_isrc,
            spotify_popularity: data.spotify_popularity,
            spotify_preview_url: data.spotify_preview_url,
            spotify_track_duration_ms: data.spotify_track_duration_ms,
            spotify_track_name: data.spotify_track_name,
            spotify_track_number: data.spotify_track_number,
            spotify_track_url: data.spotify_track_url,
            streams: data.streams,
            timestamp: data.timestamp,
        };
    });
};

export const fetchSongsData_SongID = async (songId: string): Promise<SongData[]> => {
    const songsCollection = collection(db, 'songs');
    const q = query(songsCollection, where("song_id", "==", songId));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => {
        const data = doc.data() as DocumentData;
        return {
            album: data.album,
            album_id: data.album_id,
            album_title: data.album_title,
            artist_id: data.artist_id,
            artist_name: data.artist_name,
            creators: data.creators,
            flac_info: data.flac_info,
            genre: data.genre,
            hearts: data.hearts,
            listeners: data.listeners,
            lyrics: data.lyrics,
            related_videos: data.related_videos,
            release_date: data.release_date,
            released_date: data.released_date,
            song_id: data.song_id,
            song_title: data.song_title,
            spotify_album_image_url: data.spotify_album_image_url,
            spotify_album_name: data.spotify_album_name,
            spotify_album_release_date: data.spotify_album_release_date,
            spotify_album_total_tracks: data.spotify_album_total_tracks,
            spotify_album_url: data.spotify_album_url,
            spotify_artists: data.spotify_artists,
            spotify_audio_features: data.spotify_audio_features,
            spotify_id: data.spotify_id,
            spotify_isrc: data.spotify_isrc,
            spotify_popularity: data.spotify_popularity,
            spotify_preview_url: data.spotify_preview_url,
            spotify_track_duration_ms: data.spotify_track_duration_ms,
            spotify_track_name: data.spotify_track_name,
            spotify_track_number: data.spotify_track_number,
            spotify_track_url: data.spotify_track_url,
            streams: data.streams,
            timestamp: data.timestamp,
        };
    });
};

export const fetchSongsData_AlbumID = async (albumId: string): Promise<SongData[]> => {
    const songsCollection = collection(db, 'songs');
    const q = query(songsCollection, where("album_id", "==", albumId));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => {
        const data = doc.data() as DocumentData;
        return {
            album: data.album,
            album_id: data.album_id,
            album_title: data.album_title,
            artist_id: data.artist_id,
            artist_name: data.artist_name,
            creators: data.creators,
            flac_info: data.flac_info,
            genre: data.genre,
            hearts: data.hearts,
            listeners: data.listeners,
            lyrics: data.lyrics,
            related_videos: data.related_videos,
            release_date: data.release_date,
            released_date: data.released_date,
            song_id: data.song_id,
            song_title: data.song_title,
            spotify_album_image_url: data.spotify_album_image_url,
            spotify_album_name: data.spotify_album_name,
            spotify_album_release_date: data.spotify_album_release_date,
            spotify_album_total_tracks: data.spotify_album_total_tracks,
            spotify_album_url: data.spotify_album_url,
            spotify_artists: data.spotify_artists,
            spotify_audio_features: data.spotify_audio_features,
            spotify_id: data.spotify_id,
            spotify_isrc: data.spotify_isrc,
            spotify_popularity: data.spotify_popularity,
            spotify_preview_url: data.spotify_preview_url,
            spotify_track_duration_ms: data.spotify_track_duration_ms,
            spotify_track_name: data.spotify_track_name,
            spotify_track_number: data.spotify_track_number,
            spotify_track_url: data.spotify_track_url,
            streams: data.streams,
            timestamp: data.timestamp,
        };
    });
};