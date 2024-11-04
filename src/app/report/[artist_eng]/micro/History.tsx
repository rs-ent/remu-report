'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useReportContext } from '../../../../context/ReportContext';
import { YearlyData } from '@/utils/fetchHistoryData';
import Timeline from './components/Timeline';
import YearDetail from './components/YearDetail';
import RevenueChart from '@/components/micro/RevenueChart';
import { fetchHistoryData } from '@/utils/fetchHistoryData';

const History: React.FC = () => {
    const [historyData, setHistoryData] = useState<YearlyData[]>([]);
    const [selectedYear, setSelectedYear] = useState<number | null>(null);

    const params = useParams();
    const router = useRouter();
    const { report, error, getReportByArtistEng, setReport } = useReportContext();
    const artistEngParam = params.artist_eng;
    const artist_eng = typeof artistEngParam === 'string' ? artistEngParam : undefined;

    useEffect(() => {
        const getData = async () => {
          try {
            if (artist_eng) {
              const data = await fetchHistoryData(artist_eng);
              console.log("History Data", data);
              setHistoryData(data);
            } else {
              console.warn('Artist name is undefined.');
            }
          } catch (error) {
            console.error('Error fetching history data:', error);
          }
        };
      
        getData();
    }, [artist_eng]);

    const handleYearSelect = (year: number) => {
        setSelectedYear(year);
    };

    const currentYearData = selectedYear
    ? historyData.find((data) => data.year === selectedYear)
    : null;

    console.log('Selected Year', selectedYear);
    console.log('History Current Year Data', currentYearData);

    return (
        <div className="revenue-timeline-container">
            <RevenueChart data={historyData} selectedYear={selectedYear} onYearSelect={handleYearSelect} />
            <Timeline data={historyData} selectedYear={selectedYear} onYearSelect={handleYearSelect} />
            {/* 상세 정보 */}
            {currentYearData && (
                <YearDetail data={currentYearData} />
            )}
        </div>
    );
}

export default History;
