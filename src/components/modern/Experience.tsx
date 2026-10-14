import React, { useState } from 'react';
import {
  FaBriefcase,
  FaArrowUpRightFromSquare,
  FaCalendarDays,
  FaChevronDown,
  FaLightbulb,
  FaCompass,
} from 'react-icons/fa6';
import { SanitizedExperience } from '../../interfaces/sanitized-config';
import { WeatherTheme } from './ThemeSwitcher';
import ScrollReveal from './ScrollReveal';

interface ExperienceProps {
  experiences: SanitizedExperience[];
  theme?: WeatherTheme;
}

const Experience: React.FC<ExperienceProps> = ({ experiences, theme = 'sunny' }) => {
  if (!experiences || experiences.length === 0) return null;

  const isLight = theme === 'sunny' || theme === 'cloudy';
  const [expandedId, setExpandedId] = useState<number | null>(null); // Strictly collapsed by default
  const sortedExperiences = [...experiences];

  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <FaCompass className="text-xs text-sky-500" />
              <span>CAREER TRAJECTORY & RADAR MILESTONES</span>
            </div>
            <h2
              className={`text-3xl sm:text-4xl font-black tracking-tight ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              Work Experience
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 rounded-full mt-4"></div>
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
          className={`relative pl-6 sm:pl-8 border-l-2 space-y-10 ${
            isLight ? 'border-sky-200' : 'border-sky-500/30'
          }`}
        >
          {sortedExperiences.map((exp, index) => {
            const isExpanded = expandedId === index;
            const tags = exp.tags || [];

            return (
              <ScrollReveal key={index} delay={index * 120} direction="up">
                <div className="relative group">
                  {/* Timeline indicator node */}
                  <div
                    className={`absolute -left-[31px] sm:-left-[39px] top-1 flex items-center justify-center w-8 h-8 rounded-xl border-2 transition-all duration-300 ${
                      isExpanded
                        ? 'border-sky-400 bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md shadow-sky-400/40 scale-110'
                        : isLight
                        ? 'border-sky-300 bg-white text-sky-600 shadow-sm shadow-sky-100 group-hover:border-sky-400 group-hover:scale-105'
                        : 'border-sky-500/50 bg-[#070e24] text-sky-400 shadow-inner group-hover:border-sky-400 group-hover:scale-105'
                    }`}
                  >
                    <FaBriefcase className="text-xs" />
                  </div>

                  {/* Experience Card */}
                  <div
                    onClick={() => setExpandedId(isExpanded ? null : index)}
                    className={`p-6 sm:p-7 rounded-3xl border transition-all duration-300 shadow-md cursor-pointer hover:-translate-y-0.5 backdrop-blur-xl ${
                      isExpanded
                        ? isLight
                          ? 'bg-gradient-to-br from-white via-sky-50/60 to-sky-100/30 border-sky-300 shadow-xl shadow-sky-200/40'
                          : 'bg-gradient-to-br from-slate-900/95 via-[#0c1938]/95 to-slate-950/95 border-sky-400 shadow-2xl shadow-sky-950/60'
                        : isLight
                        ? 'bg-white/95 border-sky-100 shadow-sky-100/40 hover:border-sky-300 hover:shadow-lg hover:shadow-sky-200/30'
                        : 'bg-slate-900/80 border-sky-500/20 hover:border-sky-500/40 hover:bg-slate-900/95'
                    }`}
                  >
                    {/* Header Row: Company, Role & Period */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3
                            className={`text-lg sm:text-xl font-bold tracking-tight ${
                              isLight ? 'text-slate-900' : 'text-white'
                            }`}
                          >
                            {exp.position}
                          </h3>

                          {exp.companyLink ? (
                            <a
                              href={exp.companyLink}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className={`text-sm font-semibold inline-flex items-center gap-1.5 transition-colors ${
                                isLight
                                  ? 'text-sky-600 hover:text-sky-800'
                                  : 'text-sky-400 hover:text-sky-300'
                              }`}
                            >
                              <span>@{exp.company}</span>
                              <FaArrowUpRightFromSquare className="text-xs" />
                            </a>
                          ) : (
                            <span
                              className={`text-sm font-semibold ${
                                isLight ? 'text-sky-600' : 'text-sky-400'
                              }`}
                            >
                              @{exp.company}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-mono w-fit ${
                            isLight
                              ? 'bg-sky-50 border-sky-200/80 text-sky-700'
                              : 'bg-slate-950/70 border-sky-500/30 text-sky-300'
                          }`}
                        >
                          <FaCalendarDays className="text-[11px] text-sky-500" />
                          <span>
                            {exp.from} – {exp.to}
                          </span>
                        </div>

                        <button
                          type="button"
                          aria-label="Toggle details"
                          className={`p-2 rounded-xl border transition-all duration-300 flex items-center gap-1 text-xs font-mono cursor-pointer ${
                            isExpanded
                              ? 'rotate-180 bg-sky-500 text-white border-sky-400 shadow-sm'
                              : isLight
                              ? 'text-slate-500 border-sky-200 hover:bg-sky-50'
                              : 'text-sky-300 border-sky-500/30 hover:bg-slate-800'
                          }`}
                        >
                          <FaChevronDown className="text-xs" />
                        </button>
                      </div>
                    </div>

                    {/* STRICT REQUIREMENT: Only rendered when user clicks (isExpanded) */}
                    {isExpanded && (
                      <div
                        className={`mt-4 pt-4 border-t space-y-4 animate-fadeIn ${
                          isLight ? 'border-sky-100' : 'border-sky-500/20'
                        }`}
                      >
                        {exp.description && (
                          <div
                            className={`text-xs sm:text-sm leading-relaxed ${
                              isLight ? 'text-slate-600' : 'text-slate-300/90'
                            }`}
                          >
                            <p className="whitespace-pre-line">
                              {exp.description}
                            </p>
                          </div>
                        )}

                        {/* Detailed Responsibilities shown when expanded */}
                        {exp.responsibilities && exp.responsibilities.length > 0 && (
                          <div className="pt-2 space-y-2.5">
                            <p
                              className={`text-xs font-mono font-semibold uppercase tracking-wider ${
                                isLight ? 'text-sky-700' : 'text-sky-400'
                              }`}
                            >
                              Key Deliverables & Architectural Implementation:
                            </p>
                            <ul className="space-y-2 pl-0.5">
                              {exp.responsibilities.map((resp, rIdx) => (
                                <li
                                  key={rIdx}
                                  className={`text-xs sm:text-xs leading-relaxed flex items-start gap-2.5 ${
                                    isLight ? 'text-slate-600' : 'text-slate-300'
                                  }`}
                                >
                                  <span className="text-sky-500 mt-0.5 shrink-0 text-xs font-bold">▹</span>
                                  <span>{resp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Core Stack Tags shown when expanded */}
                        {tags.length > 0 && (
                          <div
                            className={`pt-4 mt-3 border-t border-dashed flex flex-wrap items-center gap-2 ${
                              isLight ? 'border-sky-200' : 'border-sky-500/20'
                            }`}
                          >
                            <span
                              className={`text-[11px] font-mono flex items-center gap-1 ${
                                isLight ? 'text-slate-500' : 'text-slate-400'
                              }`}
                            >
                              <FaLightbulb className="text-amber-500 text-xs" /> Core Stack:
                            </span>
                            {tags.map((tag, tIdx) => (
                              <span
                                key={tIdx}
                                className={`px-2.5 py-0.5 rounded-lg text-[11px] font-mono border ${
                                  isLight
                                    ? 'bg-sky-50 border-sky-200/80 text-sky-800'
                                    : 'bg-slate-950/60 text-sky-200 border-sky-500/30'
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
