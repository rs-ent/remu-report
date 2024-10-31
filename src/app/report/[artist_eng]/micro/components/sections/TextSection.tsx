// src/app/report/[artist_eng]/micro/components/sections/TextSection.tsx
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion } from 'framer-motion';
import { FaInfoCircle } from 'react-icons/fa';

interface TextSectionProps {
  title: string;
  subtitle?: string;
  level: number;
  content: string;
}

const TextSection: React.FC<TextSectionProps> = ({ title, subtitle, level, content }) => {
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
        <div className="flex items-center mb-2 text-center">
          <FaInfoCircle className="text-primary mr-2 text-center" />
          <TitleTag className={`text-${level === 1 ? '4xl' : level === 2 ? '3xl' : '2xl'} font-bold text-primary text-center`}>
            {title}
          </TitleTag>
        </div>
      )}
      {subtitle && <h3 className="text-2xl font-semibold mb-4 text-secondary text-center">{subtitle}</h3>}
      <div className="prose dark:prose-dark max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]} className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          {content}
        </ReactMarkdown>
      </div>
    </motion.section>
  );
};

export default TextSection;
