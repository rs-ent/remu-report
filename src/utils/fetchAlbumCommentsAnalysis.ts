export interface AlbumCommentsAnalysis {
    id: string;
    album_id: string;
    album_title: string;
    artist_id: string;
    artist_name: string;
    artist_name_eng: string;
    classified_keywords: {
      [key: string]: number;
    };
    keyword_categories: {
      [key: string]: {
        category: string;
        frequency: number;
      };
    };
    keyword_frequency: {
      [key: string]: number;
    };
    timestamp: Date;
    total_comments: number;
  }