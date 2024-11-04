import React from 'react';
import { IconType } from 'react-icons';
import { FaMusic, FaVideo, FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface Props {
    title: string;
    items: string[];
    icon: 'music' | 'video' | 'star';
}

const iconMap: Record<string, IconType> = {
    music: FaMusic,
    video: FaVideo,
    star: FaStar,
};

const DetailCategory: React.FC<Props> = ({ title, items, icon }) => {
    const IconComponent = iconMap[icon];

    return (
        <motion.div
          className="flex-1 bg-gray-50 dark:bg-gray-700 p-6 rounded-xl hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center mb-4">
            <IconComponent className="text-3xl text-blue-500 mr-2" />
            <h4 className="text-2xl font-semibold text-gray-800 dark:text-white">
              {title}
            </h4>
          </div>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            {items.map((item, index) => (
              <li key={index} className="list-disc list-inside">
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
    );
};

export default DetailCategory;
