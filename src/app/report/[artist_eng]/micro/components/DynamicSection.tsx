// src/app/report/[artist_eng]/micro/components/DynamicSection.tsx
'use client'

import React from 'react';
import TextSection from './sections/TextSection';
import HeroSection from './sections/HeroSection';
import CombinedSection from './sections/CombinedSection';
import VideoSection from './sections/VideoSection';
import TableSection from './sections/TableSection';
import NewsSection from './sections/NewsSection';
import ChartSection from './sections/ChartSection'; // 차트 섹션 임포트
import Divider from './sections/Divider'; // 구분선 섹션 임포트

import { SectionData } from '@/utils/fetchReport';

interface DynamicSectionProps {
  section: SectionData;
}

const DynamicSection: React.FC<DynamicSectionProps> = ({ section }) => {
  switch (section.type) {
    case 'text':
      return (
        <TextSection
          title={section.title}
          subtitle={section.subtitle}
          level={section.level}
          content={section.content || ''}
        />
      );
    case 'hero':
      return (
        <HeroSection
          title={section.title}
          subtitle={section.subtitle}
          level={section.level}
          content={section.content || ''}
          backgroundImage={section.backgroundImage || ''}
          ctaText={section.ctaText || ''}
          ctaLink={section.ctaLink || ''}
        />
      );
    case 'combined':
      return (
        <CombinedSection
          title={section.title}
          subtitle={section.subtitle}
          level={section.level}
          content={section.content || ''}
          photo={section.photos ? section.photos[0] : undefined}
          imageLeft={section.imageLeft !== undefined ? section.imageLeft : true}
        />
      );
    case 'video':
      return (
        <VideoSection
          title={section.title}
          subtitle={section.subtitle}
          level={section.level}
          videoUrl={section.videoUrl || ''}
        />
      );
    case 'table':
      return (
        <TableSection
          title={section.title}
          subtitle={section.subtitle}
          level={section.level}
          headers={section.headers || []}
          rows={section.rows || []}
        />
      );
    case 'news':
      return (
        <NewsSection
          title={section.title}
          subtitle={section.subtitle}
          level={section.level}
          newsItems={section.newsItems || []}
        />
      );
    case 'chart':
      return (
        <ChartSection
          title={section.title}
          subtitle={section.subtitle}
          level={section.level}
          data={section.data || [] as { name: string; score: number }[]}
          notation={section.notation || ''}
        />
      );
    case 'divider':
      return <Divider />;
    default:
      return null;
  }
};

export default DynamicSection;