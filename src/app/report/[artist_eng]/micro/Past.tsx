// src/app/report/[artist_eng]/micro/Past.tsx
'use client';

import React from 'react';
import DynamicSection from './components/DynamicSection';
import pastSections from './test/PastSections';
import { motion } from 'framer-motion';

const Past: React.FC = () => {
  return (
    <motion.div
      className="flex flex-col items-center w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {Array.isArray(pastSections) ? (
        pastSections.map((section, index) => (
          <DynamicSection key={index} section={section} />
        ))
      ) : (
        <p className="text-red-500">과거 섹션 데이터를 불러오는 데 실패했습니다.</p>
      )}
    </motion.div>
  );
};

export default Past;
