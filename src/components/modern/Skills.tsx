import React, { useState } from 'react';
import {
  FaDatabase,
  FaBrain,
  FaServer,
  FaWandMagicSparkles,
  FaMicrochip,
  FaDiagramProject,
  FaEye,
  FaLayerGroup,
  FaCube,
  FaNetworkWired,
  FaWind,
} from 'react-icons/fa6';
import {
  SiSpringboot,
  SiNodedotjs,
  SiTypescript,
  SiJavascript,
  SiPython,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiDocker,
  SiRedis,
  SiCplusplus,
  SiNeo4J,
  SiLinux,
} from 'react-icons/si';

import profileData from '../../../profile.data.json';
import { WeatherTheme } from './ThemeSwitcher';
import ScrollReveal from './ScrollReveal';

interface SkillsProps {
  skills: string[];
  theme?: WeatherTheme;
}

const getSkillIcon = (name: string) => {
  const lower = name.toLowerCase();
  if (lower.includes('spring') || (lower.includes('java') && !lower.includes('script')))
    return <SiSpringboot className="text-emerald-500" />;
  if (lower.includes('node')) return <SiNodedotjs className="text-green-500" />;
  if (lower.includes('typescript')) return <SiTypescript className="text-blue-500" />;
  if (lower.includes('javascript')) return <SiJavascript className="text-yellow-500" />;
  if (lower.includes('python')) return <SiPython className="text-sky-400" />;
  if (lower.includes('postgres')) return <SiPostgresql className="text-blue-400" />;
  if (lower.includes('mysql')) return <SiMysql className="text-blue-400" />;
  if (lower.includes('mongo')) return <SiMongodb className="text-emerald-500" />;
  if (lower.includes('redis')) return <SiRedis className="text-rose-400" />;
  if (lower.includes('docker')) return <SiDocker className="text-sky-400" />;
  if (lower.includes('c / c++') || lower.includes('c++') || lower.includes('c/c++') || lower.includes('c#'))
    return <SiCplusplus className="text-blue-500" />;
  if (lower.includes('neo4j')) return <SiNeo4J className="text-sky-400" />;
  if (lower.includes('graphdb') || lower.includes('graphrag') || lower.includes('graph'))
    return <FaDiagramProject className="text-sky-500" />;
  if (lower.includes('yolo') || lower.includes('vision') || lower.includes('camera'))
    return <FaEye className="text-sky-400" />;
  if (lower.includes('jetson') || lower.includes('tensorrt') || lower.includes('edge') || lower.includes('cuda'))
    return <FaMicrochip className="text-blue-400" />;
  if (lower.includes('qdrant') || lower.includes('vector') || lower.includes('embedding'))
    return <FaLayerGroup className="text-sky-400" />;
  if (lower.includes('sparql') || lower.includes('rdf') || lower.includes('owl') || lower.includes('semantic') || lower.includes('shacl'))
    return <FaNetworkWired className="text-indigo-400" />;
  if (lower.includes('clean architecture') || lower.includes('ddd') || lower.includes('architecture'))
    return <FaCube className="text-blue-500" />;
  if (lower.includes('linux') || lower.includes('ubuntu') || lower.includes('wsl'))
    return <SiLinux className="text-amber-500" />;
  if (lower.includes('mining') || lower.includes('data') || lower.includes('sql') || lower.includes('storage'))
    return <FaDatabase className="text-sky-400" />;
  return <FaBrain className="text-sky-500" />;
};

const getCategoryIcon = (index: number) => {
  if (index === 0) return <FaBrain className="text-sky-500" />;
  if (index === 1) return <FaServer className="text-blue-500" />;
  return <FaDatabase className="text-indigo-400" />;
};

