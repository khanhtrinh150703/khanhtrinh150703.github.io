import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa6';

interface ScrollProgressProps {
  theme?: string;
}

export const ScrollProgress: React.FC<ScrollProgressProps> = ({ theme = 'dark' }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const isLight = theme === 'light';
  const isCyber = theme === 'cyber';

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
        className={`relative w-12 h-12 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 group hover:scale-110 active:scale-95 backdrop-blur-md ${
          isLight
            ? 'bg-white/90 text-indigo-600 border border-slate-200 shadow-slate-300/60'
            : isCyber
            ? 'bg-[#041118]/90 text-emerald-300 border border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
            : 'bg-slate-900/90 text-indigo-400 border border-slate-700/80 shadow-indigo-950/50'
        }`}
      >
        {/* Progress SVG Ring */}
        <svg className="absolute w-12 h-12 -rotate-90 pointer-events-none">
          <circle
            cx="24"
            cy="24"
            r="18"
            className={`fill-none stroke-current opacity-20 ${
              isCyber ? 'text-emerald-500' : 'text-indigo-500'
            }`}
            strokeWidth="2.5"
          />
          <circle
            cx="24"
            cy="24"
            r="18"
            className={`fill-none stroke-current transition-all duration-150 ${
              isCyber ? 'text-emerald-400' : isLight ? 'text-indigo-600' : 'text-indigo-400'
            }`}
            strokeWidth="2.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>

        <FaArrowUp className="text-sm transition-transform duration-300 group-hover:-translate-y-0.5" />
      </button>
    </div>
  );
};

export default ScrollProgress;
