// src/utils/fetchYoutubeComments.ts

import { collection, getDocs, query, where, DocumentData } from 'firebase/firestore';
import { db } from '../firebase';

export interface YoutubeComment {
    id: string;
    artist_id: string;
    artist_name_eng: string;
    artist_name_kor: string;
    author: string;
    like_count: number;
    melon_artist_id: string;
    published_at: string;
    text: string;
    timestamp: Date;
    video_id: string;
    youtube_channel_id: string;
}

export const fetchYoutubeComments_ArtistID = async (artistId: string): Promise<YoutubeComment[]> => {
  const commentsCollection = collection(db, 'YoutubeComments');
  const q = query(commentsCollection, where('melon_artist_id', '==', artistId));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => {
    const data = doc.data() as DocumentData;
    return {
      id: data.id,
      artist_id: data.artist_id,
      artist_name_eng: data.artist_name_eng,
      artist_name_kor: data.artist_name_kor,
      author: data.author,
      like_count: data.like_count,
      melon_artist_id: data.melon_artist_id,
      published_at: data.published_at,
      text: data.text,
      timestamp: data.timestamp.toDate(),
      video_id: data.video_id,
      youtube_channel_id: data.youtube_channel_id,
    } as YoutubeComment;
  });
};