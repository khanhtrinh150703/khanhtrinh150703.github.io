import React from 'react';
import {
  FaSun,
  FaCloud,
  FaCloudRain,
  FaMoon,
  FaSnowflake,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaLocationDot,
  FaArrowRight,
  FaDownload,
  FaBrain,
  FaBolt,
  FaMicrochip,
  FaGraduationCap,
  FaDiagramProject,
  FaArrowRightLong,
} from 'react-icons/fa6';
import {
  SiPython,
  SiCplusplus,
  SiNeo4J,
  SiDocker,
  SiNodedotjs,
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

const Hero: React.FC<HeroProps> = ({ config, theme = 'cloudy' }) => {
  const isLight = theme === 'sunny' || theme === 'cloudy' || theme === 'snowy';

  const avatarUrl = '/avatar.jpg';
  const name = profileData.personal.name || 'Nguyen Ba Khanh Trinh';
  const role = profileData.personal.role || 'AI Engineer';
  const phone = profileData.personal.phone || config.social?.phone || '0963788076';
  const email = profileData.personal.email || config.social?.email || 'khanhtrinh150703@gmail.com';
  const bio =
    profileData.personal.shortBio ||
    'An AI Engineer specialized in Hybrid GraphRAG, Knowledge Graphs (Ontotext GraphDB, Neo4j), Edge AI (NVIDIA Jetson, TensorRT, YOLO), backed by robust C++ parallel computing and high-concurrency systems expertise.';

  // Weather theme badge descriptor
  const weatherBadge = {
    cloudy: {
      label: 'Cloudy Sky • Architecture & Modeling',
      icon: <FaCloud className="text-sky-500 text-xs" />,
      pill: 'bg-sky-500/10 border-sky-300/40 text-sky-800 dark:text-sky-300',
      aura: 'from-sky-400 via-blue-300 to-slate-200',
    },
    rainy: {
      label: 'Rainy Sky • Deep Research & Synthesis',
      icon: <FaCloudRain className="text-cyan-400 text-xs" />,
      pill: 'bg-cyan-500/15 border-cyan-400/30 text-cyan-200',
      aura: 'from-cyan-400 via-sky-500 to-blue-600',
    },
    sunny: {
      label: 'Sunny Day • Optimal Real-Time Inference',
      icon: <FaSun className="text-amber-500 text-xs animate-spin-slow" />,
      pill: 'bg-amber-500/10 border-amber-300/40 text-amber-800 dark:text-amber-300',
      aura: 'from-amber-400 via-yellow-300 to-sky-400',
    },
    snowy: {
      label: 'Snowy Frost • Crystalline Logic & Precision',
      icon: <FaSnowflake className="text-cyan-600 text-xs animate-spin-slow" />,
      pill: 'bg-sky-100/90 border-sky-300 text-sky-900 shadow-sm shadow-sky-100',
      aura: 'from-cyan-300 via-sky-200 to-blue-200',
    },
    moonlit: {
      label: 'Moonlit Night • Autonomous Execution',
      icon: <FaMoon className="text-indigo-300 text-xs" />,
      pill: 'bg-indigo-500/15 border-indigo-400/30 text-indigo-200',
      aura: 'from-indigo-400 via-blue-500 to-sky-300',
    },
  }[theme];

  const primarySkills = [
    { name: 'Python (GraphRAG)', icon: <SiPython className="text-sky-500" /> },
    { name: 'C++ Parallel (3.5x)', icon: <SiCplusplus className="text-blue-500" /> },
    { name: 'Knowledge Graphs', icon: <SiNeo4J className="text-sky-500" /> },
    { name: 'Edge AI (TensorRT)', icon: <FaMicrochip className="text-emerald-500" /> },
    { name: 'Node.js (TypeScript)', icon: <SiNodedotjs className="text-green-500" /> },
    { name: 'Docker', icon: <SiDocker className="text-sky-400" /> },
  ];

  return (
    <section className="relative pt-32 pb-20 md:pt-36 md:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 2-Column Cloud-Glass Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* Left Column (7 cols): Vision, Identity & Positioning */}
          <div
            className={`lg:col-span-7 p-8 sm:p-10 rounded-3xl border backdrop-blur-xl transition-all duration-300 flex flex-col justify-between ${
              isLight
                ? 'bg-gradient-to-br from-white/95 via-sky-50/40 to-white/90 border-sky-100 shadow-[0_15px_40px_-10px_rgba(186,230,253,0.35)]'
                : 'bg-gradient-to-br from-slate-900/90 via-slate-900/75 to-slate-950/90 border-slate-800 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.6)]'
            }`}
          >
            <div>
              {/* Weather Status Pill */}
              <div
                className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-medium border mb-6 backdrop-blur-md shadow-xs ${weatherBadge.pill}`}
              >
                {weatherBadge.icon}
                <span>{weatherBadge.label}</span>
              </div>

              {/* Profile Avatar & Identity Header Row */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6 mb-6">
                {/* Compact Weather Avatar */}
                <div className="relative group shrink-0 w-fit">
                  <div
                    className={`absolute -inset-1 rounded-full bg-gradient-to-tr ${weatherBadge.aura} opacity-75 blur-sm group-hover:opacity-100 transition-opacity duration-500`}
                  />
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
                  {/* Live Status indicator */}
                  <span className="absolute bottom-0 right-0 flex h-3.5 w-3.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white dark:border-slate-900"></span>
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-sky-600 dark:text-sky-400 uppercase">
                    <span>AI ENGINEER</span>
                    <span>•</span>
                    <span>HO CHI MINH CITY 🇻🇳</span>
                  </div>
                  <h1
                    className={`text-3xl sm:text-4xl md:text-5xl font-black tracking-tight ${
                      isLight ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    {name}
                  </h1>
                  <p className="text-base sm:text-lg font-bold bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 dark:from-sky-400 dark:via-blue-300 dark:to-indigo-300 bg-clip-text text-transparent">
                    {role}
                  </p>
                </div>
              </div>

              {/* Quick Contact & Direct Credentials Row */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-5">
                <a
                  href={`tel:${phone}`}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-medium border transition-all duration-200 hover:-translate-y-0.5 ${
                    isLight
                      ? 'bg-sky-50/80 hover:bg-sky-100 text-sky-800 border-sky-200/80 shadow-xs'
                      : 'bg-slate-950/70 hover:bg-slate-800 text-sky-300 border-slate-800'
                  }`}
                  title={`Call Phone: ${phone}`}
                >
                  <FaPhone className="text-sky-500 text-[10px]" />
                  <span>0963 788 076</span>
                </a>

                <a
                  href={`mailto:${email}`}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-medium border transition-all duration-200 hover:-translate-y-0.5 ${
                    isLight
                      ? 'bg-sky-50/80 hover:bg-sky-100 text-sky-800 border-sky-200/80 shadow-xs'
                      : 'bg-slate-950/70 hover:bg-slate-800 text-sky-300 border-slate-800'
                  }`}
                  title={`Email: ${email}`}
                >
                  <FaEnvelope className="text-sky-500 text-[10px]" />
                  <span className="truncate max-w-[170px] sm:max-w-none">{email}</span>
                </a>

                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-medium border ${
                    isLight
                      ? 'bg-slate-50/80 text-slate-700 border-slate-200/80'
                      : 'bg-slate-950/50 text-slate-300 border-slate-800'
                  }`}
                >
                  <FaLocationDot className="text-sky-500 text-[10px]" />
                  <span>Ho Chi Minh City 🇻🇳</span>
                </span>
              </div>

              {/* Punchy Narrative Bio */}
              <p
                className={`text-sm sm:text-base leading-relaxed mb-5 ${
                  isLight ? 'text-slate-600' : 'text-slate-300/90'
                }`}
              >
                {bio}
              </p>

              {/* Core Skills Chips */}
              <div className="mb-6">
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 font-semibold mb-2 flex items-center gap-2">
                  <span>Core Technical Stack</span>
                  <div className="h-px bg-slate-200/80 dark:bg-slate-800/80 flex-1"></div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {primarySkills.map((s, idx) => (
                    <span
                      key={idx}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-medium border transition-all ${
                        isLight
                          ? 'bg-sky-50/80 border-sky-100 text-slate-700 shadow-xs'
                          : 'bg-slate-950/60 border-slate-800 text-slate-200'
                      }`}
                    >
                      <span>{s.icon}</span>
                      <span>{s.name}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons & Contact Row */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-slate-100 dark:border-slate-800/80">
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-md shadow-sky-400/30 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <span>Explore AI Projects</span>
                  <FaArrowRight className="text-xs" />
                </a>

                <a
                  href="#contact"
                  className={`inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-2xl border transition-all duration-200 hover:-translate-y-0.5 ${
                    isLight
                      ? 'bg-white hover:bg-sky-50 text-slate-800 border-sky-200 shadow-xs'
                      : 'bg-slate-800/80 hover:bg-slate-800 text-sky-200 border-slate-700'
                  }`}
                >
                  <span>Get in Touch</span>
                </a>

                {config.resume?.fileUrl && (
                  <a
                    href={config.resume.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-2xl border transition-all ${
                      isLight
                        ? 'bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100'
                        : 'border-slate-800 bg-slate-950/60 text-sky-300 hover:bg-slate-800'
                    }`}
                  >
                    <FaDownload className="text-xs" />
                    <span>Resume</span>
                  </a>
                )}
              </div>

              {/* Quick Contact & Social Icons */}
              <div className="flex items-center gap-2 flex-wrap">
                {phone && (
                  <a
                    href={`tel:${phone}`}
                    className={`p-2.5 rounded-xl border transition-colors hover:-translate-y-0.5 duration-200 ${
                      isLight
                        ? 'bg-white hover:bg-sky-50 text-slate-700 hover:text-sky-600 border-sky-200 shadow-xs'
                        : 'bg-slate-950 hover:bg-slate-800 text-sky-200 border-slate-800'
                    }`}
                    title={`Phone / Zalo: ${phone}`}
                  >
                    <FaPhone className="text-sm" />
                  </a>
                )}

                {config.github?.username && (
                  <a
                    href={`https://github.com/${config.github.username}`}
                    target="_blank"
                    rel="noreferrer"
                    className={`p-2.5 rounded-xl border transition-colors hover:-translate-y-0.5 duration-200 ${
                      isLight
                        ? 'bg-white hover:bg-sky-50 text-slate-700 hover:text-sky-600 border-sky-200 shadow-xs'
                        : 'bg-slate-950 hover:bg-slate-800 text-sky-200 border-slate-800'
                    }`}
                    title="GitHub"
                  >
                    <FaGithub className="text-sm" />
                  </a>
                )}
                {config.social?.linkedin && (
                  <a
                    href={`https://linkedin.com/in/${config.social.linkedin}`}
                    target="_blank"
                    rel="noreferrer"
                    className={`p-2.5 rounded-xl border transition-colors hover:-translate-y-0.5 duration-200 ${
                      isLight
                        ? 'bg-white hover:bg-sky-50 text-slate-700 hover:text-sky-600 border-sky-200 shadow-xs'
                        : 'bg-slate-950 hover:bg-slate-800 text-sky-200 border-slate-800'
                    }`}
                    title="LinkedIn"
                  >
                    <FaLinkedin className="text-sm" />
                  </a>
                )}
                {email && (
                  <a
                    href={`mailto:${email}`}
                    className={`p-2.5 rounded-xl border transition-colors hover:-translate-y-0.5 duration-200 ${
                      isLight
                        ? 'bg-white hover:bg-sky-50 text-slate-700 hover:text-sky-600 border-sky-200 shadow-xs'
                        : 'bg-slate-950 hover:bg-slate-800 text-sky-200 border-slate-800'
                    }`}
                    title={`Email: ${email}`}
                  >
                    <FaEnvelope className="text-sm" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): The "Điểm Nhấn" - AI System Architecture Blueprint Card */}
          <div
            className={`lg:col-span-5 p-7 sm:p-8 rounded-3xl border backdrop-blur-xl transition-all duration-300 flex flex-col justify-between ${
              isLight
                ? 'bg-white/85 border-sky-100 shadow-[0_15px_40px_-10px_rgba(186,230,253,0.3)]'
                : 'bg-slate-900/85 border-slate-800 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.6)]'
            }`}
          >
            {/* Blueprint Header */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-sky-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="font-mono text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                    AI SYSTEM ARCHITECTURE
                  </span>
                </div>
                <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-sky-50 dark:bg-slate-800 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-slate-700">
                  FLAGSHIP
                </span>
              </div>

              {/* Visual Pipeline Flow Box */}
              <div
                className={`mt-5 p-4 rounded-2xl border ${
                  isLight
                    ? 'bg-sky-50/50 border-sky-100'
                    : 'bg-slate-950/50 border-slate-800'
                }`}
              >
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200 mb-3">
                  <FaDiagramProject className="text-sky-500" />
                  <span>Hybrid GraphRAG Pipeline</span>
                </div>

                <div className="space-y-2 font-mono text-[11px]">
                  <div className="flex items-center justify-between p-2 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-sky-100/60 dark:border-slate-800">
                    <span className="text-slate-500 dark:text-slate-400">Input Source</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">Booking.com Unstructured Metadata</span>
                  </div>
                  <div className="flex justify-center text-sky-500 text-xs">
                    <FaArrowRightLong className="rotate-90 my-0.5" />
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-sky-100/60 dark:border-slate-800">
                    <span className="text-slate-500 dark:text-slate-400">Extraction</span>
                    <span className="font-bold text-sky-600 dark:text-sky-400">LLM Triples & SHACL Validation</span>
                  </div>
                  <div className="flex justify-center text-sky-500 text-xs">
                    <FaArrowRightLong className="rotate-90 my-0.5" />
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-sky-100/60 dark:border-slate-800">
                    <span className="text-slate-500 dark:text-slate-400">Dual Retrieval</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">SPARQL (GraphDB) + Vector (Qdrant)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* High Impact Key Telemetry Metric Grid */}
            <div className="grid grid-cols-2 gap-3 mt-5 pt-4 border-t border-sky-100 dark:border-slate-800">
              <div
                className={`p-3 rounded-2xl border ${
                  isLight
                    ? 'bg-sky-50/50 border-sky-100'
                    : 'bg-slate-950/40 border-slate-800'
                }`}
              >
                <div className="flex items-center gap-1.5 text-amber-500 mb-1">
                  <FaBolt className="text-xs" />
                  <span className="text-[10px] font-mono uppercase font-bold text-slate-400">Parallel C++</span>
                </div>
                <div className="text-lg font-black font-mono text-slate-900 dark:text-white">
                  3.5x+ Speedup
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">N-List Mining</div>
              </div>

              <div
                className={`p-3 rounded-2xl border ${
                  isLight
                    ? 'bg-sky-50/50 border-sky-100'
                    : 'bg-slate-950/40 border-slate-800'
                }`}
              >
                <div className="flex items-center gap-1.5 text-emerald-500 mb-1">
                  <FaMicrochip className="text-xs" />
                  <span className="text-[10px] font-mono uppercase font-bold text-slate-400">Edge AI</span>
                </div>
                <div className="text-lg font-black font-mono text-slate-900 dark:text-white">
                  High-FPS
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">TensorRT Jetson</div>
              </div>

              <div
                className={`p-3 rounded-2xl border ${
                  isLight
                    ? 'bg-sky-50/50 border-sky-100'
                    : 'bg-slate-950/40 border-slate-800'
                }`}
              >
                <div className="flex items-center gap-1.5 text-sky-500 mb-1">
                  <FaBrain className="text-xs" />
                  <span className="text-[10px] font-mono uppercase font-bold text-slate-400">Semantic Web</span>
                </div>
                <div className="text-lg font-black font-mono text-slate-900 dark:text-white">
                  RDF / OWL
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">Knowledge Graph</div>
              </div>

              <div
                className={`p-3 rounded-2xl border ${
                  isLight
                    ? 'bg-sky-50/50 border-sky-100'
                    : 'bg-slate-950/40 border-slate-800'
                }`}
              >
                <div className="flex items-center gap-1.5 text-blue-500 mb-1">
                  <FaGraduationCap className="text-xs" />
                  <span className="text-[10px] font-mono uppercase font-bold text-slate-400">Academics</span>
                </div>
                <div className="text-lg font-black font-mono text-slate-900 dark:text-white">
                  3.6 / 4.0
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">HUTECH Software Eng.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
