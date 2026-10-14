import React, { useState } from 'react';
import {
  FaEnvelope,
  FaPhone,
  FaLinkedin,
  FaGithub,
  FaCopy,
  FaCheck,
} from 'react-icons/fa6';
import { SanitizedConfig } from '../../interfaces/sanitized-config';
import profileData from '../../../profile.data.json';
import { WeatherTheme } from './ThemeSwitcher';
import ScrollReveal from './ScrollReveal';

interface ContactProps {
  config: SanitizedConfig;
  theme?: WeatherTheme;
}

const Contact: React.FC<ContactProps> = ({ config, theme = 'sunny' }) => {
  const [copied, setCopied] = useState(false);
  const isLight = theme === 'sunny' || theme === 'cloudy' || theme === 'snowy';

  const handleCopyEmail = () => {
    if (config.social.email) {
      navigator.clipboard.writeText(config.social.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" delay={0}>
          <div
            className={`relative rounded-3xl border p-8 sm:p-12 shadow-xl backdrop-blur-2xl text-center ${
              isLight
                ? 'bg-white/95 border-sky-100 shadow-sky-100/60'
                : 'bg-slate-900/85 border-sky-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.7)]'
            }`}
          >
            <span
              className={`px-4 py-1.5 rounded-full text-xs font-mono font-medium border mb-4 inline-block ${
                isLight
                  ? 'bg-sky-50 border-sky-200 text-sky-700'
                  : 'bg-slate-900 border-slate-800 text-sky-300'
              }`}
            >
              CONTACT
            </span>

            <h2
              className={`text-3xl sm:text-4xl font-black tracking-tight ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              {profileData.contact?.title || 'Ready to Build Something Great?'}
            </h2>

            <p
              className={`text-sm sm:text-base max-w-xl mx-auto mt-4 leading-relaxed ${
                isLight ? 'text-slate-600' : 'text-slate-300/90'
              }`}
            >
              {profileData.contact?.description ||
                'I am currently open to Backend Developer and AI Engineer opportunities. Whether you have a question, an exciting project, or simply want to connect, feel free to reach out!'}
            </p>

            {/* Contact Direct Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 text-left">
              {/* Email Card */}
              {config.social.email && (
                <div
                  className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                    isLight
                      ? 'bg-sky-50/50 border-sky-100 hover:border-sky-300 hover:bg-sky-50'
                      : 'bg-slate-950/40 border-sky-500/20 hover:border-sky-400/40 hover:bg-slate-900'
                  }`}
                >
                  <a
                    href={`mailto:${config.social.email}`}
                    className="flex items-center gap-3 overflow-hidden group"
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border shadow-xs ${
                        isLight
                          ? 'bg-sky-100 text-sky-600 border-sky-200'
                          : 'bg-sky-500/15 text-sky-400 border-sky-500/25'
                      }`}
                    >
                      <FaEnvelope className="text-base" />
                    </div>
                    <div className="overflow-hidden">
                      <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                        Email Signal
                      </p>
                      <p
                        className={`text-xs font-semibold transition-colors truncate ${
                          isLight
                            ? 'text-slate-900 group-hover:text-sky-600'
                            : 'text-white group-hover:text-sky-300'
                        }`}
                      >
                        {config.social.email}
                      </p>
                    </div>
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className={`p-2 rounded-xl transition-colors shrink-0 cursor-pointer ${
                      isLight
                        ? 'bg-white hover:bg-sky-100 text-sky-700 border border-sky-200/80 shadow-xs'
                        : 'bg-slate-800 hover:bg-slate-700 text-sky-300 hover:text-white'
                    }`}
                    title="Copy email to clipboard"
                  >
                    {copied ? (
                      <FaCheck className="text-sky-600 text-xs" />
                    ) : (
                      <FaCopy className="text-xs" />
                    )}
                  </button>
                </div>
              )}

              {/* Phone Card */}
              {config.social.phone && (
                <a
                  href={`tel:${config.social.phone}`}
                  className={`p-4 rounded-2xl border transition-all flex items-center gap-3 group ${
                    isLight
                      ? 'bg-sky-50/50 border-sky-100 hover:border-sky-300 hover:bg-sky-50'
                      : 'bg-slate-950/40 border-sky-500/20 hover:border-sky-400/40 hover:bg-slate-900'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border shadow-xs ${
                      isLight
                        ? 'bg-sky-100 text-sky-600 border-sky-200'
                        : 'bg-sky-500/15 text-sky-400 border-sky-500/25'
                    }`}
                  >
                    <FaPhone className="text-base" />
                  </div>
                  <div>
                    <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                      Direct Frequency / Telegram
                    </p>
                    <p
                      className={`text-xs font-semibold transition-colors ${
                        isLight
                          ? 'text-slate-900 group-hover:text-sky-600'
                          : 'text-white group-hover:text-sky-300'
                      }`}
                    >
                      {config.social.phone}
                    </p>
                  </div>
                </a>
              )}

              {/* LinkedIn Card */}
              {config.social.linkedin && (
                <a
                  href={`https://linkedin.com/in/${config.social.linkedin}`}
                  target="_blank"
                  rel="noreferrer"
                  className={`p-4 rounded-2xl border transition-all flex items-center gap-3 group ${
                    isLight
                      ? 'bg-sky-50/50 border-sky-100 hover:border-sky-300 hover:bg-sky-50'
                      : 'bg-slate-950/40 border-sky-500/20 hover:border-sky-400/40 hover:bg-slate-900'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border shadow-xs ${
                      isLight
                        ? 'bg-sky-100 text-sky-600 border-sky-200'
                        : 'bg-sky-500/15 text-sky-400 border-sky-500/25'
                    }`}
                  >
                    <FaLinkedin className="text-base" />
                  </div>
                  <div>
                    <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                      LinkedIn Radar
                    </p>
                    <p
                      className={`text-xs font-semibold transition-colors ${
                        isLight
                          ? 'text-slate-900 group-hover:text-sky-600'
                          : 'text-white group-hover:text-sky-300'
                      }`}
                    >
                      khanh-trinh
                    </p>
                  </div>
                </a>
              )}

              {/* GitHub Card */}
              {config.github.username && (
                <a
                  href={`https://github.com/${config.github.username}`}
                  target="_blank"
                  rel="noreferrer"
                  className={`p-4 rounded-2xl border transition-all flex items-center gap-3 group ${
                    isLight
                      ? 'bg-sky-50/50 border-sky-100 hover:border-sky-300 hover:bg-sky-50'
                      : 'bg-slate-950/40 border-sky-500/20 hover:border-sky-400/40 hover:bg-slate-900'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border shadow-xs ${
                      isLight
                        ? 'bg-sky-100 text-sky-600 border-sky-200'
                        : 'bg-sky-500/15 text-sky-400 border-sky-500/25'
                    }`}
                  >
                    <FaGithub className="text-base" />
                  </div>
                  <div>
                    <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                      GitHub Station
                    </p>
                    <p
                      className={`text-xs font-semibold transition-colors ${
                        isLight
                          ? 'text-slate-900 group-hover:text-sky-600'
                          : 'text-white group-hover:text-sky-300'
                      }`}
                    >
                      @{config.github.username}
                    </p>
                  </div>
                </a>
              )}
            </div>

            {/* Action Call to Button */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              {config.social.email && (
                <a
                  href={`mailto:${config.social.email}`}
                  className={`px-8 py-3.5 rounded-2xl font-semibold text-sm transition-all duration-200 cursor-pointer ${
                    isLight
                      ? 'bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-lg shadow-sky-300/40 hover:shadow-xl hover:shadow-sky-400/50 hover:-translate-y-0.5'
                      : 'bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-[0_0_25px_rgba(2,132,199,0.45)] hover:shadow-[0_0_35px_rgba(2,132,199,0.65)] hover:-translate-y-0.5'
                  }`}
                >
                  {profileData.contact?.buttonText || 'Send Me an Email'}
                </a>
              )}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Contact;
