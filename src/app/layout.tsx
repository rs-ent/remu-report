// src/app/layout.tsx

import React from 'react';
import '../styles/globals.css';
//import Link from 'next/link';
//import ThemeToggle from '../components/ThemeToggle'; // 테마 전환 컴포넌트
import Navbar from '../components/NavBar'; // 네비게이션 바 컴포넌트
import Footer from '../components/Footer'; // 푸터 컴포넌트
import { ReportProvider } from '../context/ReportContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-light dark:bg-backdrop-dark flex flex-col transition-colors duration-500">
        {/* 네비게이션 바 */}
        <Navbar />

        {/* 메인 콘텐츠 */}
        <ReportProvider>
          <main className="flex-grow w-full mx-auto">
            {children}
          </main>
        </ReportProvider>

        {/* 푸터 */}
        <Footer />
      </body>
    </html>
  );
}
