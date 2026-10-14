import React from 'react';
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaArrowUp,
} from 'react-icons/fa6';
import { SanitizedConfig } from '../../interfaces/sanitized-config';
import { WeatherTheme } from './ThemeSwitcher';

interface FooterProps {
  config: SanitizedConfig;
  theme?: WeatherTheme;
}

const Footer: React.FC<FooterProps> = ({ config, theme = 'sunny' }) => {
  const isLight = theme === 'sunny' || theme === 'cloudy';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`relative border-t py-12 text-xs transition-colors backdrop-blur-xl ${
        isLight
          ? 'border-sky-100 bg-white/80 text-slate-500'
          : 'border-sky-500/20 bg-slate-950/80 text-slate-400'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand & Meteorological Status */}
          <div className="flex flex-col items-center sm:items-start gap-1">
            <div
              className={`flex items-center gap-2 font-bold text-sm ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              <span className="text-sky-500 font-mono font-bold">&lt;KT /&gt;</span>
              <span>Nguyen Ba Khanh Trinh</span>
            </div>
            <p className="text-slate-400">
              © {currentYear} • Weather Coding Station • Architecting AI & Scalable Systems.
            </p>
          </div>

          {/* Center Socials */}
          <div className="flex items-center gap-3">
            {config.github.username && (
              <a
                href={`https://github.com/${config.github.username}`}
                target="_blank"
                rel="noreferrer"
                className={`p-2.5 rounded-xl border transition-all ${
                  isLight
                    ? 'bg-sky-50 text-slate-600 hover:text-sky-600 border-sky-100 hover:border-sky-300'
                    : 'bg-slate-900 text-sky-300 hover:text-white hover:bg-slate-800 border-sky-500/25'
                }`}
                title="GitHub"
              >
                <FaGithub className="text-sm" />
              </a>
            )}
            {config.social.linkedin && (
              <a
                href={`https://linkedin.com/in/${config.social.linkedin}`}
                target="_blank"
                rel="noreferrer"
                className={`p-2.5 rounded-xl border transition-all ${
                  isLight
                    ? 'bg-sky-50 text-slate-600 hover:text-sky-600 border-sky-100 hover:border-sky-300'
                    : 'bg-slate-900 text-sky-300 hover:text-white hover:bg-slate-800 border-sky-500/25'
                }`}
                title="LinkedIn"
              >
                <FaLinkedin className="text-sm" />
              </a>
            )}
            {config.social.email && (
              <a
                href={`mailto:${config.social.email}`}
                className={`p-2.5 rounded-xl border transition-all ${
                  isLight
                    ? 'bg-sky-50 text-slate-600 hover:text-sky-600 border-sky-100 hover:border-sky-300'
                    : 'bg-slate-900 text-sky-300 hover:text-white hover:bg-slate-800 border-sky-500/25'
                }`}
                title="Email"
              >
                <FaEnvelope className="text-sm" />
              </a>
            )}
          </div>

          {/* Back to top button */}
          <div>
            <button
              onClick={scrollToTop}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border transition-all cursor-pointer font-mono text-xs ${
                isLight
                  ? 'bg-sky-50 hover:bg-sky-100 text-sky-700 border-sky-200'
                  : 'bg-slate-900 hover:bg-slate-800 text-sky-300 hover:text-white border-sky-500/30 hover:border-sky-400'
              }`}
            >
              <span>Back to Zenith</span>
              <FaArrowUp className="text-[10px]" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
