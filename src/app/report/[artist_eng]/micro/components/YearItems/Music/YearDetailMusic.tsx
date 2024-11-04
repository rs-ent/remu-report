import React from 'react';
import { YearlyData } from '@/utils/fetchHistoryData';
import { AlbumData } from '@/utils/fetchAlbums';
import { SongData } from '@/utils/fetchSongs';
import { AlbumCommentsAnalysis } from '@/utils/fetchAlbumCommentsAnalysis';
import AlbumCard from './AlbumCard';
import { motion } from 'framer-motion';

interface Props {
  albums: AlbumData[];
  songs: SongData[];
  analyses: AlbumCommentsAnalysis[];
}

const YearDetailMusic: React.FC<Props> = ({ albums, songs, analyses }) => {
  console.log('Analyses : ', analyses);
  return (
    <motion.div
      className="mt-8 p-8 rounded-2xl"
    >
      {albums.length > 0 &&(
        <>
          <h4 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white text-center flex items-center justify-center">
            음원/음반
          </h4>
          <div className="w-full mx-auto">
            {albums.map((album) => (
              <AlbumCard key={album.album_id} album={album} songs={songs.filter(song => song.album_id === album.album_id)} analysis={analyses?.find(analysis => analysis.album_id === album.album_id) || undefined} />
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
};
  
export default YearDetailMusic;