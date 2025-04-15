"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Window from '../../components/Window/Window';
import ChromeWindow from '../../components/Window/ChromeWindow';
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
      icon: '/macos-icons/png/textedit.png',
      position: { x: 20, y: 20 },
      appComponent: <AboutMe isDarkMode={isDarkMode} />
    },
    {
      name: 'Projects',
      icon: '/macos-icons/png/chrome.png',
      position: { x: 20, y: 100 },
      appComponent: <Projects isDarkMode={isDarkMode} />
    },
    {
      name: 'Contact',
      icon: '/macos-icons/png/contacts.png',
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
      className="flex-1 w-full h-[calc(100vh-6rem)] relative overflow-hidden bg-transparent"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Desktop background is now in the main page component */}

      {/* Desktop icons */}
      <div className="relative z-10 p-4">
        {desktopIcons.map((icon, index) => (
          <motion.div
            key={index}
            className="absolute flex flex-col items-center justify-center w-20 h-24 cursor-pointer mt-4!"
            style={{ left: icon.position.x, top: icon.position.y }}
            whileHover={{ scale: 1.05 }}
            onClick={() => handleOpenWindow(icon.name)}
            onDoubleClick={() => handleOpenWindow(icon.name)}
          >
            <div className={`w-14 h-14 flex items-center justify-center`}>
              <Image
                src={icon.icon}
                alt={icon.name}
                width={56}
                height={56}
                className="drop-shadow-md"
              />
            </div>
            <span className="mt-2 text-xs font-medium text-center text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
              {icon.name}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Windows */}
      {desktopIcons.map((icon, index) => {
        // Use ChromeWindow for Projects, regular Window for others
        if (icon.name === 'Projects') {
          return (
            <ChromeWindow
              key={index}
              title={icon.name}
              isOpen={openWindows[icon.name] || false}
              onClose={() => handleCloseWindow(icon.name)}
              initialPosition={{ x: 100 + index * 50, y: 100 + index * 30 }}
              initialSize={{ width: 900, height: 600 }}
              isDarkMode={isDarkMode}
            >
              {icon.appComponent}
            </ChromeWindow>
          );
        } else {
          return (
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
          );
        }
      })}
    </motion.div>
  );
};

export default Desktop;
