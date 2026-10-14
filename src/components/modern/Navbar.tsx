import React, { useState, useEffect } from 'react';
import { FaGithub, FaBars, FaXmark } from 'react-icons/fa6';
import { SanitizedConfig } from '../../interfaces/sanitized-config';
import ThemeSwitcher, { ThemeMode } from './ThemeSwitcher';
import profileData from '../../../profile.data.json';

interface NavbarProps {
  config: SanitizedConfig;
  theme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
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

  const isLight = theme === 'light';
  const isCyber = theme === 'cyber';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? isLight
            ? 'bg-white/85 backdrop-blur-xl border-b border-slate-200/80 shadow-lg shadow-slate-200/40 py-3.5'
            : isCyber
            ? 'bg-[#020709]/90 backdrop-blur-xl border-b border-emerald-500/30 shadow-lg shadow-emerald-500/10 py-3.5'
            : 'bg-[#070a12]/85 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/40 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand */}
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div
              className={`h-9 w-9 rounded-xl flex items-center justify-center font-mono font-bold text-sm shadow-md group-hover:scale-105 transition-transform duration-300 ${
                isCyber
                  ? 'bg-gradient-to-br from-emerald-400 to-cyan-500 text-slate-950 shadow-emerald-500/25'
                  : 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-indigo-500/20'
              }`}
            >
              KT
            </div>
            <div className="flex flex-col">
              <span
                className={`font-bold tracking-tight text-base sm:text-lg flex items-center gap-2 ${
                  isLight
                    ? 'text-slate-900'
                    : isCyber
                    ? 'text-emerald-300'
                    : 'text-white'
                }`}
              >
                Khanh Trinh
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </span>
              <span
                className={`text-[11px] font-mono transition-colors ${
                  isCyber
                    ? 'text-cyan-400'
                    : 'text-slate-400 group-hover:text-indigo-400'
                }`}
              >
                {profileData.personal.role || 'AI & Backend Engineer'}
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`px-3.5 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isLight
                    ? 'text-slate-600 hover:text-indigo-600 hover:bg-slate-100'
                    : isCyber
                    ? 'text-emerald-100/80 hover:text-emerald-300 hover:bg-emerald-500/10'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Theme Switcher Button */}
            <ThemeSwitcher currentTheme={theme} onThemeChange={onThemeChange} />

            <a
              href={`https://github.com/${config.github.username}`}
              target="_blank"
              rel="noreferrer"
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-xl transition-all duration-200 shadow-sm border ${
                isLight
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border-slate-300'
                  : isCyber
                  ? 'bg-[#041118] hover:bg-[#071c27] text-emerald-300 hover:text-cyan-300 border-emerald-500/30'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border-slate-700/80'
              }`}
            >
              <FaGithub className="text-sm" />
              <span>GitHub</span>
            </a>

            <a
              href="#contact"
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all duration-200 shadow-md hover:scale-[1.02] ${
                isCyber
                  ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold hover:from-emerald-400 hover:to-cyan-400 shadow-emerald-500/25'
                  : 'bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white shadow-indigo-500/25 hover:shadow-indigo-500/40'
              }`}
            >
              Get in Touch
            </a>
          </div>

          {/* Mobile Menu Button + Theme Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeSwitcher currentTheme={theme} onThemeChange={onThemeChange} />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-xl border focus:outline-none ${
                isLight
                  ? 'bg-slate-100 border-slate-300 text-slate-700'
                  : isCyber
                  ? 'bg-[#041118] border-emerald-500/40 text-emerald-300'
                  : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:text-white'
              }`}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <FaXmark className="text-lg" /> : <FaBars className="text-lg" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden border-b px-4 pt-3 pb-6 space-y-2 mt-2 shadow-2xl backdrop-blur-2xl ${
            isLight
              ? 'bg-white/95 border-slate-200'
              : isCyber
              ? 'bg-[#030d14]/95 border-emerald-500/30'
              : 'bg-[#0a0f1d]/95 border-slate-800'
          }`}
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isLight
                  ? 'text-slate-700 hover:text-indigo-600 hover:bg-slate-100'
                  : isCyber
                  ? 'text-emerald-100/90 hover:text-cyan-300 hover:bg-emerald-500/10'
                  : 'text-slate-200 hover:text-white hover:bg-indigo-500/10 hover:border-l-2 hover:border-indigo-400'
              }`}
            >
              {link.name}
            </a>
          ))}
          <div className="pt-3 flex flex-col gap-2">
            <a
              href={`https://github.com/${config.github.username}`}
              target="_blank"
              rel="noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl border ${
                isLight
                  ? 'bg-slate-100 text-slate-700 border-slate-300'
                  : isCyber
                  ? 'bg-[#041118] text-emerald-300 border-emerald-500/40'
                  : 'bg-slate-800/80 text-slate-200 border-slate-700'
              }`}
            >
              <FaGithub /> GitHub Profile
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-center px-4 py-2.5 text-sm font-semibold rounded-xl shadow-lg ${
                isCyber
                  ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold shadow-emerald-500/25'
                  : 'bg-gradient-to-r from-indigo-500 to-blue-600 text-white shadow-indigo-500/30'
              }`}
            >
              Contact Me
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
