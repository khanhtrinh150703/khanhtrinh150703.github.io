import React from 'react';
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaArrowRight,
  FaCode,
  FaServer,
  FaBrain,
  FaGraduationCap,
  FaDownload,
} from 'react-icons/fa6';
import { SanitizedConfig } from '../../interfaces/sanitized-config';
import { Profile } from '../../interfaces/profile';
import profileData from '../../../profile.data.json';
import ScrollReveal from './ScrollReveal';

interface HeroProps {
  config: SanitizedConfig;
  profile: Profile | null;
  theme?: string;
  loading?: boolean;
}

const Hero: React.FC<HeroProps> = ({ config, profile, theme = 'dark' }) => {
  const isLight = theme === 'light';
  const isCyber = theme === 'cyber';

  const avatarUrl =
    profile?.avatar ||
    `https://avatars.githubusercontent.com/${config.github.username}`;
  const name = profile?.name || profileData.personal.name || 'Nguyen Ba Khanh Trinh';
  const bio =
    config.description.description ||
    profileData.personal.shortBio ||
    'A Backend Developer experienced in Node.js (TypeScript) and Java Spring Boot.';

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Introduction */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6 text-left">
            {/* Status Pill */}
            <div
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium backdrop-blur-md shadow-sm border ${
                isCyber
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                  : 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400 dark:text-indigo-300'
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{profileData.personal.status || 'Available for Backend & AI Opportunities'}</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h2
                className={`text-sm sm:text-base font-mono uppercase tracking-widest font-semibold ${
                  isCyber ? 'text-cyan-400' : 'text-indigo-500 dark:text-indigo-400'
                }`}
              >
                {profileData.personal.tagline || 'AI Engineer'}
              </h2>
              <h1
                className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight ${
                  isLight
                    ? 'text-slate-900'
                    : isCyber
                    ? 'text-white'
                    : 'text-white'
                }`}
              >
                Hi, I'm{' '}
                <span
                  className={
                    isCyber
                      ? 'bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(16,185,129,0.35)]'
                      : isLight
                      ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent'
                      : 'bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent'
                  }
                >
                  {name}
                </span>
              </h1>
              <p
                className={`text-xl sm:text-2xl font-semibold ${
                  isLight
                    ? 'text-slate-700'
                    : isCyber
                    ? 'text-emerald-200'
                    : 'text-slate-300'
                }`}
              >
                {profileData.personal.role || 'Backend Developer & AI Engineer'}
              </p>
            </div>

            {/* Description */}
            <p
              className={`text-base sm:text-lg leading-relaxed max-w-2xl ${
                isLight
                  ? 'text-slate-600'
                  : isCyber
                  ? 'text-emerald-100/75'
                  : 'text-slate-400'
              }`}
            >
              {bio}
            </p>

            {/* Call to Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                className={`inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold rounded-xl shadow-lg transition-all duration-200 hover:-translate-y-0.5 ${
                  isCyber
                    ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-bold shadow-emerald-500/25'
                    : 'bg-gradient-to-r from-indigo-500 via-indigo-600 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white shadow-indigo-500/25'
                }`}
              >
                <span>View Projects</span>
                <FaArrowRight className="text-xs" />
              </a>

              <a
                href="#contact"
                className={`inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold rounded-xl border transition-all duration-200 ${
                  isLight
                    ? 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300 shadow-sm'
                    : isCyber
                    ? 'bg-[#041118] hover:bg-[#061e2a] text-emerald-300 border-emerald-500/30'
                    : 'bg-slate-900/90 hover:bg-slate-800/90 text-slate-200 hover:text-white border-slate-700/80 hover:border-slate-600'
                }`}
              >
                <span>Get In Touch</span>
              </a>

              {config.resume.fileUrl && (
                <a
                  href={config.resume.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold rounded-xl border transition-all duration-200 ${
                    isLight
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                      : isCyber
                      ? 'bg-[#041118] text-cyan-300 border-cyan-500/30 hover:bg-[#071c26]'
                      : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border-white/10'
                  }`}
                >
                  <FaDownload className="text-xs" />
                  <span>Resume</span>
                </a>
              )}
            </div>

            {/* Social Links */}
            <div
              className={`flex items-center gap-3 pt-4 border-t w-full max-w-xl ${
                isLight
                  ? 'border-slate-200'
                  : isCyber
                  ? 'border-emerald-500/20'
                  : 'border-slate-800/80'
              }`}
            >
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Connect:
              </span>
              <div className="flex items-center gap-2">
                {config.github.username && (
                  <a
                    href={`https://github.com/${config.github.username}`}
                    target="_blank"
                    rel="noreferrer"
                    className={`p-2.5 rounded-xl border transition-all ${
                      isLight
                        ? 'bg-white text-slate-700 hover:text-slate-900 border-slate-300 shadow-sm'
                        : isCyber
                        ? 'bg-[#041118] text-emerald-300 hover:text-cyan-300 border-emerald-500/30 hover:border-cyan-400'
                        : 'bg-slate-900/80 text-slate-300 hover:text-white border-slate-800 hover:border-indigo-500/40'
                    }`}
                    title="GitHub"
                  >
                    <FaGithub className="text-base" />
                  </a>
                )}
                {config.social.linkedin && (
                  <a
                    href={`https://linkedin.com/in/${config.social.linkedin}`}
                    target="_blank"
                    rel="noreferrer"
                    className={`p-2.5 rounded-xl border transition-all ${
                      isLight
                        ? 'bg-white text-blue-600 border-slate-300 shadow-sm'
                        : isCyber
                        ? 'bg-[#041118] text-cyan-400 border-emerald-500/30 hover:border-cyan-400'
                        : 'bg-slate-900/80 text-slate-300 hover:text-white border-slate-800 hover:border-blue-500/40'
                    }`}
                    title="LinkedIn"
                  >
                    <FaLinkedin className="text-base" />
                  </a>
                )}
                {config.social.email && (
                  <a
                    href={`mailto:${config.social.email}`}
                    className={`p-2.5 rounded-xl border transition-all ${
                      isLight
                        ? 'bg-white text-rose-500 border-slate-300 shadow-sm'
                        : isCyber
                        ? 'bg-[#041118] text-rose-400 border-emerald-500/30 hover:border-rose-400'
                        : 'bg-slate-900/80 text-slate-300 hover:text-white border-slate-800 hover:border-red-500/40'
                    }`}
                    title="Email"
                  >
                    <FaEnvelope className="text-base" />
                  </a>
                )}
                {config.social.phone && (
                  <a
                    href={`tel:${config.social.phone}`}
                    className={`p-2.5 rounded-xl border transition-all ${
                      isLight
                        ? 'bg-white text-emerald-600 border-slate-300 shadow-sm'
                        : isCyber
                        ? 'bg-[#041118] text-emerald-400 border-emerald-500/30 hover:border-emerald-400'
                        : 'bg-slate-900/80 text-slate-300 hover:text-white border-slate-800 hover:border-emerald-500/40'
                    }`}
                    title="Phone"
                  >
                    <FaPhone className="text-base" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Hero Profile Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm sm:max-w-md">
              {/* Outer decorative glow */}
              <div
                className={`absolute -inset-1 rounded-3xl opacity-25 blur-xl transition duration-1000 ${
                  isCyber
                    ? 'bg-gradient-to-r from-emerald-500 to-cyan-500'
                    : 'bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500'
                }`}
              ></div>

              {/* Card Container */}
              <div
                className={`relative rounded-3xl border p-6 sm:p-8 shadow-2xl backdrop-blur-xl ${
                  isLight
                    ? 'bg-white/90 border-slate-200/90 shadow-slate-200/50'
                    : isCyber
                    ? 'bg-[#030e16] border-emerald-500/40 shadow-[0_0_25px_rgba(16,185,129,0.15)]'
                    : 'bg-gradient-to-b from-[#10182c] to-[#0c1222] border-slate-700/80'
                }`}
              >
                {/* Header with Avatar */}
                <div
                  className={`flex flex-col items-center text-center pb-6 border-b ${
                    isLight
                      ? 'border-slate-200'
                      : isCyber
                      ? 'border-emerald-500/20'
                      : 'border-slate-800/80'
                  }`}
                >
                  <div className="relative mb-4 group">
                    <div
                      className={`absolute -inset-1 rounded-full opacity-80 blur-sm group-hover:opacity-100 transition duration-500 ${
                        isCyber
                          ? 'bg-gradient-to-tr from-emerald-400 to-cyan-400'
                          : 'bg-gradient-to-tr from-indigo-500 to-teal-400'
                      }`}
                    ></div>
                    <img
                      src={avatarUrl}
                      alt={name}
                      className={`relative w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-2 shadow-xl ${
                        isCyber ? 'border-emerald-400' : 'border-indigo-400/50'
                      }`}
                    />
                    <div className="absolute bottom-1 right-1 h-5 w-5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 shadow"></div>
                  </div>

                  <h3
                    className={`text-xl font-bold tracking-tight ${
                      isLight
                        ? 'text-slate-900'
                        : isCyber
                        ? 'text-emerald-300'
                        : 'text-white'
                    }`}
                  >
                    {name}
                  </h3>
                  <p
                    className={`text-xs font-mono mt-0.5 ${
                      isCyber ? 'text-cyan-400' : 'text-indigo-500 dark:text-indigo-400'
                    }`}
                  >
                    @{config.github.username}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    {config.dateOfBirth.dateOfBirth || 'Vietnam 🇻🇳'}
                  </p>
                </div>

                {/* Quick Profile Specs */}
                <div className="pt-6 space-y-3">
                  <div
                    className={`flex items-center justify-between p-3 rounded-xl border ${
                      isLight
                        ? 'bg-slate-50 border-slate-200'
                        : isCyber
                        ? 'bg-[#021820] border-emerald-500/25'
                        : 'bg-slate-900/60 border-slate-800/80'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg ${
                          isCyber
                            ? 'bg-cyan-500/15 text-cyan-300'
                            : 'bg-indigo-500/10 text-indigo-500 dark:text-indigo-400'
                        }`}
                      >
                        <FaGraduationCap className="text-sm" />
                      </div>
                      <div className="text-left">
                        <p className="text-xs text-slate-400">Education</p>
                        <p
                          className={`text-xs font-semibold ${
                            isLight
                              ? 'text-slate-900'
                              : isCyber
                              ? 'text-emerald-200'
                              : 'text-white'
                          }`}
                        >
                          {profileData.education[0]?.institution ? 'HUTECH' : 'HUTECH'} ({profileData.education[0]?.degree?.replace('Current ', '') || 'GPA: 3.6/4.0'})
                        </p>
                      </div>
                    </div>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                        isCyber
                          ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
                          : 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border-indigo-500/20'
                      }`}
                    >
                      {profileData.education[0]?.from} - {profileData.education[0]?.to}
                    </span>
                  </div>

                  <div
                    className={`flex items-center justify-between p-3 rounded-xl border ${
                      isLight
                        ? 'bg-slate-50 border-slate-200'
                        : isCyber
                        ? 'bg-[#021820] border-emerald-500/25'
                        : 'bg-slate-900/60 border-slate-800/80'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg ${
                          isCyber
                            ? 'bg-emerald-500/15 text-emerald-300'
                            : 'bg-teal-500/10 text-teal-600 dark:text-teal-400'
                        }`}
                      >
                        <FaBrain className="text-sm" />
                      </div>
                      <div className="text-left">
                        <p className="text-xs text-slate-400">Latest Role</p>
                        <p
                          className={`text-xs font-semibold ${
                            isLight
                              ? 'text-slate-900'
                              : isCyber
                              ? 'text-emerald-200'
                              : 'text-white'
                          }`}
                        >
                          {profileData.experiences[0]?.position || 'AI Engineer'}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                        isCyber
                          ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                          : 'bg-teal-500/10 text-teal-600 dark:text-teal-300 border-teal-500/20'
                      }`}
                    >
                      {profileData.experiences[0]?.company || 'TO_TravelRAG'}
                    </span>
                  </div>

                  <div
                    className={`flex items-center justify-between p-3 rounded-xl border ${
                      isLight
                        ? 'bg-slate-50 border-slate-200'
                        : isCyber
                        ? 'bg-[#021820] border-emerald-500/25'
                        : 'bg-slate-900/60 border-slate-800/80'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg ${
                          isCyber
                            ? 'bg-emerald-500/15 text-emerald-300'
                            : 'bg-purple-500/10 text-purple-600 dark:text-purple-400'
                        }`}
                      >
                        <FaServer className="text-sm" />
                      </div>
                      <div className="text-left">
                        <p className="text-xs text-slate-400">Core Focus</p>
                        <p
                          className={`text-xs font-semibold ${
                            isLight
                              ? 'text-slate-900'
                              : isCyber
                              ? 'text-emerald-200'
                              : 'text-white'
                          }`}
                        >
                          {profileData.personal.role || 'AI Engineer & Backend'}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                        isCyber
                          ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                          : 'bg-purple-500/10 text-purple-600 dark:text-purple-300 border-purple-500/20'
                      }`}
                    >
                      {profileData.personal.tagline || 'AI'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Highlights Grid - Driven directly by profile.data.json */}
        <div className="mt-16 sm:mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {profileData.heroHighlights.map((highlight, idx) => {
            const icons = [
              <FaServer className="text-lg" />,
              <FaBrain className="text-lg" />,
              <FaCode className="text-lg" />,
              <FaGraduationCap className="text-lg" />,
            ];
            const icon = icons[idx % icons.length];
            return (
              <ScrollReveal key={idx} delay={idx * 120} direction="up" className="h-full">
                <div
                  className={`h-full p-5 rounded-2xl border transition-all duration-300 group shadow-md hover:-translate-y-1.5 cursor-pointer ${
                    isLight
                      ? 'bg-white border-slate-200 hover:border-indigo-400 shadow-slate-200/60 hover:shadow-xl'
                      : isCyber
                      ? 'bg-[#041118] border-emerald-500/30 hover:border-cyan-400 shadow-[0_0_15px_rgba(16,185,129,0.08)] hover:shadow-[0_0_25px_rgba(6,182,212,0.2)]'
                      : 'bg-gradient-to-b from-slate-900/80 to-slate-950/80 border-slate-800 hover:border-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/10'
                  }`}
                >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform ${
                    isCyber
                      ? 'bg-emerald-500/10 text-emerald-300'
                      : idx === 1
                      ? 'bg-purple-500/10 text-purple-500 dark:text-purple-400'
                      : idx === 2
                      ? 'bg-blue-500/10 text-blue-500 dark:text-blue-400'
                      : idx === 3
                      ? 'bg-teal-500/10 text-teal-600 dark:text-teal-400'
                      : 'bg-indigo-500/10 text-indigo-500 dark:text-indigo-400'
                  }`}
                >
                  {icon}
                </div>
                <h4
                  className={`text-sm font-bold ${
                    isLight
                      ? 'text-slate-900'
                      : isCyber
                      ? 'text-emerald-300'
                      : 'text-white'
                  }`}
                >
                  {highlight.title}
                </h4>
                <p
                  className={`text-xs mt-1 leading-relaxed ${
                    isLight
                      ? 'text-slate-600'
                      : isCyber
                      ? 'text-emerald-100/70'
                      : 'text-slate-400'
                  }`}
                >
                  {highlight.description}
                </p>
              </div>
            </ScrollReveal>
          );
        })}
        </div>
      </div>
    </section>
  );
};

export default Hero;
