import React from 'react';
import { AlbumData } from '@/utils/fetchAlbums';
import { SongData } from '@/utils/fetchSongs';
import { AlbumCommentsAnalysis } from '@/utils/fetchAlbumCommentsAnalysis';
import { motion } from 'framer-motion';
import { FaCompactDisc, FaChartLine } from 'react-icons/fa';
import AudioFeaturesChart from './AudioFeaturesChart';
import SongTable from './SongTable';
import WordCloudChart from './WordCloudChart';

interface Props {
    album: AlbumData;
    songs: SongData[];
    analysis?: AlbumCommentsAnalysis;
}
  
const AlbumCard: React.FC<Props> = ({ album, songs, analysis }) => {
  // 카테고리별 데이터 준비
  const categoryData = Object.keys(analysis?.classified_keywords || {}).map(key => ({
    category: key,
    count: analysis?.classified_keywords[key] || 0,
  }));

  // 워드클라우드용 데이터 준비
  const keywordFrequency = analysis?.keyword_frequency || {};
  const words = Object.keys(keywordFrequency).map(key => ({
    text: key,
    value: keywordFrequency[key] * 5, // 워드클라우드 시각화를 위해 값 조정
  }));

  return (
    <motion.div
      className="w-full bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mt-4 mb-4"
    >
      {/* Top Section: Album Image and Details */}
      <div className="flex flex-col md:flex-row">
        {/* Album Image */}
        <div className="md:w-1/3 w-full h-16 md:h-auto relative">
          {album.album_image_url ? (
            <img
              src={album.album_image_url.split('?')[0]}
              alt={`${album.album_title} Cover`}
              className="object-cover w-full h-full rounded-t-lg md:rounded-l-lg md:rounded-t-none"
            />
          ) : (
            <div className="w-full h-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
              <FaCompactDisc className="text-7xl text-gray-500" />
            </div>
          )}
        </div>
  
        {/* Album Details */}
        <div className="md:w-2/3 w-full p-6 flex flex-col justify-between">
          <div>
            <h5 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
              {album.album_title}
            </h5>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              발매일: {album.released_date} | 장르: {album.genre.join(', ')}
            </p>
          </div>
          {album.total_sales && (
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              판매량: <span className="font-semibold">₩{album.total_sales.toLocaleString()}원</span>
            </p>
          )}
          <p className="text-sm text-gray-500 dark:text-gray-400">곡 수: {album.track_count}</p>
        </div>
      </div>
  
      {/* Song Table, Audio Features, and Visualizations */}
      <div className="px-6 pb-6 bg-gray-50 dark:bg-gray-900 rounded-b-lg">
        <div className="w-full">
          <div>
            <SongTable songs={songs} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AudioFeaturesChart songs={songs} />
            <WordCloudChart words={words} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AlbumCard;