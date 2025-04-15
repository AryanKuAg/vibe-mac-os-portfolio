"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Window from '../../components/Window/Window';
import AboutMe from '../../components/Apps/AboutMe';
import Projects from '../../components/Apps/Projects';
import Contact from '../../components/Apps/Contact';

interface DesktopProps {
  isDarkMode: boolean;
}

interface DesktopIcon {
  name: string;
  icon: string;
  position: { x: number; y: number };
  appComponent: React.ReactNode;
}

const Desktop: React.FC<DesktopProps> = ({ isDarkMode }) => {
  const [openWindows, setOpenWindows] = useState<{ [key: string]: boolean }>({});

  // Define desktop icons and their associated apps
  const desktopIcons: DesktopIcon[] = [
    {
      name: 'About Me',
      icon: '/icons/desktop/about.svg',
      position: { x: 20, y: 20 },
      appComponent: <AboutMe isDarkMode={isDarkMode} />
    },
    {
      name: 'Projects',
      icon: '/icons/desktop/projects.svg',
      position: { x: 20, y: 100 },
      appComponent: <Projects isDarkMode={isDarkMode} />
    },
    {
      name: 'Contact',
      icon: '/icons/desktop/contact.svg',
      position: { x: 20, y: 180 },
      appComponent: <Contact isDarkMode={isDarkMode} />
    }
  ];

  const handleOpenWindow = (name: string) => {
    setOpenWindows(prev => ({ ...prev, [name]: true }));
  };

  const handleCloseWindow = (name: string) => {
    setOpenWindows(prev => ({ ...prev, [name]: false }));
  };

  return (
    <motion.div
      className={`flex-1 w-full h-[calc(100vh-6rem)] relative ${isDarkMode ? 'bg-[#1e1e1e]' : 'bg-[#f0f0f0]'}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Desktop background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: isDarkMode
            ? 'url(https://512pixels.net/downloads/macos-wallpapers-6k/14-0-Dark-6k.jpg)'
            : 'url(https://512pixels.net/downloads/macos-wallpapers-6k/14-0-Light-6k.jpg)',
          backgroundSize: 'cover'
        }}
      />

      {/* Desktop icons */}
      <div className="relative z-10 p-4">
        {desktopIcons.map((icon, index) => (
          <motion.div
            key={index}
            className="absolute flex flex-col items-center justify-center w-20 h-24 cursor-pointer"
            style={{ left: icon.position.x, top: icon.position.y }}
            whileHover={{ scale: 1.05 }}
            onClick={() => handleOpenWindow(icon.name)}
            onDoubleClick={() => handleOpenWindow(icon.name)}
          >
            <div className={`w-12 h-12 flex items-center justify-center rounded-lg ${isDarkMode ? 'bg-black/20' : 'bg-white/20'} backdrop-blur-sm`}>
              <Image
                src={icon.icon}
                alt={icon.name}
                width={48}
                height={48}
                className="rounded-lg"
              />
            </div>
            <span className={`mt-1 text-xs text-center px-1 rounded ${isDarkMode ? 'bg-black/30 text-white' : 'bg-white/30 text-black'} backdrop-blur-sm`}>
              {icon.name}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Windows */}
      {desktopIcons.map((icon, index) => (
        <Window
          key={index}
          title={icon.name}
          isOpen={openWindows[icon.name] || false}
          onClose={() => handleCloseWindow(icon.name)}
          initialPosition={{ x: 100 + index * 50, y: 100 + index * 30 }}
          initialSize={{ width: 700, height: 500 }}
          isDarkMode={isDarkMode}
        >
          {icon.appComponent}
        </Window>
      ))}
    </motion.div>
  );
};

export default Desktop;
