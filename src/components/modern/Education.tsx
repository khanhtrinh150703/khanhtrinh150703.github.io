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
import { WeatherTheme } from './ThemeSwitcher';
import ScrollReveal from './ScrollReveal';

interface EducationProps {
  educations: SanitizedEducation[];
  certifications: SanitizedCertification[];
  theme?: WeatherTheme;
}

const Education: React.FC<EducationProps> = ({
  educations,
  certifications,
  theme = 'sunny',
}) => {
  const isLight = theme === 'sunny' || theme === 'cloudy' || theme === 'snowy';

  return (
    <section id="education" className="py-20 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal direction="up" delay={0}>
          <div className="flex flex-col items-center text-center mb-16">
            <span
              className={`px-4 py-1.5 rounded-full text-xs font-mono font-medium border mb-3 ${
                isLight
                  ? 'bg-sky-50 border-sky-200 text-sky-700'
                  : 'bg-slate-900 border-slate-800 text-sky-300'
              }`}
            >
              EDUCATION
            </span>
            <h2
              className={`text-3xl sm:text-4xl font-black tracking-tight ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              Education
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-sky-400 to-blue-600 rounded-full mt-3"></div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Formal Education Card */}
          <ScrollReveal direction="up" delay={100} className="h-full">
            <div
              className={`p-7 rounded-3xl border transition-all duration-300 shadow-md flex flex-col justify-between h-full backdrop-blur-xl ${
                isLight
                  ? 'bg-white/95 border-sky-100 shadow-sky-100/40 hover:border-sky-300 hover:shadow-xl hover:shadow-sky-200/40'
                  : 'bg-slate-900/80 border-sky-500/20 hover:border-sky-400/50 shadow-[0_15px_35px_rgba(0,0,0,0.5)]'
              }`}
            >
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className={`p-3 rounded-2xl text-xl border shadow-sm ${
                      isLight
                        ? 'bg-sky-50 text-sky-600 border-sky-100'
                        : 'bg-sky-500/10 text-sky-400 border-sky-500/20 shadow-md'
                    }`}
                  >
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
                    <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                      University degree & academic performance
                    </p>
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
                          ? 'bg-sky-50 border-sky-200/80 text-sky-700'
                          : 'bg-slate-950/70 border-sky-500/30 text-sky-300'
                      }`}
                    >
                      <FaCalendarDays className="text-sky-500 text-xs" />
                      <span>
                        {edu.from} – {edu.to}
                      </span>
                    </div>

                    <div
                      className={`p-4 rounded-2xl border mt-3 ${
                        isLight
                          ? 'bg-sky-50/50 border-sky-100/90'
                          : 'bg-slate-950/40 border-sky-500/20'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <FaAward className="text-amber-500 text-base" />
                        <span
                          className={`text-sm font-semibold ${
                            isLight ? 'text-slate-900' : 'text-sky-200'
                          }`}
                        >
                          {edu.degree}
                        </span>
                      </div>
                      {edu.description && (
                        <p
                          className={`text-xs mt-2 leading-relaxed ${
                            isLight ? 'text-slate-600' : 'text-slate-300/80'
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
              className={`p-7 rounded-3xl border transition-all duration-300 shadow-md flex flex-col justify-between h-full backdrop-blur-xl ${
                isLight
                  ? 'bg-white/95 border-sky-100 shadow-sky-100/40 hover:border-sky-300 hover:shadow-xl hover:shadow-sky-200/40'
                  : 'bg-slate-900/80 border-sky-500/20 hover:border-sky-400/50 shadow-[0_15px_35px_rgba(0,0,0,0.5)]'
              }`}
            >
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className={`p-3 rounded-2xl text-xl border shadow-sm ${
                      isLight
                        ? 'bg-sky-50 text-sky-600 border-sky-100'
                        : 'bg-sky-500/10 text-sky-400 border-sky-500/20 shadow-md'
                    }`}
                  >
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
                    <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                      Verified credentials & proficiency
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {certifications.map((cert, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-2xl border flex items-center justify-between gap-4 transition-all duration-300 hover:scale-[1.01] ${
                        isLight
                          ? 'bg-sky-50/50 border-sky-100/90 hover:border-sky-300 shadow-xs'
                          : 'bg-slate-950/40 border-sky-500/20 hover:border-sky-400/40 hover:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center text-base border ${
                            isLight
                              ? 'bg-sky-100 text-sky-600 border-sky-200'
                              : 'bg-sky-500/15 text-sky-400 border-sky-500/25'
                          }`}
                        >
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
                            <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                              {cert.issuer || cert.body}
                            </p>
                          )}
                        </div>
                      </div>

                      <span
                        className={`px-3 py-1 rounded-xl text-xs font-mono font-medium whitespace-nowrap border ${
                          isLight
                            ? 'bg-sky-50 border-sky-200/80 text-sky-700'
                            : 'bg-sky-500/15 text-sky-300 border-sky-500/25'
                        }`}
                      >
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
