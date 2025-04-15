"use client";

import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { motion, useDragControls, PanInfo } from 'framer-motion';
import Image from 'next/image';

interface ChromeWindowProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  initialPosition?: { x: number; y: number };
  initialSize?: { width: number; height: number };
  isDarkMode: boolean;
}

const ChromeWindow: React.FC<ChromeWindowProps> = ({
  title,
  isOpen,
  onClose,
  initialPosition = { x: 100, y: 100 },
  initialSize = { width: 900, height: 600 },
  isDarkMode
}) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState(initialSize);
  const [prevSize, setPrevSize] = useState(initialSize);
  const [prevPosition, setPrevPosition] = useState(initialPosition);
  // Removed unused activeTab state
  const [url, setUrl] = useState('https://aryan-portfolio-pink.vercel.app/');
  const [inputUrl, setInputUrl] = useState('https://aryan-portfolio-pink.vercel.app/');
  const [isEditingUrl, setIsEditingUrl] = useState(false);
  const [history, setHistory] = useState<string[]>(['https://aryan-portfolio-pink.vercel.app/']);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const urlInputRef = useRef<HTMLInputElement>(null);

  const dragControls = useDragControls();
  const windowRef = useRef<HTMLDivElement>(null);

  // Handle URL input focus and blur
  const handleUrlFocus = () => {
    setIsEditingUrl(true);
    if (urlInputRef.current) {
      urlInputRef.current.select();
    }
  };

  const handleUrlBlur = () => {
    setIsEditingUrl(false);
  };

  // Handle URL input change
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputUrl(e.target.value);
  };

  // Handle URL submission
  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigateTo(inputUrl);
  };

  // Handle keyboard events in URL input
  const handleUrlKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setInputUrl(url);
      setIsEditingUrl(false);
      e.currentTarget.blur();
    }
  };

  // Navigation functions
  const navigateTo = (newUrl: string) => {
    // Add http:// if missing
    if (!/^https?:\/\//i.test(newUrl)) {
      newUrl = 'https://' + newUrl;
    }

    setIsLoading(true);
    setUrl(newUrl);
    setInputUrl(newUrl);
    setIsEditingUrl(false);

    // Update history
    const newHistory = [...history.slice(0, historyIndex + 1), newUrl];
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);

    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const goBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setUrl(history[historyIndex - 1]);
      setInputUrl(history[historyIndex - 1]);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setUrl(history[historyIndex + 1]);
      setInputUrl(history[historyIndex + 1]);
    }
  };

  const refresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  // Window management functions
  const handleDragEnd = (_event: MouseEvent, info: PanInfo) => {
    setPosition({
      x: position.x + info.offset.x,
      y: position.y + info.offset.y
    });
  };

  const handleMinimize = () => {
    setIsMinimized(true);
  };

  const handleMaximize = () => {
    if (isFullscreen) {
      setSize(prevSize);
      setPosition(prevPosition);
    } else {
      setPrevSize(size);
      setPrevPosition(position);
      setSize({ width: window.innerWidth, height: window.innerHeight - 40 });
      setPosition({ x: 0, y: 40 });
    }
    setIsFullscreen(!isFullscreen);
  };

  if (!isOpen || isMinimized) return null;

  return (
    <motion.div
      ref={windowRef}
      className={`absolute rounded-lg overflow-hidden shadow-2xl border border-gray-300 ${isDarkMode ? 'bg-[#202124] text-white' : 'bg-white text-black'}`}
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
      {/* Chrome title bar with window controls and tabs */}
      <div
        className={`h-10 flex items-center ${isDarkMode ? 'bg-[#3c3c3c]' : 'bg-[#DEE1E6]'}`}
        onPointerDown={(e) => dragControls.start(e)}
      >
        {/* Window controls */}
        <div className="flex items-center space-x-2! px-3!">
          <button
            onClick={onClose}
            className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center"
          >
            <span className="text-[8px] text-red-800 opacity-0 hover:opacity-100">×</span>
          </button>
          <button
            onClick={handleMinimize}
            className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center"
          >
            <span className="text-[8px] text-yellow-800 opacity-0 hover:opacity-100">−</span>
          </button>
          <button
            onClick={handleMaximize}
            className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center"
          >
            <span className="text-[8px] text-green-800 opacity-0 hover:opacity-100">+</span>
          </button>
        </div>

        {/* Chrome tabs */}
        <div className="flex-1 flex items-center h-full ml-2! overflow-hidden">
          {/* Active tab */}
          <div
            className={`h-full px-4! flex items-center space-x-2! rounded-t-lg relative ${isDarkMode ? 'bg-[#35363A]' : 'bg-white'}`}
            style={{ minWidth: '180px', maxWidth: '240px' }}
          >
            {/* Tab background with proper shape */}
            <div className="absolute inset-0 rounded-t-lg"></div>

            {/* Tab content */}
            <div className="flex items-center space-x-2! z-10 w-full">
              <div className="w-4 h-4 relative flex-shrink-0">
                <Image
                  src="/macos-icons/png/chrome.png"
                  alt="Chrome"
                  width={16}
                  height={16}
                  className="object-contain"
                />
              </div>
              <span className="text-sm truncate flex-1">{title}</span>
              <button className="w-5 h-5 rounded-full hover:bg-gray-200 flex items-center justify-center text-gray-500 flex-shrink-0">
                <span className="text-xs">×</span>
              </button>
            </div>
          </div>

          {/* New tab button */}
          <div className="w-8 h-8 flex items-center justify-center ml-1! text-gray-500 hover:bg-gray-200 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </div>
        </div>

        {/* Chrome window controls */}
        <div className="flex items-center space-x-1 px-2!">
          <button className="w-8 h-8 rounded-full hover:bg-gray-200 flex items-center justify-center text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="19" cy="12" r="1"></circle>
              <circle cx="5" cy="12" r="1"></circle>
            </svg>
          </button>
        </div>
      </div>

      {/* Chrome toolbar with address bar */}
      <div className={`h-12 flex items-center px-2! ${isDarkMode ? 'bg-[#35363A]' : 'bg-[#F1F3F4]'} border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        {/* Navigation buttons */}
        <div className="flex items-center space-x-1">
          <button
            onClick={goBack}
            className={`w-8 h-8 rounded-full hover:bg-gray-200 flex items-center justify-center ${historyIndex > 0 ? 'text-gray-500' : 'text-gray-300'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
          <button
            onClick={goForward}
            className={`w-8 h-8 rounded-full hover:bg-gray-200 flex items-center justify-center ${historyIndex < history.length - 1 ? 'text-gray-500' : 'text-gray-300'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
          <button
            onClick={refresh}
            className="w-8 h-8 rounded-full hover:bg-gray-200 flex items-center justify-center text-gray-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
            </svg>
          </button>
        </div>

        {/* Address bar */}
        <form onSubmit={handleUrlSubmit} className="flex-1 mx-2!">
          <div className={`h-9 rounded-full flex items-center px-4! ${isDarkMode ? 'bg-[#202124] text-white' : 'bg-white text-black'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} hover:shadow-md transition-shadow duration-200 ${isEditingUrl ? 'ring-2 ring-blue-500' : ''}`}>
            {/* Security icon */}
            <div className="w-4 h-4 mr-2! flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>

            {/* URL input */}
            <input
              ref={urlInputRef}
              type="text"
              value={isEditingUrl ? inputUrl : url}
              onChange={handleUrlChange}
              onFocus={handleUrlFocus}
              onBlur={handleUrlBlur}
              onKeyDown={handleUrlKeyDown}
              className={`text-sm flex-1 bg-transparent outline-none w-full ${isLoading ? 'opacity-70' : ''}`}
              placeholder="Enter URL"
            />

            {/* Loading indicator */}
            {isLoading && (
              <div className="w-4 h-4 mr-2! flex-shrink-0 animate-spin">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                </svg>
              </div>
            )}

            {/* Site settings */}
            <div className="w-8 h-8 flex items-center justify-center ml-1! text-gray-500 hover:bg-gray-200 rounded-full flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
            </div>
          </div>
        </form>

        {/* Browser actions */}
        <div className="flex items-center space-x-1!">
          <button className="w-8 h-8 rounded-full hover:bg-gray-200 flex items-center justify-center text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
          </button>
          <button className="w-8 h-8 rounded-full hover:bg-gray-200 flex items-center justify-center text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </button>
        </div>
      </div>

      {/* Chrome content area */}
      <div className="overflow-hidden relative" style={{ height: 'calc(100% - 5.5rem)' }}>
        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-white/50 dark:bg-black/50 flex items-center justify-center z-10">
            <div className="w-8 h-8 animate-spin">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
              </svg>
            </div>
          </div>
        )}

        {/* Iframe for external content */}
        <iframe
          src={url}
          className="w-full h-full border-none"
          title="Browser Content"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          loading="lazy"
        />
      </div>
    </motion.div>
  );
};

export default ChromeWindow;
