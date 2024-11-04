// src/utils/fetchAlbums.ts

import { collection, getDocs, query, where, DocumentData } from 'firebase/firestore';
import { db } from '../firebase';

export interface Track {
    song_id: string;
    song_title: string;
}

export interface Comment {
    album_id: string;
    album_title: string;
    comment: string;
    createdAt: string;
    released_date: string;
    user_id: string;
    user_name: string;
}

export interface AlbumData {
    album_id: string;
    album_title: string;
    album_type: string;
    artist_id: string;
    artist_name: string;
    comments_count: number;
    distribution: string;
    genre: string[];
    likes: number;
    production: string;
    rating: number;
    rating_count: number;
    rating_ppp: number;
    released_date: string;
    seq_aoa: string;
    timestamp: Date;
    total_sales: number;
    total_sales_month: string;
    total_sales_year: string;
    track_count: number;
    tracks: Track[];
    album_image_url?: string;
    comments?: Comment[];
}

export const fetchAlbumsData_ArtistID = async (artistId: string): Promise<AlbumData[]> => {
  const albumsCollection = collection(db, 'albums');
  const q = query(albumsCollection, where('artist_id', '==', artistId));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => {
    const data = doc.data() as DocumentData;
    return {
      album_id: data.album_id,
      album_title: data.album_title,
      album_type: data.album_type,
      artist_id: data.artist_id,
      artist_name: data.artist_name,
      comments_count: data.comments_count,
      distribution: data.distribution,
      genre: data.genre,
      likes: data.likes,
      production: data.production,
      rating: data.rating,
      rating_count: data.rating_count,
      rating_ppp: data.rating_ppp,
      released_date: data.released_date,
      seq_aoa: data.seq_aoa,
      timestamp: data.timestamp.toDate(),
      total_sales: data.total_sales,
      total_sales_month: data.total_sales_month,
      total_sales_year: data.total_sales_year,
      track_count: data.track_count,
      tracks: data.tracks,
      album_image_url: data.album_image_url,
      comments: data.comments,
    } as AlbumData;
  });
};