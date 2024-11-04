// src/components/meso/Timeline.tsx

import React from 'react';
import { YearlyData } from '@/utils/fetchHistoryData';
import YearItem from './YearItem';

interface TimelineProps {
  data: YearlyData[];
  onYearSelect: (year: number) => void;
  selectedYear: number | null;
}

const Timeline: React.FC<TimelineProps> = ({ data, onYearSelect, selectedYear }) => {
  return (
    <div className="overflow-x-auto py-4">
      <div className="flex space-x-4">
        {data.map((yearData) => (
          <YearItem
            key={yearData.year}
            year={yearData.year}
            isSelected={selectedYear === yearData.year}
            onClick={() => onYearSelect(yearData.year)}
          />
        ))}
      </div>
    </div>
  );
};

export default Timeline;