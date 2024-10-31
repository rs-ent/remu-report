// src/app/report/[artist_eng]/micro/components/sections/NewsSection.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface NewsSectionProps {
  title: string;
  subtitle?: string;
  level: number;
  newsItems: { title: string; url: string }[];
  sectionHeight?: string; // e.g., 'h-screen', 'h-[500px]'
}

const NewsSection: React.FC<NewsSectionProps> = ({ title, subtitle, level, newsItems, sectionHeight = 'h-auto', }) => {
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
      className={`mb-12 w-full max-w-6xl px-4 ${sectionHeight}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {title && (
        <TitleTag className={`text-${level === 1 ? '4xl' : level === 2 ? '3xl' : '2xl'} font-bold mb-2 text-primary underline`}>
          {title}
        </TitleTag>
      )}
      {subtitle && <h3 className="text-lg font-semibold mb-6 text-secondary">{subtitle}</h3>}

      <div className="space-y-6">
        {newsItems.map((news, index) => (
          <motion.div
            key={index}
            className="w-full"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <h4 className="text-lg font-semibold mb-2 text-secondary">{news.title}</h4>
            <iframe
              src={news.url}
              title={`News Article ${index + 1}`}
              className="w-full h-64 border rounded-badge"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            ></iframe>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default NewsSection;
