// src/components/meso/YearItem.tsx

import React from 'react';

interface YearItemProps {
  year: number;
  isSelected: boolean;
  onClick: () => void;
}

const YearItem: React.FC<YearItemProps> = ({ year, isSelected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full border transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary
        ${
          isSelected
            ? 'bg-primary text-white border-primary'
            : 'bg-transparent text-primary border-primary hover:bg-primary hover:text-white'
        }
      `}
      aria-pressed={isSelected}
      aria-label={`${year}년`}
      tabIndex={0}
    >
      {year}
    </button>
  );
};

export default YearItem;