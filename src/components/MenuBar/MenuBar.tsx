"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface MenuBarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const MenuBar: React.FC<MenuBarProps> = ({ isDarkMode, toggleDarkMode }) => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>('');

  // Update time every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const formattedHours = hours % 12 || 12; // Convert to 12-hour format
      const ampm = hours >= 12 ? 'PM' : 'AM';
      setCurrentTime(`${formattedHours}:${minutes.toString().padStart(2, '0')} ${ampm}`);

      // Format date as "Day, Month Date"
      const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
      setCurrentDate(now.toLocaleDateString('en-US', options));
    };

    updateTime(); // Initial call
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className={`h-6 w-full flex items-center justify-between px-3 ${isDarkMode ? 'bg-[#1e1e1e] text-white' : 'bg-[#f0f0f0] text-black'}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Left side - Apple logo and app menus */}
      <div className="flex items-center space-x-4">
        <div className="font-bold text-lg">
          {/* Apple logo */}
          <span role="img" aria-label="Apple logo">
            🍎
          </span>
        </div>
        <div className="font-semibold">Finder</div>
        <div>File</div>
        <div>Edit</div>
        <div>View</div>
        <div>Go</div>
        <div>Window</div>
        <div>Help</div>
      </div>

      {/* Right side - Status icons */}
      <div className="flex items-center space-x-4">
        <div className="text-xs">{currentDate}</div>
        <div className="text-xs">{currentTime}</div>
        <div
          onClick={toggleDarkMode}
          className="cursor-pointer"
        >
          {isDarkMode ? '☀️' : '🌙'}
        </div>
        <div>🔋</div>
        <div>📶</div>
      </div>
    </motion.div>
  );
};

export default MenuBar;
