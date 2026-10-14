import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa6';
import { WeatherTheme } from './ThemeSwitcher';

interface ScrollProgressProps {
  theme?: WeatherTheme;
}

export const ScrollProgress: React.FC<ScrollProgressProps> = ({ theme = 'sunny' }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const isLight = theme === 'sunny' || theme === 'cloudy' || theme === 'snowy';

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(currentProgress);
        setIsVisible(window.scrollY > 300);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const circumference = 2 * Math.PI * 18;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-90 pointer-events-none'
      }`}
    >
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className={`relative w-12 h-12 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 group hover:scale-110 active:scale-95 backdrop-blur-md cursor-pointer ${
          isLight
            ? 'bg-white/95 text-sky-600 border border-sky-200 shadow-sky-200/50 hover:border-sky-300'
            : 'bg-slate-900/90 text-sky-300 border border-sky-500/30 shadow-[0_0_25px_rgba(2,132,199,0.35)]'
        }`}
      >
        {/* Progress SVG Ring */}
        <svg className="absolute w-12 h-12 -rotate-90 pointer-events-none">
          <circle
            cx="24"
            cy="24"
            r="18"
            className={`fill-none stroke-current opacity-20 ${
              isLight ? 'text-sky-300' : 'text-sky-600'
            }`}
            strokeWidth="2.5"
          />
          <circle
            cx="24"
            cy="24"
            r="18"
            className="fill-none stroke-current text-sky-500 transition-all duration-150"
            strokeWidth="2.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>

        <FaArrowUp
          className={`text-sm transition-transform duration-300 group-hover:-translate-y-0.5 ${
            isLight ? 'text-sky-600 group-hover:text-sky-700' : 'text-sky-300 group-hover:text-white'
          }`}
        />
      </button>
    </div>
  );
};

export default ScrollProgress;
