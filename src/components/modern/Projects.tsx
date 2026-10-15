import React, { useState, useEffect } from 'react';
import {
  FaGithub,
  FaArrowUpRightFromSquare,
  FaStar,
  FaCodeFork,
  FaLaptopCode,
  FaServer,
  FaBrain,
  FaXmark,
  FaArrowRight,
  FaCircleInfo,
  FaDiagramProject,
  FaBolt,
} from 'react-icons/fa6';
import { SanitizedExternalProject } from '../../interfaces/sanitized-config';
import { GithubProject } from '../../interfaces/github-project';
import { getLanguageColor } from '../../utils';
import { WeatherTheme } from './ThemeSwitcher';
import ScrollReveal from './ScrollReveal';

interface ProjectsProps {
  externalProjects: SanitizedExternalProject[];
  externalHeader?: string;
  githubProjects: GithubProject[];
  username: string;
  theme?: WeatherTheme;
  loading?: boolean;
}

type TabType = 'all' | 'ai' | 'be' | 'github';

const Projects: React.FC<ProjectsProps> = ({
  externalProjects,
  externalHeader = 'Featured Systems & Engineering Projects',
  githubProjects,
  username,
  theme = 'sunny',
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [selectedProject, setSelectedProject] = useState<SanitizedExternalProject | null>(null);

  const isLight = theme === 'sunny' || theme === 'cloudy' || theme === 'snowy';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredProjects = externalProjects.filter((project) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'be') {
      return (
        project.category === 'BE' ||
        project.beStack ||
        project.title.toLowerCase().includes('backend') ||
        project.title.toLowerCase().includes('quiz') ||
        project.title.toLowerCase().includes('rubik')
      );
    }
    if (activeTab === 'ai') {
      return (
        project.category === 'AI' ||
        project.aiStack ||
        project.title.toLowerCase().includes('ai') ||
        project.title.toLowerCase().includes('vision') ||
        project.title.toLowerCase().includes('parallel')
      );
    }
    return true;
  });

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="flex flex-col items-center text-center mb-10">
            <span
              className={`px-4 py-1.5 rounded-full text-xs font-mono font-medium border mb-3 ${
                isLight
                  ? 'bg-sky-50 border-sky-200 text-sky-700'
                  : 'bg-slate-900 border-slate-800 text-sky-300'
              }`}
            >
              FEATURED PROJECTS
            </span>
            <h2
              className={`text-3xl sm:text-4xl font-black tracking-tight ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              {externalHeader || 'Featured Systems & Engineering Projects'}
            </h2>
            <div className="w-16 h-1 rounded-full mt-3 bg-gradient-to-r from-sky-400 to-blue-600" />
            <p
              className={`text-sm max-w-xl mt-3 ${
                isLight ? 'text-slate-600' : 'text-slate-400'
              }`}
            >
              Click on any project to inspect architectural details, Backend subsystems, and AI engines.
            </p>
          </div>
        </ScrollReveal>

        {/* Tab Filters */}
        <ScrollReveal direction="up" delay={80}>
          <div className="flex items-center justify-center mb-12">
            <div
              className={`inline-flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-2xl border backdrop-blur-xl ${
                isLight
                  ? 'bg-white/80 border-sky-100 shadow-sm'
                  : 'bg-slate-900/80 border-sky-500/20 shadow-black/40'
              }`}
            >
              <button
                onClick={() => setActiveTab('all')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md shadow-sky-300/40'
                    : isLight
                    ? 'text-slate-600 hover:text-slate-900 hover:bg-sky-50'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <span>All Projects</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-white/20">
                  {externalProjects.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('ai')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  activeTab === 'ai'
                    ? 'bg-gradient-to-r from-sky-400 to-blue-500 text-white shadow-md shadow-sky-300/40'
                    : isLight
                    ? 'text-slate-600 hover:text-sky-700 hover:bg-sky-50'
                    : 'text-slate-400 hover:text-sky-300 hover:bg-slate-800'
                }`}
              >
                <FaBrain className="text-xs" />
                <span>AI Projects</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-white/20">
                  {externalProjects.filter((p) => p.category === 'AI').length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('be')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  activeTab === 'be'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-400/40'
                    : isLight
                    ? 'text-slate-600 hover:text-blue-700 hover:bg-sky-50'
                    : 'text-slate-400 hover:text-blue-300 hover:bg-slate-800'
                }`}
              >
                <FaServer className="text-xs" />
                <span>Backend Projects</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-white/20">
                  {externalProjects.filter((p) => p.category === 'BE').length}
                </span>
              </button>

              {githubProjects && githubProjects.length > 0 && (
                <button
                  onClick={() => setActiveTab('github')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    activeTab === 'github'
                      ? 'bg-gradient-to-r from-slate-700 to-slate-900 text-white shadow-md'
                      : isLight
                      ? 'text-slate-600 hover:text-slate-900 hover:bg-sky-50'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <FaGithub className="text-xs" />
                  <span>GitHub Repos</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-white/20">
                    {githubProjects.length}
                  </span>
                </button>
              )}
            </div>
          </div>
        </ScrollReveal>

        {/* Bento Projects Grid */}
        {activeTab !== 'github' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {filteredProjects.map((project, index) => {
              const isBe = project.category === 'BE';
              const isAi = project.category === 'AI';
              const displayStack = (project.aiStack || project.beStack || []).slice(0, 3);

              return (
                <ScrollReveal
                  key={index}
                  delay={index * 80}
                  direction="up"
                  className="h-full flex flex-col"
                >
                  <div
                    onClick={() => setSelectedProject(project)}
                    className={`group relative rounded-3xl border overflow-hidden transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between h-full cursor-pointer backdrop-blur-xl ${
                      isLight
                        ? 'bg-white/95 border-sky-100 shadow-md shadow-sky-100/40 hover:border-sky-300 hover:shadow-xl hover:shadow-sky-200/40'
                        : 'bg-slate-900/80 border-sky-500/20 hover:border-sky-400/50 shadow-[0_15px_35px_rgba(0,0,0,0.5)] hover:shadow-2xl'
                    }`}
                  >
                    {/* Top Image Thumbnail or Atmospheric Blueprint Banner */}
                    <div
                      className={`relative h-44 sm:h-48 overflow-hidden border-b ${
                        isLight
                          ? 'bg-gradient-to-br from-sky-100 via-sky-50 to-white border-sky-100'
                          : 'bg-slate-950/80 border-sky-500/20'
                      }`}
                    >
                      {project.imageUrl ? (
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                      ) : (
                        <div
                          className={`w-full h-full flex flex-col items-center justify-center p-4 relative overflow-hidden ${
                            isLight
                              ? 'bg-gradient-to-br from-sky-50 via-white to-sky-100/50'
                              : 'bg-gradient-to-br from-slate-950 via-[#07132e] to-[#040a1b]'
                          }`}
                        >
                          <div
                            className={`absolute inset-0 ${isLight ? 'opacity-20' : 'opacity-15'}`}
                            style={{
                              backgroundImage: `radial-gradient(circle at 1px 1px, ${
                                isLight ? '#0284c7' : '#38bdf8'
                              } 1px, transparent 0)`,
                              backgroundSize: '20px 20px',
                            }}
                          />
                          {project.title.toLowerCase().includes('sentiment') ||
                          project.title.toLowerCase().includes('mssa') ||
                          project.title.toLowerCase().includes('bert') ? (
                            <>
                              <FaBrain
                                className={`text-4xl mb-2 group-hover:scale-110 transition-transform duration-300 ${
                                  isLight ? 'text-sky-500' : 'text-sky-400'
                                }`}
                              />
                              <span
                                className={`text-xs font-mono font-semibold tracking-wider uppercase ${
                                  isLight ? 'text-sky-700' : 'text-sky-300'
                                }`}
                              >
                                MSSA • PhoBERT NLP
                              </span>
                            </>
                          ) : project.title.toLowerCase().includes('parallel') ? (
                            <>
                              <FaBolt
                                className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300 text-amber-500"
                              />
                              <span
                                className={`text-xs font-mono font-semibold tracking-wider uppercase ${
                                  isLight ? 'text-amber-700' : 'text-amber-400'
                                }`}
                              >
                                Parallel C++ Mining
                              </span>
                            </>
                          ) : (
                            <>
                              <FaDiagramProject
                                className={`text-4xl mb-2 group-hover:scale-110 transition-transform duration-300 ${
                                  isLight ? 'text-sky-500' : 'text-sky-400'
                                }`}
                              />
                              <span
                                className={`text-xs font-mono font-semibold tracking-wider uppercase ${
                                  isLight ? 'text-sky-700' : 'text-sky-300'
                                }`}
                              >
                                GraphRAG Architecture
                              </span>
                            </>
                          )}
                        </div>
                      )}

                      {/* Domain Badge */}
                      <div className="absolute top-3 left-3">
                        {isBe && (
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold shadow-sm backdrop-blur-md border ${
                              isLight
                                ? 'bg-white/90 text-blue-700 border-blue-200'
                                : 'bg-slate-950/90 text-blue-300 border-blue-400/40'
                            }`}
                          >
                            <FaServer className="text-[10px]" />
                            <span>BACKEND</span>
                          </span>
                        )}
                        {isAi && (
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold shadow-sm backdrop-blur-md border ${
                              isLight
                                ? 'bg-white/90 text-sky-700 border-sky-200'
                                : 'bg-slate-950/90 text-sky-300 border-sky-400/40'
                            }`}
                          >
                            <FaBrain className="text-[10px]" />
                            <span>AI</span>
                          </span>
                        )}
                      </div>

                      {/* Direct External Link Icon */}
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-all shadow-sm ${
                            isLight
                              ? 'bg-white/90 hover:bg-sky-500 hover:text-white text-slate-700 border border-sky-200'
                              : 'bg-black/60 hover:bg-sky-600 text-white border border-white/20'
                          }`}
                          title="Open Link"
                        >
                          <FaArrowUpRightFromSquare className="text-xs" />
                        </a>
                      )}
                    </div>

                    {/* Card Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3
                          className={`text-base font-bold tracking-tight line-clamp-1 transition-colors ${
                            isLight
                              ? 'text-slate-900 group-hover:text-sky-600'
                              : 'text-white group-hover:text-sky-300'
                          }`}
                        >
                          {project.title}
                        </h3>

                        {/* Project Metadata: Role, Period, Team Size */}
                        {(project.role || project.period || project.teamSize) && (
                          <div className="flex flex-wrap items-center gap-1.5 mt-2">
                            {project.role && (
                              <span
                                className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-medium border ${
                                  isLight
                                    ? 'bg-sky-50 border-sky-200 text-sky-800'
                                    : 'bg-slate-950/70 border-sky-500/30 text-sky-300'
                                }`}
                              >
                                {project.role}
                              </span>
                            )}
                            {project.period && (
                              <span
                                className={`px-2 py-0.5 rounded-md text-[10px] font-mono border ${
                                  isLight
                                    ? 'bg-slate-50 border-slate-200 text-slate-600'
                                    : 'bg-slate-950/70 border-slate-800 text-slate-400'
                                }`}
                              >
                                {project.period}
                              </span>
                            )}
                            {project.teamSize && (
                              <span
                                className={`px-2 py-0.5 rounded-md text-[10px] font-mono border ${
                                  isLight
                                    ? 'bg-slate-50 border-slate-200 text-slate-600'
                                    : 'bg-slate-950/70 border-slate-800 text-slate-400'
                                }`}
                              >
                                Team: {project.teamSize}
                              </span>
                            )}
                          </div>
                        )}

                        <p
                          className={`text-xs mt-2 line-clamp-2 leading-relaxed ${
                            isLight ? 'text-slate-600' : 'text-slate-300/80'
                          }`}
                        >
                          {project.description}
                        </p>
                      </div>

                      {/* Tech Chips */}
                      {displayStack.length > 0 && (
                        <div
                          className={`pt-4 mt-3 border-t flex flex-wrap gap-1.5 ${
                            isLight ? 'border-sky-100' : 'border-sky-500/15'
                          }`}
                        >
                          {displayStack.map((tech, tIdx) => (
                            <span
                              key={tIdx}
                              className={`px-2 py-0.5 rounded-lg text-[10px] font-mono border ${
                                isLight
                                  ? 'bg-sky-50 border-sky-200/70 text-sky-800'
                                  : 'bg-slate-950/60 text-sky-200 border-sky-500/20'
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                          {(project.aiStack?.length || 0) + (project.beStack?.length || 0) > 3 && (
                            <span
                              className={`px-1.5 py-0.5 rounded-lg text-[10px] font-mono ${
                                isLight ? 'text-slate-500 bg-sky-50/50' : 'text-slate-400 bg-white/5'
                              }`}
                            >
                              +more
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Card Bottom CTA */}
                    <div
                      className={`px-5 py-3 border-t flex items-center justify-between text-xs font-semibold ${
                        isLight
                          ? 'border-sky-50 text-sky-600 group-hover:text-sky-700'
                          : 'border-sky-900/40 text-sky-400 group-hover:text-sky-200'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <span>View Details</span>
                        <FaArrowRight className="text-[10px] group-hover:translate-x-1 transition-transform" />
                      </span>
                      <FaCircleInfo className="text-xs opacity-60" />
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        )}

        {/* GitHub Repositories Grid */}
        {(activeTab === 'all' || activeTab === 'github') && githubProjects && githubProjects.length > 0 && (
          <ScrollReveal direction="up" delay={120}>
            <div className="mt-16">
              <div
                className={`flex items-center justify-between mb-8 pb-3 border-b ${
                  isLight ? 'border-sky-100' : 'border-sky-500/20'
                }`}
              >
                <div className="flex items-center gap-2">
                  <FaGithub className={`text-xl ${isLight ? 'text-sky-600' : 'text-sky-400'}`} />
                  <h3
                    className={`text-xl font-bold tracking-tight ${
                      isLight ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    Curated GitHub Repositories
                  </h3>
                </div>
                <a
                  href={`https://github.com/${username}?tab=repositories`}
                  target="_blank"
                  rel="noreferrer"
                  className={`text-xs font-mono inline-flex items-center gap-1 transition-colors ${
                    isLight
                      ? 'text-sky-600 hover:text-sky-800'
                      : 'text-sky-400 hover:text-sky-200'
                  }`}
                >
                  <span>View All on GitHub</span>
                  <FaArrowRight className="text-[10px]" />
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {githubProjects.map((repo, idx) => (
                  <a
                    key={idx}
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className={`p-6 rounded-3xl border transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group shadow-md backdrop-blur-xl ${
                      isLight
                        ? 'bg-white/95 border-sky-100 hover:border-sky-300 shadow-sky-100/40 hover:shadow-lg hover:shadow-sky-200/30'
                        : 'bg-slate-900/80 border-sky-500/20 hover:border-sky-400/50 shadow-black/40'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2 overflow-hidden">
                          <FaLaptopCode
                            className={`shrink-0 text-sm ${
                              isLight ? 'text-sky-600' : 'text-sky-400'
                            }`}
                          />
                          <h4
                            className={`text-sm font-bold truncate transition-colors ${
                              isLight
                                ? 'text-slate-900 group-hover:text-sky-600'
                                : 'text-white group-hover:text-sky-300'
                            }`}
                          >
                            {repo.name}
                          </h4>
                        </div>
                        <FaArrowUpRightFromSquare
                          className={`text-xs shrink-0 transition-colors ${
                            isLight
                              ? 'text-slate-400 group-hover:text-sky-600'
                              : 'text-slate-400 group-hover:text-sky-300'
                          }`}
                        />
                      </div>

                      <p
                        className={`text-xs mt-2 line-clamp-2 leading-relaxed ${
                          isLight ? 'text-slate-600' : 'text-slate-300/80'
                        }`}
                      >
                        {repo.description || 'Intelligent Systems & Scalable Architecture Project'}
                      </p>
                    </div>

                    <div
                      className={`pt-4 mt-4 border-t flex items-center justify-between text-xs font-mono ${
                        isLight
                          ? 'border-sky-100 text-slate-500'
                          : 'border-sky-500/15 text-slate-400'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{
                            backgroundColor: getLanguageColor(repo.language || 'TypeScript'),
                          }}
                        />
                        <span>{repo.language || 'TypeScript'}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span
                          className={`flex items-center gap-1 ${
                            isLight ? 'hover:text-amber-500' : 'hover:text-amber-400'
                          }`}
                        >
                          <FaStar className="text-[10px]" />
                          <span>{repo.stargazers_count}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <FaCodeFork className="text-[10px]" />
                          <span>{repo.forks_count}</span>
                        </span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}
      </div>

      {/* DETAIL MODAL POPUP */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-fadeIn">
          <div
            className="absolute inset-0"
            onClick={() => setSelectedProject(null)}
          />

          <div
            className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border shadow-2xl p-6 sm:p-8 z-10 backdrop-blur-2xl ${
              isLight
                ? 'bg-white border-sky-200 text-slate-900 shadow-sky-200/50'
                : 'bg-[#091124] border-sky-500/40 text-white shadow-[0_25px_60px_rgba(0,0,0,0.9)]'
            }`}
          >
            {/* Modal Top Bar */}
            <div
              className={`flex items-start justify-between gap-4 pb-4 border-b ${
                isLight ? 'border-sky-100' : 'border-sky-500/20'
              }`}
            >
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  {selectedProject.category === 'BE' && (
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold border ${
                        isLight
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : 'bg-blue-600/20 text-blue-300 border-blue-500/40'
                      }`}
                    >
                      <FaServer className="text-[10px]" />
                      <span>Backend Project</span>
                    </span>
                  )}
                  {selectedProject.category === 'AI' && (
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold border ${
                        isLight
                          ? 'bg-sky-50 text-sky-700 border-sky-200'
                          : 'bg-sky-500/20 text-sky-300 border-sky-400/40'
                      }`}
                    >
                      <FaBrain className="text-[10px]" />
                      <span>AI Project</span>
                    </span>
                  )}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                  {selectedProject.title}
                </h3>
                {(selectedProject.role || selectedProject.period || selectedProject.teamSize) && (
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    {selectedProject.role && (
                      <span
                        className={`text-[11px] font-mono px-2.5 py-0.5 rounded-lg border ${
                          isLight
                            ? 'bg-sky-50 text-sky-800 border-sky-200'
                            : 'bg-slate-950/80 text-sky-300 border-sky-500/30'
                        }`}
                      >
                        Role: {selectedProject.role}
                      </span>
                    )}
                    {selectedProject.period && (
                      <span
                        className={`text-[11px] font-mono px-2.5 py-0.5 rounded-lg border ${
                          isLight
                            ? 'bg-slate-100 text-slate-700 border-slate-200'
                            : 'bg-slate-950/80 text-slate-300 border-slate-800'
                        }`}
                      >
                        {selectedProject.period}
                      </span>
                    )}
                    {selectedProject.teamSize && (
                      <span
                        className={`text-[11px] font-mono px-2.5 py-0.5 rounded-lg border ${
                          isLight
                            ? 'bg-slate-100 text-slate-700 border-slate-200'
                            : 'bg-slate-950/80 text-slate-300 border-slate-800'
                        }`}
                      >
                        Team size: {selectedProject.teamSize}
                      </span>
                    )}
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                  isLight
                    ? 'border-sky-200 text-slate-500 hover:text-slate-800 hover:bg-sky-50'
                    : 'border-sky-500/30 hover:bg-slate-800 text-sky-300 hover:text-white'
                }`}
                aria-label="Close dialog"
              >
                <FaXmark className="text-base" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="py-6 space-y-6">
              {selectedProject.imageUrl && (
                <div
                  className={`w-full h-56 sm:h-64 rounded-2xl overflow-hidden border shadow-inner ${
                    isLight ? 'bg-sky-50 border-sky-100' : 'bg-slate-950 border-sky-500/20'
                  }`}
                >
                  <img
                    src={selectedProject.imageUrl}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              )}

              <div>
                <h4
                  className={`text-xs font-mono uppercase tracking-wider font-semibold mb-2 ${
                    isLight ? 'text-sky-800' : 'text-sky-400'
                  }`}
                >
                  Architecture & Engineering Details
                </h4>
                <p
                  className={`text-sm leading-relaxed whitespace-pre-line ${
                    isLight ? 'text-slate-600' : 'text-slate-300'
                  }`}
                >
                  {selectedProject.description}
                </p>
              </div>

              {selectedProject.responsibilities && selectedProject.responsibilities.length > 0 && (
                <div>
                  <h4
                    className={`text-xs font-mono uppercase tracking-wider font-semibold mb-2.5 ${
                      isLight ? 'text-sky-800' : 'text-sky-400'
                    }`}
                  >
                    Key Responsibilities & Deliverables
                  </h4>
                  <ul className="space-y-2">
                    {selectedProject.responsibilities.map((resp, rIdx) => (
                      <li
                        key={rIdx}
                        className={`text-xs leading-relaxed flex items-start gap-2.5 ${
                          isLight ? 'text-slate-600' : 'text-slate-300'
                        }`}
                      >
                        <span className="text-sky-500 shrink-0 font-bold text-xs mt-0.5">▹</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {(selectedProject.beStack || selectedProject.aiStack) && (
                <div>
                  <h4
                    className={`text-xs font-mono uppercase tracking-wider font-semibold mb-2.5 ${
                      isLight ? 'text-sky-800' : 'text-sky-400'
                    }`}
                  >
                    Technologies & Technical Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {(selectedProject.beStack || selectedProject.aiStack || []).map(
                      (tech, tIdx) => (
                        <span
                          key={tIdx}
                          className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium border ${
                            isLight
                              ? 'bg-sky-50 border-sky-200/70 text-sky-800'
                              : 'bg-slate-950/60 border-sky-500/30 text-sky-200'
                          }`}
                        >
                          {tech}
                        </span>
                      ),
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer Actions */}
            <div
              className={`pt-4 border-t flex flex-wrap items-center justify-end gap-3 ${
                isLight ? 'border-sky-100' : 'border-sky-500/20'
              }`}
            >
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                  isLight
                    ? 'border-sky-200 text-slate-600 hover:bg-sky-50'
                    : 'border-sky-500/30 text-sky-300 hover:bg-slate-800'
                }`}
              >
                Close
              </button>

              {selectedProject.github && (
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    isLight
                      ? 'border-sky-200 bg-white hover:bg-sky-50 text-slate-800 shadow-xs'
                      : 'border-sky-500/30 bg-slate-900 hover:bg-slate-800 text-sky-200'
                  }`}
                >
                  <FaGithub className="text-sm" />
                  <span>GitHub Repository</span>
                </a>
              )}

              {selectedProject.link && (
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:to-blue-500 shadow-md shadow-sky-300/40 transition-all cursor-pointer"
                >
                  {selectedProject.link.includes('github.com') ? (
                    <>
                      <FaGithub className="text-sm" />
                      <span>Open GitHub</span>
                    </>
                  ) : (
                    <>
                      <FaArrowUpRightFromSquare className="text-xs" />
                      <span>Visit Live Website</span>
                    </>
                  )}
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
