// src/app/report/[artist_eng]/micro/components/sections/CombinedSection.tsx
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion } from 'framer-motion';

interface CombinedSectionProps {
  title: string;
  subtitle?: string;
  level: number;
  content: string;
  photo?: string;
  imageLeft?: boolean;
}

const CombinedSection: React.FC<CombinedSectionProps> = ({ title, subtitle, level, content, photo, imageLeft = true }) => {
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
      className="mb-12 flex flex-col md:flex-row items-center w-full max-w-6xl px-4"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {photo && imageLeft && (
        <div className="relative w-full md:w-1/2 h-80 mb-6 md:mb-0 md:mr-6">
          <img
            src={photo}
            alt={title}
            style={{ maxHeight: '400px', maxWidth: '500px' }}
            className="object-cover rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="w-full md:w-1/2">
        {title && (
          <div className="flex items-center mb-2">
            <TitleTag className={`text-${level === 1 ? '4xl' : level === 2 ? '3xl' : '2xl'} font-bold text-primary`}>
              {title}
            </TitleTag>
          </div>
        )}
        {subtitle && <h3 className="text-lg font-semibold mb-4 text-secondary">{subtitle}</h3>}
        <div className="prose dark:prose-dark max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]} className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            {content}
          </ReactMarkdown>
        </div>
      </div>
      {photo && !imageLeft && (
        <div className="relative w-full md:w-1/2 h-80 mt-6 md:mt-0 md:ml-6">
          <img
            src={photo}
            alt={title}
            style={{ maxHeight: '400px', maxWidth: '500px' }}
            className="object-cover rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
    </motion.section>
  );
};

export default CombinedSection;
