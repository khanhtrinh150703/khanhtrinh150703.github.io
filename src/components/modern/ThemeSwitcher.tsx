import React, { useState, useRef, useEffect } from 'react';
import { FaSun, FaCloud, FaCloudRain, FaMoon, FaChevronDown } from 'react-icons/fa6';

export type WeatherTheme = 'sunny' | 'cloudy' | 'rainy' | 'moonlit';

interface ThemeSwitcherProps {
  currentTheme: WeatherTheme;
  onThemeChange: (theme: WeatherTheme) => void;
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

  const themes: {
    id: WeatherTheme;
    label: string;
    sublabel: string;
    icon: React.ReactNode;
    indicator: string;
  }[] = [
    {
      id: 'sunny',
      label: 'Sunny Day',
      sublabel: 'Daylight & Sunbeams',
      icon: <FaSun className="text-amber-500 text-sm animate-spin-slow" />,
      indicator: 'bg-amber-400 border-amber-300 shadow-amber-300/50',
    },
    {
      id: 'cloudy',
      label: 'Cloudy Sky',
      sublabel: 'Fluffy Drifting Clouds',
      icon: <FaCloud className="text-sky-500 text-sm" />,
      indicator: 'bg-sky-400 border-sky-300 shadow-sky-300/50',
    },
    {
      id: 'rainy',
      label: 'Gentle Rain',
      sublabel: 'Raindrops & Mist',
      icon: <FaCloudRain className="text-cyan-400 text-sm" />,
      indicator: 'bg-cyan-400 border-cyan-300 shadow-cyan-300/50',
    },
    {
      id: 'moonlit',
      label: 'Moonlit Night',
      sublabel: 'Moon & Twinkling Stars',
      icon: <FaMoon className="text-indigo-300 text-sm" />,
      indicator: 'bg-indigo-400 border-indigo-300 shadow-indigo-300/50',
    },
  ];

  const activeTheme = themes.find((t) => t.id === currentTheme) || themes[0];
  const isLightMode = currentTheme === 'sunny' || currentTheme === 'cloudy';

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className={`flex items-center gap-2 px-3.5 py-1.5 rounded-2xl text-xs font-medium border transition-all duration-200 shadow-sm cursor-pointer ${
          isLightMode
            ? 'bg-white/90 hover:bg-sky-50/90 border-sky-200/90 text-slate-800 shadow-sky-100/50'
            : 'bg-slate-900/80 hover:bg-slate-800/90 border-sky-500/30 text-sky-100 shadow-black/40'
        }`}
        title="Switch Weather Atmosphere"
      >
        <span className="flex items-center justify-center">{activeTheme.icon}</span>
        <span className="font-mono text-xs font-semibold">{activeTheme.label}</span>
        <FaChevronDown className="text-[9px] opacity-60 ml-0.5" />
      </button>

      {dropdownOpen && (
        <div
          className={`absolute right-0 mt-2 w-52 rounded-2xl border shadow-2xl backdrop-blur-2xl p-2 z-50 animate-fadeIn ${
            isLightMode
              ? 'bg-white/95 border-sky-200 shadow-sky-200/50'
              : 'bg-[#0b1329]/95 border-sky-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)]'
          }`}
        >
          <div
            className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-1.5 border-b mb-1 flex items-center justify-between ${
              isLightMode ? 'text-sky-700 border-sky-100' : 'text-sky-300 border-sky-900/40'
            }`}
          >
            <span>Atmosphere Mode</span>
            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-sky-500/15 font-mono">
              4 Weathers
            </span>
          </div>

          <div className="space-y-1">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  onThemeChange(t.id);
                  setDropdownOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-all cursor-pointer ${
                  currentTheme === t.id
                    ? isLightMode
                      ? 'bg-sky-50 border border-sky-200 text-sky-900 shadow-xs'
                      : 'bg-sky-500/20 border border-sky-400/40 text-white shadow-xs'
                    : isLightMode
                    ? 'text-slate-700 hover:text-slate-900 hover:bg-sky-50/70'
                    : 'text-slate-300 hover:text-white hover:bg-sky-950/40'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center border ${
                      isLightMode
                        ? 'bg-sky-50/80 border-sky-100'
                        : 'bg-slate-950/60 border-sky-500/20'
                    }`}
                  >
                    {t.icon}
                  </div>
                  <div>
                    <div className="text-xs font-bold leading-tight">{t.label}</div>
                    <div
                      className={`text-[10px] leading-tight mt-0.5 ${
                        isLightMode ? 'text-slate-500' : 'text-slate-400'
                      }`}
                    >
                      {t.sublabel}
                    </div>
                  </div>
                </div>

                <div
                  className={`w-2.5 h-2.5 rounded-full border shadow-xs shrink-0 ${t.indicator}`}
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;
