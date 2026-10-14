import React, { useState } from 'react';
import {
  FaCode,
  FaDatabase,
  FaBrain,
  FaServer,
  FaCheckDouble,
  FaWandMagicSparkles,
  FaMicrochip,
  FaDiagramProject,
  FaEye,
  FaLayerGroup,
  FaCube,
  FaNetworkWired,
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
import ScrollReveal from './ScrollReveal';

interface SkillsProps {
  skills: string[];
  theme?: string;
}

const getSkillIcon = (name: string) => {
  const lower = name.toLowerCase();
  if (lower.includes('spring') || (lower.includes('java') && !lower.includes('script')))
    return <SiSpringboot className="text-emerald-500" />;
  if (lower.includes('node')) return <SiNodedotjs className="text-green-500" />;
  if (lower.includes('typescript')) return <SiTypescript className="text-blue-500" />;
  if (lower.includes('javascript')) return <SiJavascript className="text-yellow-500" />;
  if (lower.includes('python')) return <SiPython className="text-amber-400" />;
  if (lower.includes('postgres')) return <SiPostgresql className="text-blue-400" />;
  if (lower.includes('mysql')) return <SiMysql className="text-orange-500" />;
  if (lower.includes('mongo')) return <SiMongodb className="text-emerald-500" />;
  if (lower.includes('redis')) return <SiRedis className="text-rose-500" />;
  if (lower.includes('docker')) return <SiDocker className="text-sky-500" />;
  if (lower.includes('c / c++') || lower.includes('c++') || lower.includes('c/c++') || lower.includes('c#'))
    return <SiCplusplus className="text-blue-600" />;
  if (lower.includes('neo4j')) return <SiNeo4J className="text-sky-400" />;
  if (lower.includes('graphdb') || lower.includes('graphrag') || lower.includes('graph'))
    return <FaDiagramProject className="text-indigo-400" />;
  if (lower.includes('yolo') || lower.includes('vision') || lower.includes('camera'))
    return <FaEye className="text-cyan-400" />;
  if (lower.includes('jetson') || lower.includes('tensorrt') || lower.includes('edge') || lower.includes('cuda'))
    return <FaMicrochip className="text-emerald-400" />;
  if (lower.includes('qdrant') || lower.includes('vector') || lower.includes('embedding'))
    return <FaLayerGroup className="text-purple-400" />;
  if (lower.includes('sparql') || lower.includes('rdf') || lower.includes('owl') || lower.includes('semantic') || lower.includes('shacl'))
    return <FaNetworkWired className="text-amber-400" />;
  if (lower.includes('llama') || lower.includes('llm') || lower.includes('deep') || lower.includes('neural'))
    return <FaBrain className="text-pink-400" />;
  if (lower.includes('machine') || lower.includes('ai'))
    return <FaBrain className="text-purple-400" />;
  if (lower.includes('clean architecture') || lower.includes('ddd') || lower.includes('architecture'))
    return <FaCube className="text-indigo-400" />;
  if (lower.includes('linux') || lower.includes('ubuntu') || lower.includes('wsl'))
    return <SiLinux className="text-yellow-400" />;
  if (lower.includes('mining') || lower.includes('data') || lower.includes('sql') || lower.includes('storage'))
    return <FaDatabase className="text-cyan-500" />;
  return <FaCode className="text-indigo-400" />;
};

const getCategoryIcon = (index: number) => {
  if (index === 0) return <FaBrain className="text-purple-500 dark:text-purple-400" />;
  if (index === 1) return <FaServer className="text-indigo-500 dark:text-indigo-400" />;
  return <FaDatabase className="text-teal-500 dark:text-teal-400" />;
};

const Skills: React.FC<SkillsProps> = ({ skills, theme = 'dark' }) => {
  const isLight = theme === 'light';
  const isCyber = theme === 'cyber';
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 dark:text-indigo-400 text-xs font-mono mb-3">
              <FaCode className="text-xs" />
              <span>{profileData.skills?.badge || 'SKILLS & EXPERTISE'}</span>
            </div>
            <h2
              className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              {profileData.skills?.title || 'Technical Stack & Capabilities'}
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mt-4"></div>
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
            <ScrollReveal key={idx} delay={idx * 140} direction="up" className="h-full">
              <div
                className={`h-full p-7 rounded-3xl border transition-all duration-300 shadow-xl flex flex-col justify-between group hover:-translate-y-1.5 ${
                  isLight
                    ? 'bg-white border-slate-200 shadow-slate-200/60 hover:border-indigo-400 hover:shadow-2xl'
                    : isCyber
                    ? 'bg-[#041118] border-emerald-500/30 hover:border-cyan-400 shadow-[0_0_15px_rgba(16,185,129,0.08)] hover:shadow-[0_0_25px_rgba(6,182,212,0.25)]'
                    : 'bg-gradient-to-b from-[#0d1424] to-[#090e1a] border-slate-800 hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10'
                }`}
              >
                <div>
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`p-3 rounded-2xl border text-lg group-hover:scale-110 transition-transform ${
                        isLight ? 'bg-slate-100 border-slate-200' : 'bg-slate-900 border-slate-800'
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
                      isLight ? 'text-slate-600' : 'text-slate-400'
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
                              ? isCyber
                                ? 'bg-emerald-500/25 border-emerald-400 text-emerald-200 ring-2 ring-emerald-400/50 shadow-emerald-500/30'
                                : 'bg-indigo-600 border-indigo-400 text-white ring-2 ring-indigo-400/50 shadow-indigo-500/30'
                              : isLight
                              ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                              : 'bg-slate-900/90 hover:bg-slate-800 border-slate-800/90 hover:border-slate-700 text-slate-200'
                          }`}
                        >
                          <span className="text-sm">{skill.icon}</span>
                          <span>{skill.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Bottom Tag */}
                <div
                  className={`pt-6 mt-6 border-t flex items-center gap-2 text-[11px] font-mono ${
                    isLight ? 'border-slate-100 text-slate-500' : 'border-slate-800/80 text-slate-400'
                  }`}
                >
                  <FaCheckDouble className="text-indigo-500 text-xs" />
                  <span>Production Ready</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Interactive Selected Skill Toast/Banner */}
        {selectedSkill && (
          <ScrollReveal direction="up" delay={50}>
            <div
              className={`mt-8 p-4 sm:p-5 rounded-2xl border backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg ${
                isLight
                  ? 'bg-indigo-50/90 border-indigo-200 text-slate-800'
                  : isCyber
                  ? 'bg-[#03151c]/90 border-emerald-500/40 text-emerald-100'
                  : 'bg-indigo-950/40 border-indigo-500/40 text-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 text-base">
                  <FaWandMagicSparkles className="animate-pulse" />
                </div>
                <div>
                  <h4 className="text-sm font-bold flex items-center gap-2">
                    <span>Đang chọn kỹ năng:</span>
                    <span className={isCyber ? 'text-emerald-300' : 'text-indigo-400'}>
                      {selectedSkill}
                    </span>
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {profileData.skills.categories.find((c) =>
                      c.skills.some((s) => s.toLowerCase() === selectedSkill.toLowerCase())
                    )?.description || `Skill: ${selectedSkill}`}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedSkill(null)}
                className="px-3 py-1.5 rounded-xl border text-xs font-semibold hover:opacity-80 transition-opacity w-fit border-indigo-500/30"
              >
                Đóng
              </button>
            </div>
          </ScrollReveal>
        )}

        {/* Full Tags List from Config */}
        <div
          className={`mt-12 p-6 rounded-3xl border backdrop-blur-md ${
            isLight
              ? 'bg-slate-50/80 border-slate-200'
              : 'bg-[#0a0f1d]/60 border-slate-800/60'
          }`}
        >
          <p
            className={`text-xs font-mono uppercase tracking-wider mb-3 text-center sm:text-left ${
              isLight ? 'text-slate-500' : 'text-slate-400'
            }`}
          >
            All Specified Skills in Profile:
          </p>
          <div className="flex flex-wrap gap-2.5 justify-center sm:justify-start">
            {skills.map((skillName, index) => (
              <span
                key={index}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono font-medium border transition-all duration-200 cursor-default ${
                  isLight
                    ? 'bg-white text-slate-800 border-slate-200 shadow-sm hover:border-indigo-300 hover:shadow-md'
                    : isCyber
                    ? 'bg-[#041118] text-emerald-300 border-emerald-500/25 hover:border-emerald-400/50'
                    : 'bg-slate-900/90 text-slate-200 border-slate-800 hover:border-indigo-400/40 hover:bg-slate-800'
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
