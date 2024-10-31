'use client';

import React, { useEffect, useState } from 'react';
import { fetchCircleChartsData, CircleChartData } from '../../../../utils/fetchCircleCharts';
import CircleCharts from './CircleCharts';
import AudioFeaturesComparison from './AudioFeaturesComparison';
import Spinner from '../../../../components/Spinner';
import ErrorMessage from '../../../../components/ErrorMessage';
import Divider from '@/components/Divider';
import AnalystComment from '@/components/AnalystComment';

import { useReportContext } from '../../../../context/ReportContext';
import { fetchReportById } from '@/utils/fetchReport';
import { useParams, useRouter } from 'next/navigation';

const Meso: React.FC = () => {
    const [circleChartData, setCircleChartData] = useState<CircleChartData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [circlechart_target, set_circlechart_target] = useState<string | undefined>(undefined);
    const [melon_artist_id, set_melon_artist_id] = useState<string | undefined>(undefined);
    
    const params = useParams();
    const router = useRouter();
    const { report, error, getReportByArtistEng, setReport } = useReportContext();
    const artistEngParam = params.artist_eng;
    const artist_eng = typeof artistEngParam === 'string' ? artistEngParam : undefined;

    useEffect(() => {
        console.log(artist_eng);
    
        if (!artist_eng) {
          router.push('/404');
          return;
        }
    
        const fetchData = async () => {
          if (!report) {
            try {
              const newReport = await fetchReportById(artist_eng);
              if (newReport) {
                setReport(newReport); // 직접 setReport를 호출하여 context의 report 업데이트
                set_circlechart_target(newReport.circlechart_target || undefined);
                set_melon_artist_id(newReport.melon_artist_id || undefined);
              } else {
                router.push('/404'); // 해당 데이터를 찾을 수 없는 경우 404로 리다이렉트
              }
            } catch (error) {
              console.error('Failed to fetch report:', error);
            }
          } else {
            getReportByArtistEng(artist_eng); // 기존 reports 데이터가 있으면 이 함수 사용
            set_circlechart_target(report.circlechart_target || undefined);
            set_melon_artist_id(report.melon_artist_id || undefined);
          }
        };
    
        fetchData();
    }, [artist_eng, report, getReportByArtistEng, router, setReport]);

    useEffect(() => {
        const getData = async () => {
            if (!circlechart_target) return;
            setLoading(true);
            const fetchedData = await fetchCircleChartsData(circlechart_target);
            setCircleChartData(fetchedData);
            setLoading(false);
        };

        getData();
    }, [circlechart_target]);

    if (loading) return (
        <div className="flex items-center justify-center h-screen">
            <Spinner />
        </div>
    );

    return (
        <div className="p-6">
            {/* CircleCharts 컴포넌트에 데이터 전달 */}
            {circleChartData && circlechart_target && melon_artist_id ? (
                <>
                <CircleCharts 
                    target={circlechart_target} 
                    global={circleChartData.global_chart} 
                    streaming={circleChartData.streaming_chart} 
                    retail={circleChartData.retail_chart} 
                />
                <Divider opacity={0.5} marginTop="1rem" marginBottom="1rem" color="blue-500" />
                <AudioFeaturesComparison
                    melon_artist_id={melon_artist_id}
                    circlechart_data={circleChartData}
                />
                <AnalystComment commentKey="meso_circlechart_comment" />
                </>
            ) : (
                <ErrorMessage message="CircleChart 데이터를 찾을 수 없습니다." />
            )}
        </div>
    );
};

export default Meso;