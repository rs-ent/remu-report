import React from 'react';
import Link from 'next/link';
import { ReportData } from '../utils/fetchReport';
import Image from 'next/image';

interface ReportCardProps {
  report: ReportData;
}

const ReportCard: React.FC<ReportCardProps> = ({ report }) => {
  return (
    <Link href={`/report/${report.artist_eng}`} key={report.id}>
      <div className="cursor-pointer bg-white dark:bg-backdrop-dark shadow-md hover:shadow-xl rounded-lg overflow-hidden transition-shadow duration-300 transform hover:-translate-y-2 border border-gray-300 dark:border-neutral-dark">
        {/* 썸네일 이미지 */}
        {report.image_alpha && (
          <div className="relative w-full h-48">
            <Image
              src={report.image_alpha}
              alt={`${report.artist_eng} 썸네일`}
              layout="fill"
              objectFit="cover"
              className="group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        {/* 리포트 내용 */}
        <div className="p-6 bg-gradient-to-b from-gray-50 to-gray-200 dark:from-light-dark dark:to-backdrop-dark">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
            {report.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {report.sub_title}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ReportCard;
