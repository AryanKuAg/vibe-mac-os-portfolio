"use client";

import { useEffect, useState } from 'react';

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
    <div className="min-h-screen w-full overflow-hidden relative">
      {/* Wallpaper Background */}
      <div
        className="absolute inset-0 w-full h-full z-0"
        style={{
          backgroundImage: 'url(/wallpapers/macos-big-sur-apple-layers-fluidic-colorful-wwdc-stock-4096x2304-1455.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      <div className={`relative z-10 min-h-screen w-full ${isDarkMode ? 'text-white' : 'text-black'}`}>
        {/* Menu Bar */}
        <MenuBar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

        {/* Desktop */}
        <Desktop isDarkMode={isDarkMode} />

        {/* Dock */}
        <Dock isDarkMode={isDarkMode} />
      </div>
    </div>
  );
}
