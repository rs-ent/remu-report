// src/components/meso/YearDetail.tsx

import React from 'react';
import { YearlyData } from '@/utils/fetchHistoryData';
import YearDetailMusic from './YearItems/Music/YearDetailMusic';
import DetailCategory from './DetailCategory';
import PieChart from '@/components/micro/PieChart';
import { motion } from 'framer-motion';

interface Props {
  data: YearlyData;
}

const YearDetail: React.FC<Props> = ({ data }) => {
    // 수익 데이터 구성
    const earningsData = [
        {
          category: '음원/음반',
          amount: data.musicEarnings || 0,
        },
        {
          category: '공연/영상콘텐츠',
          amount: data.contentsEarning || 0,
        },
        {
          category: '출연료/초상권',
          amount: data.managementEarning || 0,
        },
    ];

    // 유튜브 비디오 및 공연 제목 추출
    const youtubeTitles = data.youtubeVideos.map((video) => video.snippet.title);
    const performanceTitles = data.performances.map((performance) => performance.title);
    const combinedPerformances = [...performanceTitles, ...youtubeTitles];

    console.log('Year Detail Data', data);

    return (
        <motion.div
          className="mt-8 p-8 rounded-2xl"
        >
            <h3 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white text-center">
                {data.year}년 활동 내역
            </h3>
            <div className="w-full mx-auto">
                {/* 음원/음반 섹션 */}
                <YearDetailMusic albums={data.albumReleases} songs={data.songReleases} analyses={data.albumCommentsAnalysis} />
                <DetailCategory
                    title="공연/영상콘텐츠"
                    items={combinedPerformances}
                    icon="video"
                />
                <DetailCategory
                    title="출연료/초상권"
                    items={[`총 수익: ₩${data.earnings.toLocaleString()}`]}
                    icon="star"
                />
            </div>
            {/* 수익 분포 차트 */}
            <div className="flex justify-center md:justify-start p-4 mt-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
              {/* 수익 분포 차트 */}  
              <PieChart data={earningsData} />
            </div>
        </motion.div>
    );

};

export default YearDetail;