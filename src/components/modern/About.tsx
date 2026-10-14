import React from 'react';
import {
  FaCheck,
  FaBrain,
  FaMicrochip,
  FaBolt,
  FaServer,
  FaGraduationCap,
  FaLocationDot,
  FaBriefcase,
} from 'react-icons/fa6';
import { SanitizedConfig } from '../../interfaces/sanitized-config';
import { Profile } from '../../interfaces/profile';
import profileData from '../../../profile.data.json';
import { WeatherTheme } from './ThemeSwitcher';
import ScrollReveal from './ScrollReveal';

interface AboutProps {
  config: SanitizedConfig;
  profile: Profile | null;
  theme?: WeatherTheme;
}

const About: React.FC<AboutProps> = ({ theme = 'sunny' }) => {
  const isLight = theme === 'sunny' || theme === 'cloudy' || theme === 'snowy';

  const strengths = [
    {
      title: 'GraphRAG & Knowledge Graphs',
      desc: 'Ontology-driven retrieval, dual-engine SPARQL & Vector queries, and semantic validation (SHACL, SWRL) for factual synthesis.',
      icon: <FaBrain className="text-sky-500 text-lg" />,
    },
    {
      title: 'Edge AI & Industrial Vision',
      desc: 'Real-world YOLO deployment with TensorRT on NVIDIA Jetson, integrating industrial cameras (Basler, Cognex) for high-FPS inspection.',
      icon: <FaMicrochip className="text-blue-500 text-lg" />,
    },
    {
      title: 'Parallel & Systems Optimization',
      desc: 'C++ multi-threading, algorithmic speedup (3.5x+), PPC-tree data mining, and low-latency computation.',
      icon: <FaBolt className="text-amber-500 text-lg" />,
    },
    {
      title: 'Scalable Backend Architecture',
      desc: 'Clean Architecture, Domain-Driven Design (DDD), high-concurrency Node.js/Java APIs, Redis caching, and Docker.',
      icon: <FaServer className="text-emerald-500 text-lg" />,
    },
  ];

  return (
    <section id="about" className="py-16 md:py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="flex flex-col items-center text-center mb-14">
            <span
              className={`px-4 py-1.5 rounded-full text-xs font-mono font-medium border mb-3 ${
                isLight
                  ? 'bg-sky-50 border-sky-200 text-sky-700'
                  : 'bg-slate-900 border-slate-800 text-sky-300'
              }`}
            >
              ABOUT ME
            </span>
            <h2
              className={`text-3xl sm:text-4xl font-black tracking-tight ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              Background & Engineering Philosophy
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-sky-400 to-blue-600 rounded-full mt-3"></div>
          </div>
        </ScrollReveal>

        {/* 2-Column Coherent Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Personal Narrative & Philosophy */}
          <ScrollReveal direction="up" delay={100} className="lg:col-span-5 flex flex-col">
            <div
              className={`h-full p-8 rounded-3xl border backdrop-blur-xl flex flex-col justify-between ${
                isLight
                  ? 'bg-white/80 border-sky-100 shadow-[0_10px_30px_-5px_rgba(186,230,253,0.3)]'
                  : 'bg-slate-900/80 border-slate-800 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.5)]'
              }`}
            >
              <div className="space-y-4">
                <h3
                  className={`text-xl font-bold tracking-tight ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  {profileData.about.subheading}
                </h3>

                {profileData.about.paragraphs.map((p, idx) => (
                  <p
                    key={idx}
                    className={`leading-relaxed text-sm ${
                      isLight ? 'text-slate-600' : 'text-slate-300/90'
                    }`}
                  >
                    {p}
                  </p>
                ))}
              </div>

              {/* Quick Facts Strip */}
              <div
                className={`pt-6 mt-6 border-t space-y-3 text-xs ${
                  isLight ? 'border-sky-100' : 'border-slate-800'
                }`}
              >
                <div className="flex items-center gap-2.5 text-slate-600 dark:text-slate-400">
                  <FaGraduationCap className="text-sky-500 text-sm shrink-0" />
                  <span>
                    HUTECH Graduate • <strong>GPA 3.6 / 4.0</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-600 dark:text-slate-400">
                  <FaLocationDot className="text-sky-500 text-sm shrink-0" />
                  <span>Ho Chi Minh City, Vietnam 🇻🇳</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-600 dark:text-slate-400">
                  <FaBriefcase className="text-sky-500 text-sm shrink-0" />
                  <span>Open to AI Engineer Opportunities</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: 4 Technical Pillars */}
          <ScrollReveal direction="up" delay={200} className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {strengths.map((str, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-3xl border backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between ${
                  isLight
                    ? 'bg-white/80 border-sky-100 shadow-[0_8px_25px_-5px_rgba(186,230,253,0.25)] hover:shadow-sky-200/50 hover:border-sky-200'
                    : 'bg-slate-900/80 border-slate-800 shadow-[0_8px_25px_-5px_rgba(0,0,0,0.4)] hover:border-slate-700'
                }`}
              >
                <div>
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center mb-4 border ${
                      isLight
                        ? 'bg-sky-50 border-sky-100'
                        : 'bg-slate-950/80 border-slate-800'
                    }`}
                  >
                    {str.icon}
                  </div>
                  <h4
                    className={`text-base font-bold tracking-tight mb-2 ${
                      isLight ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    {str.title}
                  </h4>
                  <p
                    className={`text-xs leading-relaxed ${
                      isLight ? 'text-slate-600' : 'text-slate-300/80'
                    }`}
                  >
                    {str.desc}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 pt-4 text-[11px] font-mono text-sky-600 dark:text-sky-400">
                  <FaCheck className="text-[10px]" />
                  <span>Core Specialization</span>
                </div>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default About;
