import React, { useState, useRef, useEffect } from 'react';
import { FaSun, FaMoon, FaWandMagicSparkles } from 'react-icons/fa6';

export type ThemeMode = 'dark' | 'light' | 'cyber';

interface ThemeSwitcherProps {
  currentTheme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  currentTheme,
  onThemeChange,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const themes: { id: ThemeMode; label: string; icon: React.ReactNode; color: string }[] = [
    {
      id: 'dark',
      label: 'Dark Glow',
      icon: <FaMoon className="text-xs text-indigo-400" />,
      color: 'bg-[#070a12]',
    },
    {
      id: 'light',
      label: 'Light Clean',
      icon: <FaSun className="text-xs text-amber-400" />,
      color: 'bg-white',
    },
    {
      id: 'cyber',
      label: 'Cyberpunk',
      icon: <FaWandMagicSparkles className="text-xs text-emerald-400" />,
      color: 'bg-[#040e14]',
    },
  ];

  const activeTheme = themes.find((t) => t.id === currentTheme) || themes[0];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all duration-200 shadow-sm bg-slate-900/80 dark:bg-slate-900/80 hover:bg-slate-800 border-slate-700/80 text-slate-200 hover:text-white"
        title="Change theme appearance"
      >
        <span>{activeTheme.icon}</span>
        <span className="hidden sm:inline font-mono text-[11px]">{activeTheme.label}</span>
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-36 rounded-2xl bg-slate-900/95 border border-slate-700/90 shadow-2xl backdrop-blur-xl p-1.5 z-50 animate-fadeIn">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 px-2 py-1">
            Appearance
          </div>
          <div className="space-y-1">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  onThemeChange(t.id);
                  setDropdownOpen(false);
                }}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  currentTheme === t.id
                    ? 'bg-indigo-600/30 text-white border border-indigo-500/40'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  {t.icon}
                  <span>{t.label}</span>
                </div>
                <div className={`w-2.5 h-2.5 rounded-full border border-slate-600 ${t.color}`} />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;
