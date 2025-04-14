"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Import components
import MenuBar from '../src/components/MenuBar/MenuBar';
import Desktop from '../src/components/Desktop/Desktop';
import Dock from '../src/components/Dock/Dock';

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle between light and dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Apply dark mode class to body
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className={`min-h-screen w-full overflow-hidden ${isDarkMode ? 'bg-[#1e1e1e] text-white' : 'bg-[#f0f0f0] text-black'}`}>
      {/* Menu Bar */}
      <MenuBar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      {/* Desktop */}
      <Desktop isDarkMode={isDarkMode} />

      {/* Dock */}
      <Dock isDarkMode={isDarkMode} />
    </div>
  );
}
