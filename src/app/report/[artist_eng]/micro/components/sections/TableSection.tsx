// src/app/report/[artist_eng]/micro/components/sections/TableSection.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaTable } from 'react-icons/fa';

interface TableSectionProps {
  title: string;
  subtitle?: string;
  level: number;
  headers: string[];
  rows: (string | number)[][];
}

const TableSection: React.FC<TableSectionProps> = ({ title, subtitle, level, headers, rows }) => {
  const getTitleTag = (level: number) => {
    switch (level) {
      case 1:
        return 'h2';
      case 2:
        return 'h3';
      case 3:
        return 'h4';
      default:
        return 'h2';
    }
  };

  const TitleTag = getTitleTag(level) as keyof JSX.IntrinsicElements;

  return (
    <motion.section
      className="mb-12 w-full max-w-6xl px-4"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {title && (
        <div className="flex items-center mb-2">
        <FaTable className="text-primary mr-2" />
        <TitleTag className={`text-${level === 1 ? '4xl' : level === 2 ? '3xl' : '2xl'} font-bold mb-2 text-primary`}>
          {title}
        </TitleTag>
        </div>
      )}
      {subtitle && <h3 className="text-base font-semibold mb-6 text-secondary">{subtitle}</h3>}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="py-3 px-6 bg-primary text-left text-sm font-semibold text-white uppercase"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="py-4 px-6 text-sm text-gray-700 dark:text-gray-300"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.section>
  );
};

export default TableSection;
