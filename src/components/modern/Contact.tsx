import React, { useState } from 'react';
import {
  FaEnvelope,
  FaPhone,
  FaLinkedin,
  FaGithub,
  FaCopy,
  FaCheck,
  FaPaperPlane,
} from 'react-icons/fa6';
import { SanitizedConfig } from '../../interfaces/sanitized-config';
import profileData from '../../../profile.data.json';
import { ScrollReveal } from './ScrollReveal';

interface ContactProps {
  config: SanitizedConfig;
  theme?: string;
}

const Contact: React.FC<ContactProps> = ({ config, theme = 'dark' }) => {
  const [copied, setCopied] = useState(false);
  const isLight = theme === 'light';

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
            className={`relative rounded-3xl border p-8 sm:p-12 shadow-2xl backdrop-blur-2xl text-center ${
              isLight
                ? 'bg-white/95 border-slate-200 shadow-slate-200/60'
                : 'bg-gradient-to-b from-[#10192e] to-[#0a0f1d] border-slate-700/80 shadow-black/40'
            }`}
          >
            {/* Header */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 dark:text-indigo-400 text-xs font-mono mb-4">
              <FaPaperPlane className="text-xs" />
              <span>{profileData.contact?.badge || 'GET IN TOUCH'}</span>
            </div>

          <h2
            className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}
          >
            {profileData.contact?.title || 'Ready to Build Something Great?'}
          </h2>

          <p
            className={`text-sm sm:text-base max-w-xl mx-auto mt-4 leading-relaxed ${
              isLight ? 'text-slate-600' : 'text-slate-300'
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
                    ? 'bg-slate-50 border-slate-200 hover:border-indigo-400'
                    : 'bg-slate-900/80 border-slate-800 hover:border-indigo-500/50'
                }`}
              >
                <a
                  href={`mailto:${config.social.email}`}
                  className="flex items-center gap-3 overflow-hidden group"
                >
                  <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center shrink-0 border border-rose-500/20">
                    <FaEnvelope className="text-base" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[11px] text-slate-400">Email Address</p>
                    <p
                      className={`text-xs font-semibold group-hover:text-indigo-500 transition-colors truncate ${
                        isLight ? 'text-slate-900' : 'text-white'
                      }`}
                    >
                      {config.social.email}
                    </p>
                  </div>
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className={`p-2 rounded-lg transition-colors shrink-0 ${
                    isLight
                      ? 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                      : 'bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white'
                  }`}
                  title="Copy email to clipboard"
                >
                  {copied ? (
                    <FaCheck className="text-emerald-500 text-xs" />
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
                    ? 'bg-slate-50 border-slate-200 hover:border-emerald-400'
                    : 'bg-slate-900/80 border-slate-800 hover:border-emerald-500/50'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 border border-emerald-500/20">
                  <FaPhone className="text-base" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-400">Phone / Zalo</p>
                  <p
                    className={`text-xs font-semibold group-hover:text-emerald-500 transition-colors ${
                      isLight ? 'text-slate-900' : 'text-white'
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
                    ? 'bg-slate-50 border-slate-200 hover:border-blue-400'
                    : 'bg-slate-900/80 border-slate-800 hover:border-blue-500/50'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0 border border-blue-500/20">
                  <FaLinkedin className="text-base" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-400">LinkedIn Profile</p>
                  <p
                    className={`text-xs font-semibold group-hover:text-blue-500 transition-colors ${
                      isLight ? 'text-slate-900' : 'text-white'
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
                    ? 'bg-slate-50 border-slate-200 hover:border-slate-400'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-600'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                    isLight
                      ? 'bg-slate-200 border-slate-300 text-slate-700'
                      : 'bg-slate-800 border-slate-700 text-slate-300'
                  }`}
                >
                  <FaGithub className="text-base" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-400">GitHub Profile</p>
                  <p
                    className={`text-xs font-semibold group-hover:text-indigo-500 transition-colors ${
                      isLight ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    @{config.github.username}
                  </p>
                </div>
              </a>
            )}
          </div>

            {/* Action Button */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              {config.social.email && (
                <a
                  href={`mailto:${config.social.email}`}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-200"
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
