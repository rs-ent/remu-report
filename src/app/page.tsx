// src/app/page.tsx
"use client";

import React from 'react';
//import Image from 'next/image';
import ReportCard from '../components/ReportCard';
import ErrorMessage from '../components/ErrorMessage';
import Spinner from '../components/Spinner';
import { useReportContext } from '../context/ReportContext';

const Reports: React.FC = () => {
  return <ReportsContent />;
};

const ReportsContent: React.FC = () => {
  const { reports, loading, error } = useReportContext();
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner />
        <p className="ml-4 text-gray-500">리포트를 불러오는 중입니다...</p>
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-backdrop to-light dark:from-backdrop-dark dark:to-light-dark flex flex-col items-center px-4 py-8">
      <h1 className="text-5xl font-bold text-center mb-12 text-primary dark:text-primary-dark font-montserrat">
        IPO Reports
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 w-full max-w-7xl">
        {reports.map((report) => (
          <ReportCard key={report.id} report={report} />
        ))}
      </div>
    </div>
  );
};

export default Reports;
