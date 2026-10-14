import React from 'react';
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaArrowUp,
} from 'react-icons/fa6';
import { SanitizedConfig } from '../../interfaces/sanitized-config';

interface FooterProps {
  config: SanitizedConfig;
  theme?: string;
}

const Footer: React.FC<FooterProps> = ({ config, theme = 'dark' }) => {
  const isLight = theme === 'light';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`relative border-t py-12 text-xs transition-colors ${
        isLight
          ? 'border-slate-200 bg-white text-slate-500'
          : 'border-slate-800/80 bg-[#05070e] text-slate-400'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand & Copyright */}
          <div className="flex flex-col items-center sm:items-start gap-1">
            <div
              className={`flex items-center gap-2 font-bold text-sm ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              <span className="text-indigo-500 font-mono">&lt;KT /&gt;</span>
              <span>Nguyen Ba Khanh Trinh</span>
            </div>
            <p className={isLight ? 'text-slate-500' : 'text-slate-500'}>
              © {currentYear} • Designed & Built with precision for Backend & AI.
            </p>
          </div>

          {/* Center Socials */}
          <div className="flex items-center gap-3">
            {config.github.username && (
              <a
                href={`https://github.com/${config.github.username}`}
                target="_blank"
                rel="noreferrer"
                className={`p-2 rounded-xl border transition-all ${
                  isLight
                    ? 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 border-slate-200'
                    : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border-slate-800'
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
                className={`p-2 rounded-xl border transition-all ${
                  isLight
                    ? 'bg-slate-100 text-slate-600 hover:text-blue-600 hover:bg-slate-200 border-slate-200'
                    : 'bg-slate-900 text-slate-400 hover:text-blue-400 hover:bg-slate-800 border-slate-800'
                }`}
                title="LinkedIn"
              >
                <FaLinkedin className="text-sm" />
              </a>
            )}
            {config.social.email && (
              <a
                href={`mailto:${config.social.email}`}
                className={`p-2 rounded-xl border transition-all ${
                  isLight
                    ? 'bg-slate-100 text-slate-600 hover:text-rose-600 hover:bg-slate-200 border-slate-200'
                    : 'bg-slate-900 text-slate-400 hover:text-rose-400 hover:bg-slate-800 border-slate-800'
                }`}
                title="Email"
              >
                <FaEnvelope className="text-sm" />
              </a>
            )}
          </div>

          {/* Back to top */}
          <div>
            <button
              onClick={scrollToTop}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border transition-all cursor-pointer font-mono text-[11px] ${
                isLight
                  ? 'bg-slate-100 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 border-slate-200 hover:border-indigo-300'
                  : 'bg-slate-900 hover:bg-indigo-600/20 text-slate-400 hover:text-indigo-300 border-slate-800 hover:border-indigo-500/40'
              }`}
            >
              <span>Back to Top</span>
              <FaArrowUp className="text-[10px]" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
