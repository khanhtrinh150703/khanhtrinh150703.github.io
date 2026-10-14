import React, { useState } from 'react';
import {
  FaEnvelope,
  FaPhone,
  FaLocationDot,
  FaLinkedin,
  FaCheck,
  FaTerminal,
  FaCopy,
  FaCodeBranch,
  FaCloudSun,
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

const About: React.FC<AboutProps> = ({ config, theme = 'sunny' }) => {
  const isLight = theme === 'sunny' || theme === 'cloudy';
  const [terminalTab, setTerminalTab] = useState<'developer' | 'profile'>('developer');
  const [copied, setCopied] = useState(false);

  const getProfileJson = () =>
    JSON.stringify(
      {
        personal: profileData.personal,
        skills: profileData.skills.allSkills,
        education: profileData.education,
        experiences: profileData.experiences,
      },
      null,
      2
    );

  const getDeveloperTs = () =>
    `interface SystemsArchitect {
  engineer: '${profileData.personal.name}';
  domain: '${profileData.personal.role}';
  academicGPA: '${profileData.education[0]?.degree?.replace('Current ', '') || '3.6 / 4.0'}';
  location: '${profileData.personal.location}';
  coreStrengths: [
${profileData.about.strengths.map((s) => `    '${s.title}'`).join(',\n')}
  ];
  operationalStatus: '${profileData.personal.status}';
}`;

  const handleCopy = () => {
    const textToCopy = terminalTab === 'developer' ? getDeveloperTs() : getProfileJson();
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="about" className="py-20 relative">
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
              <FaCloudSun className="text-xs text-sky-500" />
              <span>{profileData.about?.badge || 'ATMOSPHERIC OBSERVATIONS'}</span>
            </div>
            <h2
              className={`text-3xl sm:text-4xl font-black tracking-tight ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              {profileData.about?.title || 'Background & Engineering Philosophy'}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 rounded-full mt-4"></div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Personal Narrative */}
          <ScrollReveal direction="up" delay={100} className="lg:col-span-7 flex flex-col">
            <div
              className={`h-full flex flex-col justify-between p-7 sm:p-9 rounded-3xl border backdrop-blur-xl shadow-xl transition-all ${
                isLight
                  ? 'bg-white/95 border-sky-100 shadow-sky-100/50 hover:shadow-sky-200/50'
                  : 'bg-slate-900/80 border-sky-500/20 shadow-[0_15px_40px_rgba(0,0,0,0.6)]'
              }`}
            >
              <div className="space-y-4">
                <h3
                  className={`text-xl font-bold flex items-center gap-2 tracking-tight ${
                    isLight ? 'text-sky-950' : 'text-sky-200'
                  }`}
                >
                  <span className="text-sky-500 font-mono">#</span> {profileData.about.subheading}
                </h3>
                {profileData.about.paragraphs.map((p, idx) => (
                  <p
                    key={idx}
                    className={`leading-relaxed text-sm sm:text-base ${
                      isLight ? 'text-slate-600' : 'text-slate-300/90'
                    }`}
                  >
                    {p}
                  </p>
                ))}

                {/* Core Strengths Grid */}
                <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {profileData.about.strengths.map((str, idx) => (
                    <div
                      key={idx}
                      className={`flex items-start gap-3 p-3.5 rounded-2xl border transition-all ${
                        isLight
                          ? 'bg-sky-50/50 border-sky-100 hover:bg-sky-50 hover:border-sky-200'
                          : 'bg-slate-950/40 border-sky-500/15 hover:border-sky-400/30'
                      }`}
                    >
                      <div
                        className={`p-1.5 rounded-xl border mt-0.5 shrink-0 ${
                          isLight
                            ? 'bg-sky-100 text-sky-600 border-sky-200'
                            : 'bg-sky-500/20 text-sky-300 border-sky-400/30'
                        }`}
                      >
                        <FaCheck className="text-xs" />
                      </div>
                      <div>
                        <h5
                          className={`text-xs font-bold tracking-tight ${
                            isLight ? 'text-slate-900' : 'text-white'
                          }`}
                        >
                          {str.title}
                        </h5>
                        <p
                          className={`text-[11px] mt-0.5 leading-normal ${
                            isLight ? 'text-slate-500' : 'text-slate-400'
                          }`}
                        >
                          {str.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Contact Chips */}
              <div
                className={`pt-6 mt-6 border-t grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs ${
                  isLight ? 'border-sky-100' : 'border-sky-500/20'
                }`}
              >
                <div
                  className={`flex items-center gap-2.5 ${
                    isLight ? 'text-slate-700' : 'text-slate-300'
                  }`}
                >
                  <FaLocationDot className="text-sky-500 text-sm" />
                  <span>{config.dateOfBirth.dateOfBirth || 'Vietnam 🇻🇳'}</span>
                </div>
                {config.social.email && (
                  <a
                    href={`mailto:${config.social.email}`}
                    className={`flex items-center gap-2.5 transition-colors ${
                      isLight
                        ? 'text-slate-700 hover:text-sky-600'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <FaEnvelope className="text-sky-500 text-sm" />
                    <span className="truncate">{config.social.email}</span>
                  </a>
                )}
                {config.social.phone && (
                  <a
                    href={`tel:${config.social.phone}`}
                    className={`flex items-center gap-2.5 transition-colors ${
                      isLight
                        ? 'text-slate-700 hover:text-sky-600'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <FaPhone className="text-sky-500 text-sm" />
                    <span>{config.social.phone}</span>
                  </a>
                )}
                {config.social.linkedin && (
                  <a
                    href={`https://linkedin.com/in/${config.social.linkedin}`}
                    target="_blank"
                    rel="noreferrer"
                    className={`flex items-center gap-2.5 transition-colors ${
                      isLight
                        ? 'text-slate-700 hover:text-sky-600'
                        : 'text-slate-300 hover:text-sky-300'
                    }`}
                  >
                    <FaLinkedin className="text-sky-500 text-sm" />
                    <span>linkedin.com/in/{config.social.linkedin}</span>
                  </a>
                )}
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Meteorological Code Capsule */}
          <ScrollReveal direction="up" delay={200} className="lg:col-span-5 flex flex-col">
            <div
              className={`h-full flex flex-col rounded-3xl border shadow-xl overflow-hidden font-mono text-xs backdrop-blur-xl ${
                isLight
                  ? 'bg-white/95 border-sky-100 shadow-sky-100/60'
                  : 'bg-slate-900/80 border-sky-500/25 shadow-[0_15px_40px_rgba(0,0,0,0.7)]'
              }`}
            >
              {/* Terminal Top Bar with Interactive Tabs */}
              <div
                className={`flex items-center justify-between px-4 py-3 border-b ${
                  isLight
                    ? 'bg-sky-50/80 border-sky-100'
                    : 'bg-slate-950/70 border-sky-500/20'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-sky-400"></div>
                </div>

                {/* Interactive Click Tabs */}
                <div
                  className={`flex items-center gap-1 p-1 rounded-xl border ${
                    isLight
                      ? 'bg-white/80 border-sky-200/70'
                      : 'bg-slate-900/90 border-sky-500/25'
                  }`}
                >
                  <button
                    onClick={() => setTerminalTab('developer')}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] transition-all duration-200 cursor-pointer ${
                      terminalTab === 'developer'
                        ? 'bg-sky-500 text-white font-semibold shadow-xs'
                        : isLight
                        ? 'text-slate-600 hover:text-slate-900'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <FaTerminal className="text-[10px]" />
                    <span>architect.ts</span>
                  </button>
                  <button
                    onClick={() => setTerminalTab('profile')}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] transition-all duration-200 cursor-pointer ${
                      terminalTab === 'profile'
                        ? 'bg-sky-600 text-white font-semibold shadow-xs'
                        : isLight
                        ? 'text-slate-600 hover:text-slate-900'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <FaCodeBranch className="text-[10px]" />
                    <span>profile.json</span>
                  </button>
                </div>

                {/* Copy Button */}
                <button
                  onClick={handleCopy}
                  className={`p-1.5 rounded-lg transition-all text-xs flex items-center gap-1 cursor-pointer ${
                    isLight
                      ? 'hover:bg-sky-100 text-sky-700'
                      : 'hover:bg-sky-900/40 text-sky-300 hover:text-white'
                  }`}
                  title="Copy code"
                >
                  {copied ? (
                    <span className="flex items-center gap-1 text-[10px] text-sky-600 font-mono">
                      <FaCheck className="text-[10px]" /> Copied!
                    </span>
                  ) : (
                    <FaCopy className="text-xs" />
                  )}
                </button>
              </div>

              {/* Terminal Body */}
              <div
                className={`p-5 space-y-2 leading-relaxed overflow-x-auto min-h-[320px] ${
                  isLight ? 'text-slate-700 bg-white/60' : 'text-slate-300 bg-slate-950/40'
                }`}
              >
                {terminalTab === 'developer' ? (
                  <div className="transition-opacity duration-300 font-mono text-xs">
                    <p>
                      <span className={isLight ? 'text-sky-600 font-bold' : 'text-sky-400 font-bold'}>
                        interface
                      </span>{' '}
                      <span className={isLight ? 'text-blue-800 font-bold' : 'text-sky-200 font-bold'}>
                        SystemsArchitect
                      </span>{' '}
                      {'{'}
                    </p>
                    <div className="pl-4 space-y-1 mt-1">
                      <p>
                        <span className={isLight ? 'text-slate-500' : 'text-slate-400'}>
                          engineer:
                        </span>{' '}
                        <span className={isLight ? 'text-sky-700' : 'text-sky-300'}>
                          '{profileData.personal.name}'
                        </span>
                        ;
                      </p>
                      <p>
                        <span className={isLight ? 'text-slate-500' : 'text-slate-400'}>
                          domain:
                        </span>{' '}
                        <span className={isLight ? 'text-sky-700' : 'text-sky-300'}>
                          '{profileData.personal.role}'
                        </span>
                        ;
                      </p>
                      <p>
                        <span className={isLight ? 'text-slate-500' : 'text-slate-400'}>
                          academics:
                        </span>{' '}
                        <span className={isLight ? 'text-amber-700' : 'text-amber-300'}>
                          '{profileData.education[0]?.degree || 'GPA: 3.6 / 4.0'}'
                        </span>
                        ;
                      </p>
                      <p>
                        <span className={isLight ? 'text-slate-500' : 'text-slate-400'}>
                          location:
                        </span>{' '}
                        <span className={isLight ? 'text-sky-700' : 'text-sky-300'}>
                          '{profileData.personal.location}'
                        </span>
                        ;
                      </p>
                      <p>
                        <span className={isLight ? 'text-slate-500' : 'text-slate-400'}>
                          coreSpecializations:
                        </span>{' '}
                        [
                      </p>
                      <div className={`pl-4 ${isLight ? 'text-sky-800' : 'text-sky-300'}`}>
                        {profileData.about.strengths.map((s, idx) => (
                          <div key={idx}>
                            '{s.title}'
                            {idx < profileData.about.strengths.length - 1 ? ',' : ''}
                          </div>
                        ))}
                      </div>
                      <p>];</p>
                      <p>
                        <span className={isLight ? 'text-slate-500' : 'text-slate-400'}>
                          status:
                        </span>{' '}
                        <span className={isLight ? 'text-emerald-700' : 'text-emerald-400'}>
                          '{profileData.personal.status}'
                        </span>
                        ;
                      </p>
                    </div>
                    <p className="mt-1">{'}'}</p>
                  </div>
                ) : (
                  <div className="transition-opacity duration-300">
                    <pre
                      className={`font-mono text-xs whitespace-pre-wrap overflow-x-auto leading-relaxed ${
                        isLight ? 'text-sky-950' : 'text-sky-300'
                      }`}
                    >
                      {getProfileJson()}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default About;