const Skills: React.FC<SkillsProps> = ({ skills, theme = 'sunny' }) => {
  const isLight = theme === 'sunny' || theme === 'cloudy';
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const skillCategories = (profileData.skills?.categories || []).map((cat, idx) => ({
    title: cat.title,
    description: cat.description,
    icon: getCategoryIcon(idx),
    items: cat.skills.map((skillName) => ({
      name: skillName,
      icon: getSkillIcon(skillName),
    })),
  }));

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="flex flex-col items-center text-center mb-16">
            <div
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium mb-3 border shadow-sm ${
                isLight
                  ? 'bg-sky-50 border-sky-200 text-sky-700'
                  : 'bg-slate-900/80 border-sky-500/30 text-sky-300 shadow-sm'
              }`}
            >
              <FaWind className="text-xs text-sky-500" />
              <span>{profileData.skills?.badge || 'ATMOSPHERIC MATRIX • CAPABILITIES'}</span>
            </div>
            <h2
              className={`text-3xl sm:text-4xl font-black tracking-tight ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              {profileData.skills?.title || 'Technical Stack & Capabilities'}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 rounded-full mt-4"></div>
            {profileData.skills?.description && (
              <p
                className={`text-sm max-w-lg mt-3 ${
                  isLight ? 'text-slate-600' : 'text-slate-400'
                }`}
              >
                {profileData.skills.description}
              </p>
            )}
          </div>
        </ScrollReveal>

        {/* Categories Grid with ScrollReveal & Stagger */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillCategories.map((cat, idx) => (
            <ScrollReveal key={idx} delay={idx * 120} direction="up" className="h-full">
              <div
                className={`h-full p-7 rounded-3xl border transition-all duration-300 shadow-md flex flex-col justify-between group hover:-translate-y-1.5 backdrop-blur-xl ${
                  isLight
                    ? 'bg-white/95 border-sky-100 shadow-sky-100/40 hover:border-sky-300 hover:shadow-xl hover:shadow-sky-200/40'
                    : 'bg-slate-900/80 border-sky-500/20 hover:border-sky-400/50 shadow-[0_15px_35px_rgba(0,0,0,0.5)]'
                }`}
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`p-3 rounded-2xl border text-lg group-hover:scale-110 transition-transform ${
                        isLight
                          ? 'bg-sky-50 border-sky-100 text-sky-600'
                          : 'bg-slate-950/70 border-sky-500/30 shadow-md'
                      }`}
                    >
                      {cat.icon}
                    </div>
                    <div>
                      <h3
                        className={`text-base font-bold tracking-tight ${
                          isLight ? 'text-slate-900' : 'text-white'
                        }`}
                      >
                        {cat.title}
                      </h3>
                    </div>
                  </div>

                  <p
                    className={`text-xs mb-6 leading-relaxed ${
                      isLight ? 'text-slate-600' : 'text-slate-300/80'
                    }`}
                  >
                    {cat.description}
                  </p>

                  {/* Skill Chips with Interactive Click */}
                  <div className="flex flex-wrap gap-2.5">
                    {cat.items.map((skill, sIdx) => {
                      const isSelected = selectedSkill === skill.name;
                      return (
                        <button
                          key={sIdx}
                          onClick={() =>
                            setSelectedSkill(isSelected ? null : skill.name)
                          }
                          className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-medium transition-all duration-200 shadow-sm hover:scale-105 active:scale-95 cursor-pointer ${
                            isSelected
                              ? isLight
                                ? 'bg-sky-500 border-sky-400 text-white shadow-md shadow-sky-200 ring-2 ring-sky-300/60'
                                : 'bg-sky-600 border-sky-400 text-white ring-2 ring-sky-400/50 shadow-[0_0_20px_rgba(2,132,199,0.5)]'
                              : isLight
                              ? 'bg-sky-50/70 hover:bg-sky-100/80 border-sky-200/70 hover:border-sky-300 text-slate-800'
                              : 'bg-slate-950/60 hover:bg-slate-800/80 border-sky-500/20 hover:border-sky-400/40 text-slate-200'
                          }`}
                        >
                          <span className="text-sm">{skill.icon}</span>
                          <span>{skill.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div
                  className={`mt-8 pt-4 border-t flex items-center justify-between text-[11px] font-mono ${
                    isLight ? 'border-sky-100 text-slate-500' : 'border-sky-500/15 text-slate-400'
                  }`}
                >
                  <span>Domain Matrix</span>
                  <span
                    className={`font-semibold ${
                      isLight ? 'text-sky-600' : 'text-sky-400'
                    }`}
                  >
                    Active Radar
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Selected Skill Spotlight Card */}
        {selectedSkill && (
          <ScrollReveal direction="up" delay={0}>
            <div
              className={`mt-8 p-4 sm:p-5 rounded-2xl border shadow-xl flex items-center justify-between gap-4 transition-all duration-300 animate-fadeIn backdrop-blur-xl ${
                isLight
                  ? 'bg-white border-sky-200 text-slate-800 shadow-sky-100/60'
                  : 'bg-slate-900/90 border-sky-500/40 text-slate-200 shadow-[0_0_30px_rgba(2,132,199,0.25)]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2.5 rounded-xl text-base border ${
                    isLight
                      ? 'bg-sky-100 text-sky-600 border-sky-200'
                      : 'bg-sky-500/20 text-sky-300 border-sky-400/30'
                  }`}
                >
                  <FaWandMagicSparkles className="animate-pulse" />
                </div>
                <div>
                  <h4 className="text-sm font-bold flex items-center gap-2">
                    <span className={isLight ? 'text-slate-500 font-normal' : 'text-slate-400 font-normal'}>
                      Selected Skill:
                    </span>
                    <span
                      className={`font-mono font-bold ${
                        isLight ? 'text-sky-700' : 'text-sky-300'
                      }`}
                    >
                      {selectedSkill}
                    </span>
                  </h4>
                  <p className={`text-xs mt-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    {profileData.skills.categories.find((c) =>
                      c.skills.some((s) => s.toLowerCase() === selectedSkill.toLowerCase())
                    )?.description || `Engineered with high production standards: ${selectedSkill}`}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedSkill(null)}
                className={`px-3.5 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                  isLight
                    ? 'border-sky-200 text-sky-700 hover:bg-sky-50'
                    : 'border-sky-500/40 text-sky-300 hover:bg-slate-800'
                }`}
              >
                Close
              </button>
            </div>
          </ScrollReveal>
        )}

        {/* Complete Skills Orbit List */}
        <div
          className={`mt-12 p-6 rounded-3xl border backdrop-blur-md ${
            isLight
              ? 'bg-sky-50/40 border-sky-100'
              : 'bg-slate-900/60 border-sky-500/20'
          }`}
        >
          <p
            className={`text-xs font-mono uppercase tracking-wider mb-4 text-center sm:text-left ${
              isLight ? 'text-slate-500 font-medium' : 'text-sky-400/90 font-semibold'
            }`}
          >
            All Specified Skills in Profile:
          </p>
          <div className="flex flex-wrap gap-2.5 justify-center sm:justify-start">
            {skills.map((skillName, index) => (
              <span
                key={index}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium border transition-all duration-200 cursor-default ${
                  isLight
                    ? 'bg-white text-slate-800 border-sky-100 shadow-sm hover:border-sky-300'
                    : 'bg-slate-950/60 text-slate-200 border-sky-500/20 hover:border-sky-400/50 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <span className="text-sm shrink-0">{getSkillIcon(skillName)}</span>
                <span>{skillName}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
