import React from 'react';
import {
  FaGraduationCap,
  FaCertificate,
  FaAward,
  FaCalendarDays,
} from 'react-icons/fa6';
import {
  SanitizedEducation,
  SanitizedCertification,
} from '../../interfaces/sanitized-config';
import { ScrollReveal } from './ScrollReveal';

interface EducationProps {
  educations: SanitizedEducation[];
  certifications: SanitizedCertification[];
  theme?: string;
}

const Education: React.FC<EducationProps> = ({
  educations,
  certifications,
  theme = 'dark',
}) => {
  const isLight = theme === 'light';

  return (
    <section id="education" className="py-20 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal direction="up" delay={0}>
          <div className="flex flex-col items-center text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 dark:text-indigo-400 text-xs font-mono mb-3">
              <FaGraduationCap className="text-xs" />
              <span>ACADEMICS</span>
            </div>
            <h2
              className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              Education & Certifications
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mt-4"></div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Education Card */}
          <ScrollReveal direction="up" delay={100} className="h-full">
            <div
              className={`p-7 rounded-3xl border transition-all duration-300 shadow-xl flex flex-col justify-between h-full ${
              isLight
                ? 'bg-white border-slate-200 shadow-slate-200/60 hover:border-indigo-400'
                : 'bg-gradient-to-b from-[#0d1424] to-[#0a0f1d] border-slate-800 hover:border-indigo-500/40'
            }`}
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 text-xl border border-indigo-500/20">
                  <FaGraduationCap />
                </div>
                <div>
                  <h3
                    className={`text-lg font-bold ${
                      isLight ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    Formal Education
                  </h3>
                  <p className="text-xs text-slate-400">University degree & academic performance</p>
                </div>
              </div>

              {educations.map((edu, idx) => (
                <div key={idx} className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <h4
                      className={`text-base font-bold ${
                        isLight ? 'text-slate-900' : 'text-white'
                      }`}
                    >
                      {edu.institution}
                    </h4>
                  </div>

                  <div
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-mono ${
                      isLight
                        ? 'bg-slate-100 border-slate-200 text-slate-700'
                        : 'bg-slate-900 border-slate-800 text-slate-300'
                    }`}
                  >
                    <FaCalendarDays className="text-indigo-500 dark:text-indigo-400 text-xs" />
                    <span>
                      {edu.from} – {edu.to}
                    </span>
                  </div>

                  <div
                    className={`p-4 rounded-2xl border mt-3 ${
                      isLight
                        ? 'bg-slate-50 border-slate-200'
                        : 'bg-slate-900/80 border-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <FaAward className="text-amber-500 text-base" />
                      <span
                        className={`text-sm font-semibold ${
                          isLight ? 'text-slate-900' : 'text-white'
                        }`}
                      >
                        {edu.degree}
                      </span>
                    </div>
                    {edu.description && (
                      <p
                        className={`text-xs mt-2 leading-relaxed ${
                          isLight ? 'text-slate-600' : 'text-slate-400'
                        }`}
                      >
                        {edu.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          </ScrollReveal>

          {/* Certifications Card */}
          <ScrollReveal direction="up" delay={200} className="h-full">
            <div
              className={`p-7 rounded-3xl border transition-all duration-300 shadow-xl flex flex-col justify-between h-full ${
                isLight
                  ? 'bg-white border-slate-200 shadow-slate-200/60 hover:border-indigo-400'
                  : 'bg-gradient-to-b from-[#0d1424] to-[#0a0f1d] border-slate-800 hover:border-indigo-500/40'
              }`}
            >
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-500 dark:text-purple-400 text-xl border border-purple-500/20">
                    <FaCertificate />
                  </div>
                  <div>
                    <h3
                      className={`text-lg font-bold ${
                        isLight ? 'text-slate-900' : 'text-white'
                      }`}
                    >
                      Certifications
                    </h3>
                    <p className="text-xs text-slate-400">Verified credentials & examinations</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {certifications.map((cert, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-2xl border flex items-center justify-between gap-4 transition-all duration-300 hover:scale-[1.01] ${
                        isLight
                          ? 'bg-slate-50 border-slate-200 hover:border-purple-300 hover:shadow-md'
                          : 'bg-slate-900/80 border-slate-800 hover:border-purple-500/40 hover:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 dark:text-indigo-400 text-base border border-indigo-500/20">
                          <FaAward />
                        </div>
                        <div>
                          <h4
                            className={`text-sm font-bold ${
                              isLight ? 'text-slate-900' : 'text-white'
                            }`}
                          >
                            {cert.name}
                          </h4>
                          {(cert.issuer || cert.body) && (
                            <p className="text-xs text-slate-400">
                              {cert.issuer || cert.body}
                            </p>
                          )}
                        </div>
                      </div>

                      <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-medium bg-purple-500/10 text-purple-600 dark:text-purple-300 border border-purple-500/20 whitespace-nowrap">
                        {cert.year}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Education;
