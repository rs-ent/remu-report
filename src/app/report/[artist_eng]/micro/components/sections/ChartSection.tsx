// src/app/report/[artist_eng]/micro/components/sections/ChartSection.tsx
import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { motion } from 'framer-motion';
import { FaChartLine } from 'react-icons/fa';

interface ChartSectionProps {
  title: string;
  subtitle?: string;
  level: number;
  data: { name: string; score: number }[];
  notation: string;
}

const ChartSection: React.FC<ChartSectionProps> = ({ title, subtitle, level, data, notation }) => {
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
          <FaChartLine className="text-primary mr-2" />
          <TitleTag className={`text-${level === 1 ? '4xl' : level === 2 ? '3xl' : '2xl'} font-bold text-primary`}>
            {title}
          </TitleTag>
        </div>
      )}
      {subtitle && <h3 className="text-base font-semibold mb-6 text-secondary">{subtitle}</h3>}
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend formatter={() => notation} />
          <Line type="monotone" dataKey="score" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </motion.section>
  );
};

export default ChartSection;
