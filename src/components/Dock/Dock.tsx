"use client";

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface DockProps {
  isDarkMode: boolean;
}

interface DockIconProps {
  name: string;
  icon: string;
  mouseX: number | null; // Mouse X position relative to the Dock container
  dockWidth: number; // Total dock width for better calculations
  index: number; // Add index to help with debugging
  onClick?: () => void;
}

const DockIcon: React.FC<DockIconProps> = ({ name, icon, mouseX, dockWidth, index, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ center: 0, width: 0 });

  // Effect to calculate and update the icon's position RELATIVE TO THE DOCK
  useEffect(() => {
    const updatePosition = () => {
      if (ref.current && ref.current.parentElement) {
        const iconRect = ref.current.getBoundingClientRect();
        const dockRect = ref.current.parentElement.getBoundingClientRect();
        
        // Calculate the center position of this icon RELATIVE TO THE DOCK
        const relativeLeft = iconRect.left - dockRect.left;
        const relativeCenter = relativeLeft + (iconRect.width / 2);
        
        setPosition({
          center: relativeCenter,
          width: iconRect.width
        });
      }
    };

    // Run update on mount and any time the window might resize
    updatePosition();
    
    window.addEventListener('resize', updatePosition);
    
    // Create a ResizeObserver to monitor size changes
    const resizeObserver = new ResizeObserver(updatePosition);
    if (ref.current) {
      resizeObserver.observe(ref.current);
    }
    if (ref.current && ref.current.parentElement) {
      resizeObserver.observe(ref.current.parentElement);
    }
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', updatePosition);
      resizeObserver.disconnect();
    };
  }, []);
  
  // Calculate distance from mouse position to icon center
  // If mouseX is null (not hovering over dock), distance is large to ensure no magnification
  const distance = mouseX === null ? 1000 : Math.abs(mouseX - position.center);
  
  // Calculate scale based on distance using an exponential function
  const scale = mouseX === null
    ? 1 // Default scale when mouse leaves the dock
    : Math.max(
        1, // Minimum scale is 1
        1.8 * Math.exp(-(distance * distance) / 2000) // Adjusted value for better spread
      );

  // Calculate vertical offset based on scale (lifts the icon up)
  const yOffset = scale > 1 ? -15 * (scale - 1) * 2 : 0;

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center justify-end cursor-pointer relative"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      animate={{
        scale: scale,
        y: yOffset,
      }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 15,
      }}
      style={{
        zIndex: scale > 1 ? 10 : 1,
      }}
    >
      {/* Icon Image Container */}
      <div className="w-16 h-16 md:w-20 md:h-20 relative flex items-center justify-center mb-1">
        <Image
          src={icon}
          alt={name}
          fill
          sizes="(max-width: 768px) 64px, 80px"
          className="rounded-lg drop-shadow-md object-contain"
        />
      </div>

      {/* Tooltip */}
      {isHovered && (
        <motion.div
          className="absolute -top-6 bg-gray-800 text-white px-2 py-1 rounded text-xs whitespace-nowrap"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15, delay: 0.1 }}
        >
          {name}
        </motion.div>
      )}
    </motion.div>
  );
};

const Dock: React.FC<DockProps> = ({ isDarkMode }) => {
  // Define dock icons
  const dockIcons = [
    { name: 'Finder', icon: '/macos-icons/png/finder.png' },
    { name: 'Safari', icon: '/macos-icons/png/safari.png' },
    { name: 'Mail', icon: '/macos-icons/png/mail.png' },
    { name: 'Maps', icon: '/macos-icons/png/maps.png' },
    { name: 'Messages', icon: '/macos-icons/png/messages.png' },
    { name: 'Photos', icon: '/macos-icons/png/photos.png' },
    { name: 'Calendar', icon: '/macos-icons/png/calendar.png' },
    { name: 'Notes', icon: '/macos-icons/png/notes.png' },
    { name: 'App Store', icon: '/macos-icons/png/appstore.png' },
    { name: 'Terminal', icon: '/macos-icons/png/terminal.png' },
    { name: 'Settings', icon: '/macos-icons/png/settings.png' }
  ];

  const [mouseX, setMouseX] = useState<number | null>(null);
  const [dockWidth, setDockWidth] = useState(0);
  const dockRef = useRef<HTMLDivElement>(null);

  // Update dock width whenever it changes
  useEffect(() => {
    const updateDockWidth = () => {
      if (dockRef.current) {
        setDockWidth(dockRef.current.getBoundingClientRect().width);
      }
    };
    
    updateDockWidth();
    
    window.addEventListener('resize', updateDockWidth);
    const resizeObserver = new ResizeObserver(updateDockWidth);
    if (dockRef.current) {
      resizeObserver.observe(dockRef.current);
    }
    
    return () => {
      window.removeEventListener('resize', updateDockWidth);
      resizeObserver.disconnect();
    };
  }, []);

  // Update positions any time the mouse moves over the dock
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dockRef.current) {
      const dockRect = dockRef.current.getBoundingClientRect();
      const relativeX = e.clientX - dockRect.left;
      setMouseX(relativeX);
    }
  };

  const handleMouseLeave = () => {
    setMouseX(null); // Mouse is outside the dock
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 flex justify-center pointer-events-none">
      <motion.div
        ref={dockRef}
        className={`flex items-end space-x-2 md:space-x-3 px-3 py-1 rounded-xl backdrop-blur-md ${isDarkMode ? 'bg-white/10' : 'bg-black/10'} shadow-lg pointer-events-auto`}
        layout
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.5 }}
      >
        {dockIcons.map((item, index) => (
          <DockIcon
            key={item.name}
            name={item.name}
            icon={item.icon}
            mouseX={mouseX}
            dockWidth={dockWidth}
            index={index}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Dock;