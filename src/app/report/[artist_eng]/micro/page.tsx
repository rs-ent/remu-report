// src/app/report/[artist_eng]/micro/page.tsx
'use client';

import React from 'react';
import Past from './Past';

const Micro: React.FC = () => {
  return (
    <div className=" dark:bg-gray-900 min-h-screen relative">
      <Past />
    </div>
  );
};

export default Micro;
