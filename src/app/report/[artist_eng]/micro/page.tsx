// src/app/report/[artist_eng]/micro/page.tsx
'use client';

import React from 'react';
import Past from './Past';
import History from './History';

const Micro: React.FC = () => {
  return (
    <div className=" dark:bg-gray-900 min-h-screen relative">
      <History />
      <Past />
    </div>
  );
};

export default Micro;
