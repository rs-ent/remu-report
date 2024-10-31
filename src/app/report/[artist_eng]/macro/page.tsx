"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import MarketGrowth from './MarketGrowth';

const MacroPage: React.FC = () => {
  const { artist_eng } = useParams();
  
  return (
    <div className="w-full flex flex-col items-center">
        <MarketGrowth />
    </div>
  );
};

export default MacroPage;
