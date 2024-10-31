'use client';

import React, { useState } from 'react';
import { AlbumData } from '../../../../utils/fetchCircleCharts';

export interface CircleChartsProps {
    target: string;
    global: AlbumData[];
    streaming: AlbumData[];
    retail: AlbumData[];
}

const CircleCharts: React.FC<CircleChartsProps> = ({ target, global, streaming, retail }) => {
    const [selectedAlbum, setSelectedAlbum] = useState<AlbumData | null>(null);

    const handleAlbumClick = (album: AlbumData) => {
        setSelectedAlbum(album);
    };

    const renderArtists = (artists: string | string[]) => {
        return Array.isArray(artists) ? artists.join(', ') : artists;
    };

    const renderChart = (chart: AlbumData[], chartTitle: string, bgColor: string, isRetail: boolean = false) => (
        <div className="w-full lg:w-1/3 px-4">
            <div className="mb-4">
                <h3 className={`text-lg font-semibold ${bgColor} p-2 rounded-md text-white text-center`}>{chartTitle}</h3>
            </div>
            <div className="max-h-80 overflow-y-auto">
                <table className="w-full table-fixed">
                    <tbody>
                        {chart
                            .sort((a, b) => a.rank - b.rank)
                            .slice(0, 100)
                            .map((album, index) => (
                                <tr
                                    key={index}
                                    className="cursor-pointer hover:bg-gray-200 transition-colors duration-200"
                                    onClick={() => handleAlbumClick(album)}
                                >
                                    <td className="px-1 py-2 w-8 text-center">{album.rank}</td>
                                    <td className="px-1 py-2 w-16">
                                        <img
                                            src={album.album_img}
                                            alt={album.album}
                                            className="w-10 h-10 object-cover rounded-md"
                                        />
                                    </td>
                                    <td className="px-1 py-2 truncate">
                                        {isRetail ? album.album : album.title}
                                    </td>
                                    <td className="px-1 py-2 text-xs text-gray-500 truncate">
                                        {renderArtists(album.artist)}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4 text-center">Circle Charts Data</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 text-center">※ 써클차트 데이터 ({target.slice(0, 4)}.{target.slice(4)})</p>

            <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-1">
                {renderChart(global, "Global Chart", "bg-gray-800")}
                {renderChart(streaming, "Streaming Chart", "bg-blue-500")}
                {renderChart(retail, "Retail Chart", "bg-green-500", true)}
            </div>

            {selectedAlbum && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 transition-opacity duration-300"
                    onClick={() => setSelectedAlbum(null)}
                >
                    <div
                        className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-2xl p-8 w-96 relative transform transition-transform duration-300 scale-105 hover:scale-100"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                            onClick={() => setSelectedAlbum(null)}
                        >
                            &#10005;
                        </button>
                        
                        <div className="text-center mb-6">
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Rank: <span className="font-bold">{selectedAlbum.rank}</span> ({selectedAlbum.rank_status})</p>
                            <img
                                src={selectedAlbum.album_img}
                                alt={selectedAlbum.album}
                                className="w-32 h-32 object-cover rounded-lg mx-auto shadow-md transform transition-transform duration-300 hover:scale-105"
                            />
                        </div>
                        
                        <h4 className="text-2xl font-extrabold text-center mb-2 text-gray-800 dark:text-gray-100">{selectedAlbum.title}</h4>
                        
                        <div className="flex flex-col items-center text-gray-700 dark:text-gray-300 space-y-2">
                            {selectedAlbum.album && (
                                <p className="text-sm">Album: <span className="font-semibold">{selectedAlbum.album}</span></p>
                            )}
                            {selectedAlbum.artist && (
                                <p className="text-sm">Artists: <span className="font-semibold">{renderArtists(selectedAlbum.artist)}</span></p>
                            )}
                            {selectedAlbum.production && selectedAlbum.production.length > 0 && (
                                <p className="text-sm">Production: <span className="font-semibold">{selectedAlbum.production.join(', ')}</span></p>
                            )}
                            {selectedAlbum.distribution && selectedAlbum.distribution.length > 0 && (
                                <p className="text-sm">Distribution: <span className="font-semibold">{selectedAlbum.distribution.join(', ')}</span></p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CircleCharts;
