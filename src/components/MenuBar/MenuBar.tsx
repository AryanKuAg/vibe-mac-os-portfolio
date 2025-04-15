"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

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

      // Format time as "10:24 PM" (or 24 hour format depending on system)
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const formattedHours = hours % 12 || 12; // Convert to 12-hour format
      const ampm = hours >= 12 ? 'PM' : 'AM';

      // Format date as "Tue 15 Apr" (abbreviated weekday, day, abbreviated month)
      const weekday = now.toLocaleDateString('en-US', { weekday: 'short' });
      const day = now.getDate();
      const month = now.toLocaleDateString('en-US', { month: 'short' });

      setCurrentTime(`${formattedHours}:${minutes.toString().padStart(2, '0')} ${ampm}`);
      setCurrentDate(`${weekday} ${day} ${month}`);
    };

    updateTime(); // Initial call
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Combined date and time string like in the image "Tue 15 Apr 10:24 PM"
  const dateTimeDisplay = `${currentDate} ${currentTime}`;

  return (
    <motion.div
      className={`h-6 w-full flex items-center justify-between fixed top-0 left-0 px-8 right-0 z-50 bg-black/15 ${isDarkMode ? 'text-white' : 'text-white'} backdrop-blur-sm`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Left side - Apple logo and app menus */}
      <div className="flex items-center h-full ml-2!">
        {/* Apple logo */}
        <div className="pr-2.5! h-full flex items-center justify-center cursor-pointer hover:bg-white/10">
          <div className="w-5 h-5 relative ml-2!">
            <Image
              src="/icons/apple-logo.svg"
              alt="Apple logo"
              fill
              className="brightness-0 invert pr-0.5! pb-0.5! scale-110"
            />
          </div>
        </div>

        {/* Menu items with proper spacing */}
        <div className="text-xs px-2! font-extrabold h-full flex items-center cursor-pointer hover:bg-white/10">Finder</div>
        <div className="text-xs px-2.5! font-semibold h-full flex items-center cursor-pointer hover:bg-white/10">File</div>
        <div className="text-xs px-2.5! font-semibold h-full flex items-center cursor-pointer hover:bg-white/10">Edit</div>
        <div className="text-xs px-2.5! font-semibold h-full flex items-center cursor-pointer hover:bg-white/10">View</div>
        <div className="text-xs px-2.5! font-semibold h-full flex items-center cursor-pointer hover:bg-white/10">Go</div>
        <div className="text-xs px-2.5! font-semibold h-full flex items-center cursor-pointer hover:bg-white/10">Window</div>
        <div className="text-xs px-2.5! font-semibold h-full flex items-center cursor-pointer hover:bg-white/10">Help</div>
      </div>

      {/* Right side - Status icons */}
      <div className="flex items-center h-full mr-4!">
        {/* Control Center */}
        <div className="px-1.5! h-full flex items-center justify-center cursor-pointer hover:bg-white/10">
          <div className="w-4 h-4 relative">
            <Image
              src="/icons/control-center.svg"
              alt="Control Center"
              fill
              className={isDarkMode ? "brightness-200" : ""}
            />
          </div>
        </div>

        {/* User Profile */}
        <div className="px-1.5! h-full flex items-center justify-center cursor-pointer hover:bg-white/10">
          <div className="w-4 h-4 relative">
            <Image
              src="/icons/user-profile.svg"
              alt="User Profile"
              fill
              className={isDarkMode ? "brightness-200" : ""}
            />
          </div>
        </div>

        {/* Screen */}
        <div className="px-1.5! h-full flex items-center justify-center cursor-pointer hover:bg-white/10">
          <div className="w-4 h-4 relative">
            <Image
              src="/icons/screen.svg"
              alt="Screen"
              fill
              className={isDarkMode ? "brightness-200" : ""}
            />
          </div>
        </div>

        {/* Siri */}
        <div className="px-1.5! h-full flex items-center justify-center cursor-pointer hover:bg-white/10">
          <div className="w-4 h-4 relative">
            <Image
              src="/icons/siri.svg"
              alt="Siri"
              fill
              className={isDarkMode ? "brightness-200" : ""}
            />
          </div>
        </div>

        {/* Dark Mode Toggle */}
        <div onClick={toggleDarkMode} className="px-1.5! h-full flex items-center justify-center cursor-pointer hover:bg-white/10">
          <div className="w-4 h-4 relative">
            <Image
              src={isDarkMode ? "/icons/sun.svg" : "/icons/moon.svg"}
              alt={isDarkMode ? "Light Mode" : "Dark Mode"}
              fill
              className={isDarkMode ? "brightness-200" : ""}
            />
          </div>
        </div>

        {/* Battery */}
        <div className="px-1.5! h-full flex items-center justify-center cursor-pointer hover:bg-white/10">
          <div className="w-5 h-4 relative">
            <Image
              src="/icons/battery.svg"
              alt="Battery"
              fill
              className={isDarkMode ? "brightness-200" : ""}
            />
          </div>
        </div>

        {/* WiFi */}
        <div className="px-1.5! h-full flex items-center justify-center cursor-pointer hover:bg-white/10">
          <div className="w-4 h-4 relative">
            <Image
              src="/icons/wifi.svg"
              alt="WiFi"
              fill
              className={isDarkMode ? "brightness-200" : ""}
            />
          </div>
        </div>

        {/* Search */}
        <div className="px-1.5! h-full flex items-center justify-center cursor-pointer hover:bg-white/10">
          <div className="w-4 h-4 relative">
            <Image
              src="/icons/search.svg"
              alt="Search"
              fill
              className={isDarkMode ? "brightness-200" : ""}
            />
          </div>
        </div>

        {/* Date and Time - Combined as a single element */}
        <div className="text-xs pl-2.5! h-full flex items-center cursor-pointer hover:bg-white/10 font-semibold">
          {dateTimeDisplay}
        </div>
      </div>
    </motion.div>
  );
};

export default MenuBar;