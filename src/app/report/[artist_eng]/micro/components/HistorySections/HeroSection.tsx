// src/app/report/[artist_eng]/micro/components/sections/HeroSection.tsx
import React from 'react';
import { motion, useViewportScroll, useTransform } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  level: number;
  content: string;
  backgroundImage: string;
  ctaText?: string;
  ctaLink?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  level,
  content,
  backgroundImage,
  ctaText,
  ctaLink,
}) => {
  const getTitleTag = (level: number) => {
    switch (level) {
      case 1:
        return 'h1';
      case 2:
        return 'h2';
      case 3:
        return 'h3';
      default:
        return 'h1';
    }
  };

  const TitleTag = getTitleTag(level) as keyof JSX.IntrinsicElements;

  // 패럴랙스 효과를 위한 훅
  const { scrollY } = useViewportScroll();
  const y = useTransform(scrollY, [0, 300], [0, -50]);

  // 애니메이션 변형 정의
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      className="relative w-full h-screen flex items-center justify-center text-center text-white overflow-hidden"
      initial="hidden"
      animate="visible"
      transition={{ duration: 1 }}
    >
      {/* 패럴랙스 배경 이미지 */}
      <motion.div
        className="absolute inset-0"
        style={{ y }}
      >
        <img
          src={backgroundImage}
          alt="Hero Background"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </motion.div>

      {/* 콘텐츠 */}
      <div className="relative z-10 px-4">
        {title && (
          <motion.div
            className="flex items-center justify-center mb-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 1, delay: 0.2 }}
          >
            <TitleTag
              className={`text-glow ${
                level === 1
                  ? 'text-6xl'
                  : level === 2
                  ? 'text-5xl'
                  : 'text-4xl'
              } font-bold text-gray-200`}
            >
              {title}
            </TitleTag>
          </motion.div>
        )}
        {subtitle && (
          <motion.h2
            className="text-gray-300 text-2xl md:text-3xl font-semibold mb-6"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 1, delay: 0.4 }}
          >
            {subtitle}
          </motion.h2>
        )}
        {content && (
          <motion.div
            className="prose dark:prose-dark max-w-none mb-8"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 1, delay: 0.6 }}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              className="text-gray-100 text-lg leading-relaxed"
            >
              {content}
            </ReactMarkdown>
          </motion.div>
        )}
        {ctaText && ctaLink && (
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 1, delay: 0.8 }}
          >
            <Link href={ctaLink}>
              <a className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors duration-300">
                {ctaText}
                <FaArrowRight className="ml-2" />
              </a>
            </Link>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

export default HeroSection;
