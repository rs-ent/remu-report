"use client";

import React, { useEffect, useState, useRef } from 'react';
import MarketGrowthChart from '../../../../components/macro/MarketGrowthChart';
import { fetchMarketGrowthData, MarketGrowthData } from '../../../../utils/fetchMarketGrowth';
import { fetchAutoComments, AutoCommentData } from '../../../../utils/fetchAutoComments';
import Spinner from '../../../../components/Spinner';
import AnalystComment from '../../../../components/AnalystComment';
import MarketGrowthDetail from './MarketGrowthDetail';

export interface ProcessedData {
  id: string;
  date: string;
  company: string;
  sales: number;
  sales_music: number;
  sales_contents: number;
  sales_management: number;
  averageSales: number;
  salesGrowth: number;
  averageMusicSales: number;
  musicSalesGrowth: number;
  averageContentsSales: number;
  contentsSalesGrowth: number;
  averageManagementSales: number;
  managementSalesGrowth: number;
}

const Macro: React.FC = () => {
  const [marketData, setMarketData] = useState<ProcessedData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [autoComments, setAutoComments] = useState<AutoCommentData | null>(null);
  
  useEffect(() => {
    const getData = async () => {
      try {
        const data: MarketGrowthData[] = await fetchMarketGrowthData();
        const averageSalesData = calculateAverageAndGrowthByYear(data);
        console.log("Average Sales Data : ", averageSalesData);
        setMarketData(averageSalesData);

        const autoComments = await fetchAutoComments();
        console.log("Auto Comments : ", autoComments);
        setAutoComments(autoComments);
      } catch (err) {
        setError('데이터를 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  // 연도별 평균 및 성장률 계산 함수
  const calculateAverageAndGrowthByYear = (data: MarketGrowthData[]): ProcessedData[] => {
    const groupedByYear: Record<string, MarketGrowthData[]> = data.reduce((acc, cur) => {
      if (!acc[cur.date]) {
        acc[cur.date] = [];
      }
      acc[cur.date].push(cur);
      return acc;
    }, {} as Record<string, MarketGrowthData[]>);

    const sortedYears = Object.keys(groupedByYear).sort();

    const averageSalesByYear: ProcessedData[] = sortedYears.map((year, idx) => {
      const yearData = groupedByYear[year];

      // 총 매출 계산
      const totalSales = yearData.reduce((acc, cur) => acc + cur.sales, 0);
      const averageSales = totalSales / yearData.length;

      const totalMusicSales = yearData.reduce((acc, cur) => acc + (cur.sales_music || 0), 0);
      const averageMusicSales = totalMusicSales / yearData.length;

      const totalContentsSales = yearData.reduce((acc, cur) => acc + (cur.sales_contents || 0), 0);
      const averageContentsSales = totalContentsSales / yearData.length;

      const totalManagementSales = yearData.reduce((acc, cur) => acc + (cur.sales_management || 0), 0);
      const averageManagementSales = totalManagementSales / yearData.length;

      // 성장률 계산
      let salesGrowth = 0;
      let musicSalesGrowth = 0;
      let contentsSalesGrowth = 0;
      let managementSalesGrowth = 0;

      if (idx > 0) {
        const previousYear = sortedYears[idx - 1];
        const previousYearData = groupedByYear[previousYear];

        const previousAverageSales = previousYearData.reduce((acc, cur) => acc + cur.sales, 0) / previousYearData.length;
        salesGrowth = ((averageSales - previousAverageSales) / previousAverageSales) * 100;

        const previousAverageMusicSales =
          previousYearData.reduce((acc, cur) => acc + (cur.sales_music || 0), 0) / previousYearData.length;
        musicSalesGrowth = ((averageMusicSales - previousAverageMusicSales) / previousAverageMusicSales) * 100;

        const previousAverageContentsSales =
          previousYearData.reduce((acc, cur) => acc + (cur.sales_contents || 0), 0) / previousYearData.length;
        contentsSalesGrowth = ((averageContentsSales - previousAverageContentsSales) / previousAverageContentsSales) * 100;

        const previousAverageManagementSales =
          previousYearData.reduce((acc, cur) => acc + (cur.sales_management || 0), 0) / previousYearData.length;
        managementSalesGrowth = ((averageManagementSales - previousAverageManagementSales) / previousAverageManagementSales) * 100;
      }

      return {
        id: year,
        company: "any",
        date: year,
        sales: totalSales,
        sales_music: totalMusicSales,
        sales_contents: totalContentsSales,
        sales_management: totalManagementSales,
        averageSales,
        salesGrowth,
        averageMusicSales,
        musicSalesGrowth,
        averageContentsSales,
        contentsSalesGrowth,
        averageManagementSales,
        managementSalesGrowth,
      };
    });

    return averageSalesByYear;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner />
        <p className="ml-4 text-gray-500">데이터를 불러오는 중입니다...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        {error}{' '}
        <button onClick={() => window.location.reload()} className="ml-2 text-blue-500">
          재시도
        </button>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-1 text-primary">시장 성장률</h2>
      {marketData.length > 0 ? (
        <>
          <div className="w-full max-w-xl">
            <MarketGrowthChart data={marketData} />
            {/* 코멘트 섹션 */}
            <div className="mt-2 w-full max-w-xl relative">
              {/* 자동 생성된 코멘트 */}
              {autoComments && (
                <p className="text-xs text-gray-400 mb-2 text-center font-extralight">
                  {autoComments.comment_openai}
                </p>
              )}

              {/* 애널리스트의 코멘트 */}
              <AnalystComment commentKey="macro_marketGrowth_comment" />
            </div>
          </div>
          <MarketGrowthDetail auto_comment={autoComments?.detail_comment_openai} data={marketData} />
        </>
      ) : (
        <p className="text-center text-gray-500">시장 성장 데이터가 없습니다.</p>
      )}
    </div>
  );
};

export default Macro;
