// src/utils/fetchPerformance.ts

import { collection, getDocs, query, where, DocumentData } from 'firebase/firestore';
import { db } from '../firebase';

export interface Performance {
    id: string;
    artist_id: string;
    artist_name_eng: string;
    artist_name_kor: string;
    concert_url: string | null;
    end_period: string;
    image_alt: string | null;
    image_url: string | null;
    location: string | null;
    melon_artist_id: string;
    revenue: string;
    start_period: string;
    timestamp: Date;
    title: string;
}

export const fetchPerformanceData_ArtistID = async (artistId: string): Promise<Performance[]> => {
  const performanceCollection = collection(db, 'performance');
  const q = query(performanceCollection, where('artist_id', '==', artistId));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => {
    const data = doc.data() as DocumentData;
    return {
      id: data.id,
      artist_id: data.artist_id,
      artist_name_eng: data.artist_name_eng,
      artist_name_kor: data.artist_name_kor,
      concert_url: data.concert_url,
      end_period: data.end_period,
      image_alt: data.image_alt,
      image_url: data.image_url,
      location: data.location,
      melon_artist_id: data.melon_artist_id,
      revenue: data.revenue,
      start_period: data.start_period,
      timestamp: data.timestamp.toDate(),
      title: data.title,
    } as Performance;
  });
};