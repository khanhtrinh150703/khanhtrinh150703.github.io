import React, { useState, useEffect } from 'react';
import { FaGithub, FaBars, FaXmark } from 'react-icons/fa6';
import { SanitizedConfig } from '../../interfaces/sanitized-config';
import ThemeSwitcher, { WeatherTheme } from './ThemeSwitcher';

interface NavbarProps {
  config: SanitizedConfig;
  theme: WeatherTheme;
  onThemeChange: (theme: WeatherTheme) => void;
}

const Navbar: React.FC<NavbarProps> = ({ config, theme, onThemeChange }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  const isLight = theme === 'sunny' || theme === 'cloudy';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? isLight
            ? 'bg-white/85 backdrop-blur-xl border-b border-sky-100/90 shadow-sm shadow-sky-100/40 py-3'
            : 'bg-[#060c1d]/90 backdrop-blur-2xl border-b border-sky-500/20 shadow-xl py-3'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Monogram & Meteorologic Tag */}
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="h-9 w-9 rounded-2xl flex items-center justify-center font-mono font-bold text-xs bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-600 text-white shadow-md shadow-sky-400/30 group-hover:scale-105 transition-all duration-300 border border-sky-200">
              KT
            </div>
            <div className="flex flex-col">
              <span
                className={`font-bold tracking-tight text-sm sm:text-base flex items-center gap-2 ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                Khanh Trinh
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                </span>
              </span>
              <span className="text-[10px] font-mono text-sky-600 dark:text-sky-400">
                Weather Station • AI & BE
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div
            className={`hidden md:flex items-center gap-1 p-1 rounded-2xl border backdrop-blur-xl shadow-xs ${
              isLight
                ? 'bg-white/80 border-sky-100'
                : 'bg-slate-900/70 border-sky-500/20'
            }`}
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all duration-200 ${
                  isLight
                    ? 'text-slate-700 hover:text-sky-600 hover:bg-sky-50/80'
                    : 'text-slate-300 hover:text-white hover:bg-sky-500/20'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <ThemeSwitcher currentTheme={theme} onThemeChange={onThemeChange} />

            <a
              href={`https://github.com/${config.github.username}`}
              target="_blank"
              rel="noreferrer"
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all duration-200 shadow-sm border ${
                isLight
                  ? 'bg-white/90 text-slate-800 hover:text-sky-600 border-sky-200 hover:border-sky-300'
                  : 'bg-slate-900/80 text-sky-200 hover:text-white border-sky-500/30 hover:border-sky-400'
              }`}
              title="GitHub Profile"
            >
              <FaGithub className="text-sm" />
              <span className="font-mono text-xs">@{config.github.username}</span>
            </a>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex sm:hidden items-center gap-2">
            <ThemeSwitcher currentTheme={theme} onThemeChange={onThemeChange} />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-xl border ${
                isLight
                  ? 'bg-white/90 text-slate-800 border-sky-200'
                  : 'bg-slate-900/80 text-white border-sky-500/30'
              }`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FaXmark className="text-sm" /> : <FaBars className="text-sm" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div
            className={`sm:hidden mt-3 p-4 rounded-2xl border backdrop-blur-2xl shadow-xl space-y-2 animate-fadeIn ${
              isLight
                ? 'bg-white/95 border-sky-200 text-slate-800'
                : 'bg-[#060c1d]/95 border-sky-500/30 text-white'
            }`}
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isLight
                    ? 'hover:bg-sky-50 text-slate-700 hover:text-sky-600'
                    : 'hover:bg-slate-800 text-slate-200 hover:text-white'
                }`}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 border-t border-sky-500/20">
              <a
                href={`https://github.com/${config.github.username}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3 py-2 text-xs font-mono text-sky-600 dark:text-sky-300"
              >
                <FaGithub className="text-sm" />
                <span>github.com/{config.github.username}</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
