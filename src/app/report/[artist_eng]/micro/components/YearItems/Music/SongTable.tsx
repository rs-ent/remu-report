import React from 'react';
import { SongData } from '@/utils/fetchSongs';
import { FaStream, FaUsers, FaChartBar } from 'react-icons/fa';

interface Props {
    songs: SongData[];
}

const SongTable: React.FC<Props> = ({ songs }) => {
    return (
        <div className="mt-4">
          <h6 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 flex items-center">
            <FaStream className="mr-2 text-blue-500" />
            곡 데이터
          </h6>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                    곡 제목
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                    스트리밍
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                    이용자 수
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                    인기도
                  </th>
                </tr>
              </thead>
              <tbody>
                {songs.map((song) => (
                  <tr key={song.song_id}>
                    <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300">
                      {song.song_title}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300">
                      <span className="inline-flex items-center">
                        <FaStream className="mr-1 text-blue-500" /> {song.streams.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300">
                      <span className="inline-flex items-center">
                        <FaUsers className="mr-1 text-green-500" /> {song.listeners.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300">
                      <span className="inline-flex items-center">
                        <FaChartBar className="mr-1 text-yellow-500" /> {song.spotify_popularity}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
    );
};

export default SongTable;