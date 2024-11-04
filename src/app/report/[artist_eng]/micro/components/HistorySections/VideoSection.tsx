// src/app/report/[artist_eng]/micro/components/sections/VideoSection.tsx
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface VideoSectionProps {
  title: string;
  subtitle?: string;
  level: number;
  videoUrl: string; // YouTube 또는 다른 비디오 URL
}

const VideoSection: React.FC<VideoSectionProps> = ({ title, subtitle, level, videoUrl }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
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

  const getEmbedUrl = (url: string) => {
    const youtubeMatch = url.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/);
    const shortYoutubeMatch = url.match(/(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^&]+)/);
    const videoId = youtubeMatch ? youtubeMatch[1] : shortYoutubeMatch ? shortYoutubeMatch[1] : null;
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  const embedUrl = getEmbedUrl(videoUrl);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const iframe = iframeRef.current;
        if (iframe) {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // 뷰포트 안에 들어오면 동영상 재생
              iframe.contentWindow?.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
            } else {
              // 뷰포트 밖으로 나가면 동영상 일시정지
              iframe.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
            }
          });
        }
      },
      { threshold: 0.7 } // 50% 이상 보이면 재생
    );

    if (iframeRef.current) {
      observer.observe(iframeRef.current);
    }

    return () => {
      if (iframeRef.current) {
        observer.unobserve(iframeRef.current);
      }
    };
  }, []);

  return (
    <motion.section
      className="mb-12 w-full max-w-6xl px-4"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {title && (
        <TitleTag className={`text-${level === 1 ? '4xl' : level === 2 ? '3xl' : '2xl'} font-bold mb-2 text-primary`}>
          {title}
        </TitleTag>
      )}
      {subtitle && <h3 className="text-lg font-semibold mb-6 text-secondary">{subtitle}</h3>}
      <div className="relative" style={{ paddingTop: '56.25%' /* 16:9 Aspect Ratio */ }}>
        <motion.iframe
          ref={iframeRef}
          src={embedUrl}
          title={title}
          className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
          allowFullScreen
          initial={{ scale: 0.95 }}
          whileHover={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        ></motion.iframe>
      </div>
    </motion.section>
  );
};

export default VideoSection;
