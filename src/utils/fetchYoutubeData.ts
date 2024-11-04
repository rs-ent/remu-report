import { collection, getDocs, query, where, DocumentData } from 'firebase/firestore';
import { db } from '../firebase';

export interface Thumbnail {
    url: string;
    width: number;
    height: number;
}

export interface YoutubeVideo {
    id: string;
    artist_id: string;
    artist_name_eng: string;
    artist_name_kor: string;
    contentDetails: {
        caption: string;
        definition: string;
        dimension: string;
        duration: string;
        licensedContent: boolean;
        projection: string;
    };
    snippet: {
        categoryId: string;
        channelId: string;
        channelTitle: string;
        description: string;
        liveBroadcastContent: string;
        localized: {
        description: string;
        title: string;
        };
        publishedAt: string;
        tags: string[];
        thumbnails: {
        default: Thumbnail;
        medium: Thumbnail;
        high: Thumbnail;
        standard: Thumbnail;
        maxres: Thumbnail;
        };
        title: string;
    };
    statistics: {
        commentCount: string;
        favoriteCount: string;
        likeCount: string;
        viewCount: string;
    };
    timestamp: Date;
    youtube_channel_id: string;
}

export const fetchYoutubeData_ArtistID = async (artistId: string): Promise<YoutubeVideo[]> => {
  const youtubeCollection = collection(db, 'YoutubeVideos');
  const q = query(youtubeCollection, where('melon_artist_id', '==', artistId));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => {
    const data = doc.data() as DocumentData;
    return {
      id: data.id,
      artist_id: data.artist_id,
      artist_name_eng: data.artist_name_eng,
      artist_name_kor: data.artist_name_kor,
      contentDetails: data.contentDetails,
      snippet: data.snippet,
      statistics: data.statistics,
      timestamp: data.timestamp.toDate(),
      youtube_channel_id: data.youtube_channel_id,
    } as YoutubeVideo;
  });
};