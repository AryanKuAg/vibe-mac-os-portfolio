"use client";

import { useState, useRef } from 'react';
import { motion, useDragControls, PanInfo } from 'framer-motion';

interface WindowProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  initialPosition?: { x: number; y: number };
  initialSize?: { width: number; height: number };
  isDarkMode: boolean;
}

const Window: React.FC<WindowProps> = ({
  title,
  isOpen,
  onClose,
  children,
  initialPosition = { x: 100, y: 100 },
  initialSize = { width: 600, height: 400 },
  isDarkMode
}) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState(initialSize);
  const [prevSize, setPrevSize] = useState(initialSize);
  const [prevPosition, setPrevPosition] = useState(initialPosition);

  const dragControls = useDragControls();
  const windowRef = useRef<HTMLDivElement>(null);

  const handleDragEnd = (event: MouseEvent, info: PanInfo) => {
    setPosition({
      x: position.x + info.offset.x,
      y: position.y + info.offset.y
    });
  };

  const handleMinimize = () => {
    setIsMinimized(true);
    // Animation logic for minimizing to dock would go here
  };

  const handleMaximize = () => {
    if (isFullscreen) {
      // Restore previous size and position
      setSize(prevSize);
      setPosition(prevPosition);
    } else {
      // Save current size and position
      setPrevSize(size);
      setPrevPosition(position);
      // Set to fullscreen
      setSize({ width: window.innerWidth, height: window.innerHeight - 40 });
      setPosition({ x: 0, y: 40 });
    }
    setIsFullscreen(!isFullscreen);
  };

  if (!isOpen || isMinimized) return null;

  return (
    <motion.div
      ref={windowRef}
      className={`absolute rounded-lg overflow-hidden shadow-xl ${isDarkMode ? 'bg-[#2c2c2c] text-white' : 'bg-white text-black'}`}
      style={{
        width: size.width,
        height: size.height,
        x: position.x,
        y: position.y,
        zIndex: 10
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      drag
      dragControls={dragControls}
      dragMomentum={false}
      dragListener={false}
      onDragEnd={handleDragEnd}
    >
      {/* Window title bar */}
      <div
        className={`h-8 flex items-center justify-between px-3! ${isDarkMode ? 'bg-[#3c3c3c]' : 'bg-[#f0f0f0]'}`}
        onPointerDown={(e) => dragControls.start(e)}
      >
        {/* Window controls */}
        <div className="flex items-center space-x-2! z-10">
          <div
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center cursor-pointer"
          >
            <span className="text-[8px] text-red-800 opacity-0 hover:opacity-100">×</span>
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation();
              handleMinimize();
            }}
            className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center cursor-pointer"
          >
            <span className="text-[8px] text-yellow-800 opacity-0 hover:opacity-100">−</span>
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation();
              handleMaximize();
            }}
            className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center cursor-pointer"
          >
            <span className="text-[8px] text-green-800 opacity-0 hover:opacity-100">+</span>
          </div>
        </div>

        {/* Window title */}
        <div className="absolute left-0 right-0 text-center text-sm font-medium">
          {title}
        </div>
      </div>

      {/* Window content */}
      <div className="overflow-auto" style={{ height: 'calc(100% - 2rem)' }}>
        {children}
      </div>
    </motion.div>
  );
};

export default Window;
