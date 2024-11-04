// src/app/report/[artist_eng]/micro/components/sections/Divider.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowDown } from 'react-icons/fa';

const Divider: React.FC = () => {
  return (
    <motion.div
      className="flex items-center my-8 w-full max-w-6xl px-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <hr className="flex-grow border-t-2 border-gray-300 dark:border-gray-700" />
      <FaArrowDown className="mx-4 text-gray-500 dark:text-gray-400 animate-bounce" />
      <hr className="flex-grow border-t-2 border-gray-300 dark:border-gray-700" />
    </motion.div>
  );
};

export default Divider;
