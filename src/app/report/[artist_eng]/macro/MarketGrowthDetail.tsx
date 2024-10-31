// src/app/report/[artist_eng]/macro/MarketGrowthDetail.tsx
"use client";

import React, { useState, useRef } from 'react';
import MarketGrowthDetailChart from '../../../../components/macro/MarketGrowthDetailChart';
import AnalystComment from '../../../../components/AnalystComment';
import { ProcessedData } from './MarketGrowth';

interface Props {
    auto_comment: string | undefined;
    data: ProcessedData[];
}

const MarketGrowthDetail: React.FC<Props> = ({ auto_comment, data }) => {
    return (
        <div className="w-full flex flex-col items-center mt-8 space-y-8">
          {/* 성장률 관련 차트 */}
          <div className="w-full max-w-2xl text-center">
            <MarketGrowthDetailChart
              data={data}
              title="세부 매출 및 성장률 현황"
            />
          </div>
          <>
            {/* 코멘트 섹션 */}
            <div className="mt-1 w-full max-w-xl relative">
                {/* 자동 생성된 코멘트 */}
                {auto_comment && (
                <p className="text-xs text-gray-400 mb-2 text-center font-extralight">
                    {auto_comment}
                </p>
                )}

                {/* 애널리스트의 코멘트 */}
                <AnalystComment commentKey="macro_marketGrowthDetail_comment" />
            </div>
          </>
        </div>
    );
}

export default MarketGrowthDetail;