import React, { useState } from 'react';
import {
  FaBriefcase,
  FaArrowUpRightFromSquare,
  FaCalendarDays,
  FaChevronDown,
  FaLightbulb,
} from 'react-icons/fa6';
import { SanitizedExperience } from '../../interfaces/sanitized-config';
import ScrollReveal from './ScrollReveal';

interface ExperienceProps {
  experiences: SanitizedExperience[];
  theme?: string;
}

const Experience: React.FC<ExperienceProps> = ({ experiences, theme = 'dark' }) => {
  if (!experiences || experiences.length === 0) return null;

  const isLight = theme === 'light';
  const isCyber = theme === 'cyber';
  const [expandedId, setExpandedId] = useState<number | null>(null); // Collapsed by default
  // Display experiences directly in configured order
  const sortedExperiences = [...experiences];

  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 text-xs font-mono mb-3">
              <FaBriefcase className="text-xs" />
              <span>CAREER PATH</span>
            </div>
            <h2
              className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              Work Experience
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-teal-500 to-indigo-500 rounded-full mt-4"></div>
            <p
              className={`text-sm max-w-lg mt-3 ${
                isLight ? 'text-slate-600' : 'text-slate-400'
              }`}
            >
              Click on any career milestone to view detailed contributions and technical stack.
            </p>
          </div>
        </ScrollReveal>

        {/* Timeline */}
        <div
          className={`relative pl-6 sm:pl-8 border-l-2 space-y-12 ${
            isLight ? 'border-slate-300' : 'border-slate-800'
          }`}
        >
          {sortedExperiences.map((exp, index) => {
            const isExpanded = expandedId === index;
            const tags = exp.tags || [];

            return (
              <ScrollReveal key={index} delay={index * 150} direction="up">
                <div className="relative group">
                  {/* Timeline indicator node */}
                  <div
                    className={`absolute -left-[31px] sm:-left-[39px] top-1 flex items-center justify-center w-8 h-8 rounded-xl border-2 border-indigo-500 shadow-md shadow-indigo-500/30 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 ${
                      isLight
                        ? 'bg-white text-indigo-600'
                        : 'bg-[#070a12] text-indigo-400'
                    }`}
                  >
                    <FaBriefcase className="text-xs" />
                  </div>

                  {/* Experience Card */}
                  <div
                    onClick={() => setExpandedId(isExpanded ? null : index)}
                    className={`p-6 sm:p-7 rounded-3xl border transition-all duration-300 shadow-xl cursor-pointer hover:-translate-y-1 ${
                      isExpanded
                        ? isCyber
                          ? 'bg-[#041620] border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.15)]'
                          : 'bg-gradient-to-br from-[#101b30] to-[#0a1120] border-indigo-500/50 shadow-indigo-500/10'
                        : isLight
                        ? 'bg-white border-slate-200 shadow-slate-200/60 hover:border-indigo-400'
                        : 'bg-gradient-to-br from-[#0d1424] to-[#0a0f1d] border-slate-800 hover:border-indigo-500/40'
                    }`}
                  >
                    <div
                      className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                        isExpanded ? (isLight ? 'pb-4 border-b border-slate-100' : 'pb-4 border-b border-slate-800/80') : ''
                      }`}
                    >
                      <div>
                        <h3
                          className={`text-lg sm:text-xl font-bold flex items-center gap-2 ${
                            isLight ? 'text-slate-900' : 'text-white'
                          }`}
                        >
                          <span>{exp.position}</span>
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          {exp.companyLink ? (
                            <a
                              href={exp.companyLink}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-sm font-semibold text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 inline-flex items-center gap-1.5 transition-colors"
                            >
                              <span>{exp.company}</span>
                              <FaArrowUpRightFromSquare className="text-xs" />
                            </a>
                          ) : (
                            <span
                              className={`text-sm font-semibold ${
                                isLight ? 'text-slate-700' : 'text-slate-300'
                              }`}
                            >
                              {exp.company}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-mono w-fit ${
                            isLight
                              ? 'bg-slate-100 border-slate-200 text-slate-700'
                              : 'bg-slate-800/80 border-slate-700/80 text-slate-300'
                          }`}
                        >
                          <FaCalendarDays className="text-[11px] text-indigo-500 dark:text-indigo-400" />
                          <span>
                            {exp.from} – {exp.to}
                          </span>
                        </div>

                        <button
                          type="button"
                          aria-label="Toggle details"
                          className={`p-2 rounded-xl border transition-all duration-300 flex items-center gap-1 text-xs font-mono ${
                            isExpanded
                              ? 'rotate-180 bg-indigo-500/20 text-indigo-400 border-indigo-500/40 shadow-sm'
                              : isLight
                              ? 'text-slate-500 border-slate-200 hover:bg-slate-100'
                              : 'text-slate-400 border-slate-800 hover:bg-slate-800'
                          }`}
                        >
                          <FaChevronDown className="text-xs" />
                        </button>
                      </div>
                    </div>

                    {/* Collapsible Content - ONLY rendered when user clicks (isExpanded) */}
                    {isExpanded && (
                      <div className="pt-4 space-y-4">
                        {exp.description && (
                          <div
                            className={`text-xs sm:text-sm leading-relaxed ${
                              isLight ? 'text-slate-600' : 'text-slate-300'
                            }`}
                          >
                            <p className="whitespace-pre-line">
                              {exp.description}
                            </p>
                          </div>
                        )}

                        {/* Detailed Responsibilities shown when expanded */}
                        {exp.responsibilities && exp.responsibilities.length > 0 && (
                          <div className="pt-3 space-y-2.5">
                            <p className="text-xs font-mono font-semibold uppercase tracking-wider text-indigo-400 dark:text-indigo-300">
                              Key Responsibilities & System Architecture:
                            </p>
                            <ul className="space-y-2 pl-0.5">
                              {exp.responsibilities.map((resp, rIdx) => (
                                <li
                                  key={rIdx}
                                  className={`text-xs sm:text-xs leading-relaxed flex items-start gap-2.5 ${
                                    isLight ? 'text-slate-600' : 'text-slate-300'
                                  }`}
                                >
                                  <span className="text-indigo-500 dark:text-indigo-400 mt-0.5 shrink-0 text-xs">▹</span>
                                  <span>{resp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Interactive Tags shown when expanded only if tags exist in config */}
                        {tags.length > 0 && (
                          <div className="pt-4 mt-3 border-t border-dashed border-slate-800/80 flex flex-wrap items-center gap-2">
                            <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                              <FaLightbulb className="text-amber-400 text-xs" /> Core Stack:
                            </span>
                            {tags.map((tag, tIdx) => (
                              <span
                                key={tIdx}
                                className={`px-2.5 py-0.5 rounded-lg text-[11px] font-mono border ${
                                  isCyber
                                    ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                                    : 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20'
                                }`}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
