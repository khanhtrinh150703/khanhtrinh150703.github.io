import React, { useState } from 'react';
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLocationDot,
  FaLinkedin,
  FaCheck,
  FaTerminal,
  FaCopy,
  FaCodeBranch,
} from 'react-icons/fa6';
import { SanitizedConfig } from '../../interfaces/sanitized-config';
import { Profile } from '../../interfaces/profile';
import profileData from '../../../profile.data.json';
import ScrollReveal from './ScrollReveal';

interface AboutProps {
  config: SanitizedConfig;
  profile: Profile | null;
  theme?: string;
}

const About: React.FC<AboutProps> = ({ config, theme = 'dark' }) => {
  const isLight = theme === 'light';
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
    `const engineer: SoftwareEngineer = {
  name: '${profileData.personal.name}',
  role: '${profileData.personal.role}',
  location: '${profileData.personal.location}',
  skills: ${JSON.stringify(profileData.skills.allSkills.slice(0, 6), null, 2)},
  status: '${profileData.personal.status}'
};`;

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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 dark:text-indigo-400 text-xs font-mono mb-3">
              <FaUser className="text-xs" />
              <span>{profileData.about?.badge || 'ABOUT ME'}</span>
            </div>
            <h2
              className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              {profileData.about?.title || 'Background & Engineering Philosophy'}
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mt-4"></div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Personal Narrative */}
          <ScrollReveal direction="up" delay={100} className="lg:col-span-7 flex flex-col">
            <div
              className={`h-full flex flex-col justify-between p-6 sm:p-8 rounded-3xl border backdrop-blur-xl shadow-xl ${
              isLight
                ? 'bg-white/90 border-slate-200/90 shadow-slate-200/50'
                : 'bg-[#0c1222]/90 border-slate-800'
            }`}
          >
            <div className="space-y-4">
              <h3
                className={`text-xl font-bold flex items-center gap-2 ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                <span className="text-indigo-500">#</span> {profileData.about.subheading}
              </h3>
              {profileData.about.paragraphs.map((p, idx) => (
                <p
                  key={idx}
                  className={`leading-relaxed text-sm sm:text-base ${
                    isLight ? 'text-slate-600' : 'text-slate-300'
                  }`}
                >
                  {p}
                </p>
              ))}

              {/* Core Strengths */}
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {profileData.about.strengths.map((str, idx) => (
                  <div
                    key={idx}
                    className={`flex items-start gap-2.5 p-3 rounded-xl border ${
                      isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-slate-800'
                    }`}
                  >
                    <div className="p-1 rounded-md bg-emerald-500/10 text-emerald-500 mt-0.5">
                      <FaCheck className="text-xs" />
                    </div>
                    <div>
                      <h5 className={`text-xs font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                        {str.title}
                      </h5>
                      <p className="text-[11px] text-slate-400">{str.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Contact Chips */}
            <div
              className={`pt-6 mt-6 border-t grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs ${
                isLight ? 'border-slate-200' : 'border-slate-800/80'
              }`}
            >
              <div
                className={`flex items-center gap-2.5 ${
                  isLight ? 'text-slate-700' : 'text-slate-300'
                }`}
              >
                <FaLocationDot className="text-indigo-500 text-sm" />
                <span>{config.dateOfBirth.dateOfBirth || 'Ho Chi Minh City, Vietnam'}</span>
              </div>
              {config.social.email && (
                <a
                  href={`mailto:${config.social.email}`}
                  className={`flex items-center gap-2.5 transition-colors ${
                    isLight ? 'text-slate-700 hover:text-rose-600' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <FaEnvelope className="text-rose-400 text-sm" />
                  <span className="truncate">{config.social.email}</span>
                </a>
              )}
              {config.social.phone && (
                <a
                  href={`tel:${config.social.phone}`}
                  className={`flex items-center gap-2.5 transition-colors ${
                    isLight ? 'text-slate-700 hover:text-emerald-600' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <FaPhone className="text-emerald-400 text-sm" />
                  <span>{config.social.phone}</span>
                </a>
              )}
              {config.social.linkedin && (
                <a
                  href={`https://linkedin.com/in/${config.social.linkedin}`}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex items-center gap-2.5 transition-colors ${
                    isLight ? 'text-slate-700 hover:text-blue-600' : 'text-slate-300 hover:text-blue-400'
                  }`}
                >
                  <FaLinkedin className="text-blue-400 text-sm" />
                  <span>linkedin.com/in/{config.social.linkedin}</span>
                </a>
              )}
            </div>
          </div>
        </ScrollReveal>

          {/* Right Column: Interactive Code Terminal Presentation */}
          <ScrollReveal direction="up" delay={200} className="lg:col-span-5 flex flex-col">
            <div
              className={`h-full flex flex-col rounded-3xl border shadow-2xl overflow-hidden font-mono text-xs ${
                isLight
                  ? 'bg-slate-900 border-slate-800'
                  : 'bg-[#090e1a] border-slate-800'
              }`}
            >
              {/* Terminal Top Bar with Interactive Tabs */}
              <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                </div>

                {/* Interactive Click Tabs */}
                <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
                  <button
                    onClick={() => setTerminalTab('developer')}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] transition-all duration-200 ${
                      terminalTab === 'developer'
                        ? 'bg-indigo-600 text-white font-semibold shadow'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <FaTerminal className="text-[10px]" />
                    <span>developer.ts</span>
                  </button>
                  <button
                    onClick={() => setTerminalTab('profile')}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] transition-all duration-200 ${
                      terminalTab === 'profile'
                        ? 'bg-cyan-600 text-white font-semibold shadow'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <FaCodeBranch className="text-[10px]" />
                    <span>profile.json</span>
                  </button>
                </div>

                {/* Copy Button with animation */}
                <button
                  onClick={handleCopy}
                  className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-all text-xs flex items-center gap-1"
                  title="Copy code"
                >
                  {copied ? (
                    <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono">
                      <FaCheck className="text-[10px]" /> Copied!
                    </span>
                  ) : (
                    <FaCopy className="text-xs" />
                  )}
                </button>
              </div>

              {/* Terminal Body */}
              <div className="p-5 space-y-2 text-slate-300 leading-relaxed overflow-x-auto min-h-[300px]">
                {terminalTab === 'developer' ? (
                  <div className="transition-opacity duration-300">
                    <p>
                      <span className="text-purple-400">const</span>{' '}
                      <span className="text-blue-400">engineer</span>:{' '}
                      <span className="text-teal-300">SoftwareEngineer</span> = {'{'}
                    </p>
                    <div className="pl-4 space-y-1">
                      <p>
                        <span className="text-slate-400">name:</span>{' '}
                        <span className="text-emerald-300">'{profileData.personal.name}'</span>,
                      </p>
                      <p>
                        <span className="text-slate-400">role:</span>{' '}
                        <span className="text-emerald-300">'{profileData.personal.role}'</span>,
                      </p>
                      <p>
                        <span className="text-slate-400">location:</span>{' '}
                        <span className="text-emerald-300">'{profileData.personal.location}'</span>,
                      </p>
                      <p>
                        <span className="text-slate-400">education:</span> {'{'}
                      </p>
                      <p className="pl-4">
                        <span className="text-slate-400">university:</span>{' '}
                        <span className="text-emerald-300">'{profileData.education[0]?.institution || ''}'</span>,
                      </p>
                      <p className="pl-4">
                        <span className="text-slate-400">degree:</span>{' '}
                        <span className="text-amber-400">'{profileData.education[0]?.degree || ''}'</span>,
                      </p>
                      {profileData.certifications[0]?.name && (
                        <p className="pl-4">
                          <span className="text-slate-400">certification:</span>{' '}
                          <span className="text-amber-400">'{profileData.certifications[0].name}'</span>,
                        </p>
                      )}
                      <p>{'},'}</p>
                      <p>
                        <span className="text-slate-400">skills:</span> [
                      </p>
                      <p className="pl-4 text-emerald-300">
                        {profileData.skills.allSkills.slice(0, 6).map((s) => `'${s}'`).join(', ')}
                      </p>
                      <p>],</p>
                      <p>
                        <span className="text-slate-400">status:</span>{' '}
                        <span className="text-emerald-300">'{profileData.personal.status}'</span>
                      </p>
                    </div>
                    <p>{'};'}</p>
                  </div>
                ) : (
                  <div className="transition-opacity duration-300 text-slate-300">
                    <pre className="text-emerald-300 font-mono text-xs whitespace-pre-wrap overflow-x-auto leading-relaxed">
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
