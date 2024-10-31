"use client";

import React, { useEffect } from 'react';
import Spinner from '../../../components/Spinner';
import ErrorMessage from '../../../components/ErrorMessage';
import Divider from '../../../components/Divider';

import Macro from './macro/page';
import Meso from './meso/page';
import Micro from './micro/page';
import Point from './point/page';

import DynamicSection from './micro/components/DynamicSection';

import { useReportContext } from '../../../context/ReportContext';
import { fetchReportById } from '@/utils/fetchReport';
import { useParams, useRouter } from 'next/navigation';

const ReportPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const { report, loading, error, getReportByArtistEng, setReport } = useReportContext();

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
          } else {
            router.push('/404'); // 해당 데이터를 찾을 수 없는 경우 404로 리다이렉트
          }
        } catch (error) {
          console.error('Failed to fetch report:', error);
        }
      } else {
        getReportByArtistEng(artist_eng); // 기존 reports 데이터가 있으면 이 함수 사용
      }
    };

    fetchData();
  }, [artist_eng, report, getReportByArtistEng, router, setReport]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner />
        <p className="ml-4 text-gray-500">데이터를 불러오는 중입니다...</p>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light dark:bg-backdrop-dark transition-colors duration-500">
        <ErrorMessage message={error || '리포트를 찾을 수 없습니다.'} />
      </div>
    );
  }

  const heroSectionData = {
    type: 'hero',
    title: `${report.title}`,
    subtitle: `${report.sub_title}`,
    level: 1,
    content: '',
    backgroundImage: report.image_alpha,
  };

  return (
    <div className="flex flex-col items-center">
      {/* 배경 이미지 */}
      {report.background && (
        <div
          className="w-full h-64 bg-cover bg-center mb-6 relative"
          style={{ backgroundImage: `url(${report.background})` }}
        ></div>
      )}

      {/* 페이지 타이틀 및 썸네일 */}
      <div className="w-full h-screen text-center mb-12">
        <DynamicSection section={heroSectionData} />
      </div>

      {/* 섹션 카드 */}
      <div className="flex flex-col space-y-8 w-full max-w-6xl px-4">
        <Divider opacity={0.5} marginTop="5rem" marginBottom="5rem" color="blue-500" />
        {artist_eng ? (
          <div>
            <Macro />
            <Divider opacity={0.3} marginTop="5rem" marginBottom="5rem" color="blue-500" />
            {report.circlechart_target && report.melon_artist_id ? (
              <Meso />
            ) : (
              <ErrorMessage message="CircleChart 타겟이 없습니다." />
            )}
            <Divider opacity={0.3} marginTop="5rem" marginBottom="5rem" color="blue-500" />
            <Micro />
            <Divider opacity={0.3} marginTop="5rem" marginBottom="5rem" color="blue-500" />
            <Point />
          </div>
        ) : (
          <ErrorMessage message="잘못된 URL" />
        )}
      </div>
    </div>
  );
};

export default ReportPage;