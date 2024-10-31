// src/context/ReportContext.tsx
"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchReportData, ReportData, updateReportField } from '../utils/fetchReport';

interface ReportContextProps {
    reports: ReportData[];
    report: ReportData | null;
    loading: boolean;
    error: string | null;
    getReportByArtistEng: (artistEng: string) => Promise<void>;
    updateReportFieldInContext: (field: keyof ReportData, value: string) => void;
    setReport: React.Dispatch<React.SetStateAction<ReportData | null>>;
}

const ReportContext = createContext<ReportContextProps | undefined>(undefined);

export const ReportProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reports, setReports] = useState<ReportData[]>([]);
  const [report, setReport] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getReports = async () => {
      try {
        const data = await fetchReportData();
        setReports(data);
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    getReports();
  }, []);

  const getReportByArtistEng = async (artistEng: string) => {
    setLoading(true);
    try {
      const foundReport = reports.find((report) => report.artist_eng === artistEng);
      if (!foundReport) {
        setError('해당 리포트를 찾을 수 없습니다.');
        setReport(null);
      } else {
        setReport(foundReport);
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const updateReportFieldInContext = async (field: keyof ReportData, value: string) => {
    if (report) {
      const updatedReport = { ...report, [field]: value };
      setReport(updatedReport); // 로컬 상태 업데이트
      await updateReportField(report.artist_eng, field, value); // Firestore에 저장
    }
  };

  return (
    <ReportContext.Provider value={{ reports, report, loading, error, getReportByArtistEng, updateReportFieldInContext, setReport }}>
      {children}
    </ReportContext.Provider>
  );
};

export const useReportContext = () => {
  const context = useContext(ReportContext);
  if (!context) {
    throw new Error('useReportContext must be used within a ReportProvider');
  }
  return context;
};
