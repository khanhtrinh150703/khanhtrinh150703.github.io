import React from 'react';
import {
  FaSun,
  FaCloud,
  FaCloudRain,
  FaMoon,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaArrowRight,
  FaDownload,
  FaBrain,
  FaTerminal,
  FaWind,
  FaDroplet,
  FaGaugeHigh,
} from 'react-icons/fa6';
import {
  SiPython,
  SiCplusplus,
  SiNodedotjs,
  SiSpringboot,
  SiDocker,
  SiNeo4J,
} from 'react-icons/si';
import { SanitizedConfig } from '../../interfaces/sanitized-config';
import { Profile } from '../../interfaces/profile';
import profileData from '../../../profile.data.json';
import { WeatherTheme } from './ThemeSwitcher';

interface HeroProps {
  config: SanitizedConfig;
  profile: Profile | null;
  theme?: WeatherTheme;
  loading?: boolean;
}

const Hero: React.FC<HeroProps> = ({ config, theme = 'sunny' }) => {
  const isLight = theme === 'sunny' || theme === 'cloudy';

  // Small refined avatar image from public folder
  const avatarUrl = '/avatar.jpg';
  const name = profileData.personal.name || 'Nguyen Ba Khanh Trinh';
  const role = profileData.personal.role || 'AI Engineer & Backend Developer';
  const bio =
    config.description.description ||
    profileData.personal.shortBio ||
    'An AI Engineer with strong Backend and High-Performance Systems background. Specialized in Hybrid GraphRAG, Knowledge Graphs, Edge AI, and scalable backend architectures.';

  // Weather Condition Meta
  const weatherMeta = {
    sunny: {
      badge: 'Clear Skies & Optimal Atmosphere',
      icon: <FaSun className="text-amber-500 animate-spin-slow text-xs" />,
      pillBg: 'bg-amber-500/10 border-amber-300/40 text-amber-800 dark:text-amber-300',
      ringGradient: 'from-amber-400 via-yellow-300 to-sky-400',
      temp: '28°C',
      humidity: '42%',
      pressure: '1013 hPa',
      wind: '12 km/h NE',
      status: 'High Performance Inferences',
    },
    cloudy: {
      badge: 'High-Altitude Clouds & Cumulus Drift',
      icon: <FaCloud className="text-sky-500 text-xs" />,
      pillBg: 'bg-sky-500/10 border-sky-300/40 text-sky-800 dark:text-sky-300',
      ringGradient: 'from-sky-400 via-blue-300 to-slate-200',
      temp: '24°C',
      humidity: '58%',
      pressure: '1012 hPa',
      wind: '9 km/h W',
      status: 'Deep Architectural Planning',
    },
    rainy: {
      badge: 'Gentle Rain & Refreshing Precision',
      icon: <FaCloudRain className="text-cyan-400 text-xs" />,
      pillBg: 'bg-cyan-500/15 border-cyan-400/30 text-cyan-200',
      ringGradient: 'from-cyan-400 via-sky-500 to-blue-600',
      temp: '21°C',
      humidity: '88%',
      pressure: '1008 hPa',
      wind: '16 km/h SW',
      status: 'Focused Code Synthesis',
    },
    moonlit: {
      badge: 'Moonlit Night & Stellar Constellations',
      icon: <FaMoon className="text-indigo-300 text-xs" />,
      pillBg: 'bg-indigo-500/15 border-indigo-400/30 text-indigo-200',
      ringGradient: 'from-indigo-400 via-blue-500 to-sky-300',
      temp: '19°C',
      humidity: '65%',
      pressure: '1015 hPa',
      wind: '7 km/h N',
      status: 'Autonomous Deep Execution',
    },
  }[theme];

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Meteorological Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Vision & Identity */}
          <div className="lg:col-span-8 flex flex-col items-start space-y-6 text-left">
            {/* Weather Station Atmosphere Badge */}
            <div
              className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-mono font-medium backdrop-blur-xl border transition-all shadow-sm ${weatherMeta.pillBg}`}
            >
              {weatherMeta.icon}
              <span className="font-semibold">{weatherMeta.badge}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60"></span>
              <span className="opacity-90">{weatherMeta.temp}</span>
            </div>

            {/* Profile Avatar & Identity Header Row */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6 pt-1">
              {/* Compact Weather Avatar */}
              <div className="relative group shrink-0 w-fit">
                {/* Rotating Weather Aura Halo */}
                <div
                  className={`absolute -inset-1 rounded-full bg-gradient-to-tr ${weatherMeta.ringGradient} opacity-75 blur-sm group-hover:opacity-100 transition-opacity duration-500`}
                />

                {/* Avatar Frame with small rounded size */}
                <div
                  className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 shadow-lg transition-transform duration-300 group-hover:scale-105 ${
                    isLight
                      ? 'border-white bg-white shadow-sky-200/50'
                      : 'border-slate-800 bg-slate-900 shadow-black/60'
                  }`}
                >
                  <img
                    src={avatarUrl}
                    alt={name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                {/* Live Weather Status Indicator Pin */}
                <div
                  className={`absolute -bottom-1 -right-1 p-1.5 rounded-full border shadow-md flex items-center justify-center ${
                    isLight
                      ? 'bg-white border-sky-100 text-sky-600'
                      : 'bg-slate-900 border-sky-500/40 text-sky-300'
                  }`}
                  title={weatherMeta.status}
                >
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-500"></span>
                  </span>
                </div>
              </div>

              {/* Title & Domain */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-sky-600 dark:text-sky-400">
                  <span>METEOROLOGICAL CODING STATION</span>
                  <span>•</span>
                  <span>VIETNAM 🇻🇳</span>
                </div>

                <h1
                  className={`text-3xl sm:text-4xl md:text-5xl font-black tracking-tight ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  {name}
                </h1>

                <p className="text-base sm:text-lg font-bold text-sky-700 dark:text-sky-300">
                  {role}
                </p>
              </div>
            </div>

            {/* Narrative Bio */}
            <p
              className={`text-sm sm:text-base leading-relaxed max-w-3xl ${
                isLight ? 'text-slate-600' : 'text-slate-300/90'
              }`}
            >
              {bio}
            </p>

            {/* Weather Telemetry Instrument Bar */}
            <div
              className={`w-full max-w-3xl grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 rounded-2xl border backdrop-blur-xl ${
                isLight
                  ? 'bg-white/80 border-sky-100 shadow-sm shadow-sky-100/50'
                  : 'bg-slate-900/60 border-sky-500/20 shadow-inner'
              }`}
            >
              <div className="p-2 rounded-xl flex items-center gap-2.5">
                <FaGaugeHigh className="text-sky-500 text-base shrink-0" />
                <div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Pressure</div>
                  <div
                    className={`text-xs font-mono font-bold ${
                      isLight ? 'text-slate-800' : 'text-slate-200'
                    }`}
                  >
                    {weatherMeta.pressure}
                  </div>
                </div>
              </div>

              <div className="p-2 rounded-xl flex items-center gap-2.5">
                <FaDroplet className="text-cyan-500 text-base shrink-0" />
                <div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Humidity</div>
                  <div
                    className={`text-xs font-mono font-bold ${
                      isLight ? 'text-slate-800' : 'text-slate-200'
                    }`}
                  >
                    {weatherMeta.humidity}
                  </div>
                </div>
              </div>

              <div className="p-2 rounded-xl flex items-center gap-2.5">
                <FaWind className="text-teal-500 text-base shrink-0" />
                <div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Wind Velocity</div>
                  <div
                    className={`text-xs font-mono font-bold ${
                      isLight ? 'text-slate-800' : 'text-slate-200'
                    }`}
                  >
                    {weatherMeta.wind}
                  </div>
                </div>
              </div>

              <div className="p-2 rounded-xl flex items-center gap-2.5">
                <FaBrain className="text-amber-500 text-base shrink-0" />
                <div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Status</div>
                  <div
                    className={`text-xs font-mono font-bold truncate ${
                      isLight ? 'text-slate-800' : 'text-slate-200'
                    }`}
                  >
                    {weatherMeta.status.split(' ')[0]} Active
                  </div>
                </div>
              </div>
            </div>

            {/* Core Technical Capabilities Ribbon */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {[
                { name: 'Python (GraphRAG)', icon: <SiPython className="text-amber-500" /> },
                { name: 'C++ Parallel (3.5x)', icon: <SiCplusplus className="text-blue-500" /> },
                { name: 'Node.js (TypeScript)', icon: <SiNodedotjs className="text-green-500" /> },
                { name: 'Java Spring Boot', icon: <SiSpringboot className="text-emerald-500" /> },
                { name: 'Knowledge Graphs', icon: <SiNeo4J className="text-sky-500" /> },
                { name: 'Docker Containerization', icon: <SiDocker className="text-sky-500" /> },
              ].map((item, idx) => (
                <span
                  key={idx}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono border backdrop-blur-md transition-all ${
                    isLight
                      ? 'bg-white/80 border-sky-100 text-slate-700 shadow-xs hover:border-sky-300'
                      : 'bg-slate-900/60 border-sky-500/20 text-slate-200 hover:border-sky-400/40'
                  }`}
                >
                  <span className="text-xs">{item.icon}</span>
                  <span>{item.name}</span>
                </span>
              ))}
            </div>

            {/* Atmospheric Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2.5 px-6 py-3 text-sm font-semibold rounded-2xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-lg shadow-sky-400/30 hover:shadow-xl hover:shadow-sky-400/40 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
              >
                <span>Explore Radar Projects</span>
                <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#contact"
                className={`inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-2xl border backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 cursor-pointer ${
                  isLight
                    ? 'bg-white/90 hover:bg-sky-50 text-slate-800 border-sky-200 shadow-xs'
                    : 'bg-slate-900/80 hover:bg-slate-800 text-sky-200 border-sky-500/30'
                }`}
              >
                <span>Dispatch Signal</span>
              </a>

              {config.resume.fileUrl && (
                <a
                  href={config.resume.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center gap-2 px-4 py-3 text-sm font-semibold rounded-2xl border transition-all cursor-pointer ${
                    isLight
                      ? 'bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100'
                      : 'border-sky-500/20 bg-slate-900/60 text-sky-300 hover:bg-slate-800'
                  }`}
                >
                  <FaDownload className="text-xs" />
                  <span>Resume</span>
                </a>
              )}
            </div>
          </div>

          {/* Right Column: Atmospheric Bento Meteorological Station Radar */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {/* Weather Radar Station Card */}
            <div
              className={`p-6 rounded-3xl border backdrop-blur-xl transition-all shadow-xl ${
                isLight
                  ? 'bg-white/90 border-sky-100 shadow-sky-100/50'
                  : 'bg-slate-900/80 border-sky-500/25 shadow-[0_15px_35px_rgba(0,0,0,0.5)]'
              }`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-sky-500/15 text-xs font-mono">
                <span className="flex items-center gap-2 text-sky-600 dark:text-sky-400 font-semibold uppercase tracking-wider">
                  <FaTerminal className="text-xs" />
                  <span>WEATHER RADAR CORE</span>
                </span>
                <span className="text-[11px] text-slate-400">KT-METEO-01</span>
              </div>

              <div className="space-y-4 pt-4">
                {profileData.heroHighlights.map((highlight, idx) => (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-2xl border transition-all ${
                      isLight
                        ? 'bg-sky-50/50 border-sky-100 hover:bg-sky-50 hover:border-sky-200'
                        : 'bg-slate-950/40 border-sky-500/15 hover:border-sky-400/30'
                    }`}
                  >
                    <div className="flex items-center gap-2 text-xs font-bold tracking-tight">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
                      <span className={isLight ? 'text-slate-900' : 'text-slate-100'}>
                        {highlight.title}
                      </span>
                    </div>
                    <p
                      className={`text-[11px] mt-1 leading-normal ${
                        isLight ? 'text-slate-500' : 'text-slate-400'
                      }`}
                    >
                      {highlight.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Direct Connectivity Strip */}
              <div className="pt-4 mt-4 border-t border-sky-500/15 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Signals:</span>
                <div className="flex items-center gap-2">
                  {config.github.username && (
                    <a
                      href={`https://github.com/${config.github.username}`}
                      target="_blank"
                      rel="noreferrer"
                      className={`p-2 rounded-xl border transition-colors ${
                        isLight
                          ? 'bg-white hover:bg-sky-50 text-slate-700 hover:text-sky-600 border-sky-200'
                          : 'bg-slate-950 hover:bg-slate-800 text-sky-200 border-sky-500/30'
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
                      className={`p-2 rounded-xl border transition-colors ${
                        isLight
                          ? 'bg-white hover:bg-sky-50 text-slate-700 hover:text-sky-600 border-sky-200'
                          : 'bg-slate-950 hover:bg-slate-800 text-sky-200 border-sky-500/30'
                      }`}
                      title="LinkedIn"
                    >
                      <FaLinkedin className="text-sm" />
                    </a>
                  )}
                  {config.social.email && (
                    <a
                      href={`mailto:${config.social.email}`}
                      className={`p-2 rounded-xl border transition-colors ${
                        isLight
                          ? 'bg-white hover:bg-sky-50 text-slate-700 hover:text-sky-600 border-sky-200'
                          : 'bg-slate-950 hover:bg-slate-800 text-sky-200 border-sky-500/30'
                      }`}
                      title="Email"
                    >
                      <FaEnvelope className="text-sm" />
                    </a>
                  )}
                  {config.social.phone && (
                    <a
                      href={`tel:${config.social.phone}`}
                      className={`p-2 rounded-xl border transition-colors ${
                        isLight
                          ? 'bg-white hover:bg-sky-50 text-slate-700 hover:text-sky-600 border-sky-200'
                          : 'bg-slate-950 hover:bg-slate-800 text-sky-200 border-sky-500/30'
                      }`}
                      title="Phone"
                    >
                      <FaPhone className="text-sm" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
