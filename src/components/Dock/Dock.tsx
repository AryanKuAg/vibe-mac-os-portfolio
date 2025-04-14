"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';

interface DockProps {
  isDarkMode: boolean;
}

interface DockIconProps {
  name: string;
  icon: string;
  onClick?: () => void;
}

const DockIcon: React.FC<DockIconProps> = ({ name, icon, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="flex flex-col items-center justify-center"
      whileHover={{ scale: 1.2, y: -10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="w-12 h-12 relative flex items-center justify-center text-3xl">
        {icon}
      </div>
      {isHovered && (
        <motion.div
          className="absolute -top-8 bg-gray-800 text-white px-2 py-1 rounded text-xs"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {name}
        </motion.div>
      )}
    </motion.div>
  );
};

const Dock: React.FC<DockProps> = ({ isDarkMode }) => {
  // Define dock icons with emoji icons for simplicity
  const dockIcons = [
    { name: 'Finder', icon: '📂' },  // 📂
    { name: 'Safari', icon: '🌎' },  // 🌎
    { name: 'Mail', icon: '✉️' },    // ✉️
    { name: 'Messages', icon: '💬' }, // 💬
    { name: 'Maps', icon: '🗺️' }, // 🗺️
    { name: 'Photos', icon: '📷' },   // 📷
    { name: 'Calendar', icon: '📅' },  // 📅
    { name: 'Notes', icon: '📝' },    // 📝
    { name: 'Terminal', icon: '🖥️' }, // 🖥️
    { name: 'App Store', icon: '💾' }, // 💾
    { name: 'Settings', icon: '⚙️' }   // ⚙️
  ];

  return (
    <motion.div
      className={`h-16 w-full flex items-end justify-center ${isDarkMode ? 'bg-transparent' : 'bg-transparent'}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <motion.div
        className={`flex items-center space-x-1 px-2 py-1 rounded-2xl backdrop-blur-md ${isDarkMode ? 'bg-white/10' : 'bg-black/10'}`}
        layout
      >
        {dockIcons.map((icon, index) => (
          <DockIcon
            key={index}
            name={icon.name}
            icon={icon.icon}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Dock;
