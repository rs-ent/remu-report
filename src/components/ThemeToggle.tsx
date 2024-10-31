// src/components/ThemeToggle.tsx
"use client";

import React, { useState } from 'react';

const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState<boolean>(false);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
    setIsDark(!isDark);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-light dark:bg-dark shadow-xl transition duration-300"
      aria-label="Toggle Theme"
    >
      {isDark ? (
        <p>🌞</p>
      ) : (
        <p>🌙</p>
      )}
    </button>
  );
};

export default ThemeToggle;
