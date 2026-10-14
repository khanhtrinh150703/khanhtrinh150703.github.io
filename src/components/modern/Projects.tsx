import React, { useState, useEffect } from 'react';
import {
  FaRocket,
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
} from 'react-icons/fa6';
import { SanitizedExternalProject } from '../../interfaces/sanitized-config';
import { GithubProject } from '../../interfaces/github-project';
import { getLanguageColor } from '../../utils';
import ScrollReveal from './ScrollReveal';

interface ProjectsProps {
  externalProjects: SanitizedExternalProject[];
  externalHeader?: string;
  githubProjects: GithubProject[];
  username: string;
  theme?: string;
  loading?: boolean;
}

type TabType = 'all' | 'be' | 'ai' | 'github';

const Projects: React.FC<ProjectsProps> = ({
  externalProjects,
  externalHeader = 'Featured Systems & Work',
  githubProjects,
  username,
  theme = 'dark',
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [selectedProject, setSelectedProject] = useState<SanitizedExternalProject | null>(null);

  const isLight = theme === 'light';
  const isCyber = theme === 'cyber';

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter external projects based on selected tab
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
        project.title.toLowerCase().includes('vision')
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
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-mono mb-3 ${
                isCyber
                  ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                  : 'bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 dark:text-indigo-400'
              }`}
            >
              <FaRocket className="text-xs" />
              <span>PORTFOLIO & ARCHITECTURE</span>
            </div>
            <h2
              className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
                isLight
                  ? 'text-slate-900'
                  : isCyber
                  ? 'text-emerald-300 drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                  : 'text-white'
              }`}
            >
              {externalHeader || 'Featured Systems & Work'}
            </h2>
            <div
              className={`w-16 h-1 rounded-full mt-4 ${
                isCyber
                  ? 'bg-gradient-to-r from-emerald-400 to-cyan-400'
                  : 'bg-gradient-to-r from-indigo-500 to-purple-500'
              }`}
            ></div>
            <p
              className={`text-sm max-w-xl mt-3 ${
                isLight
                  ? 'text-slate-600'
                  : isCyber
                  ? 'text-emerald-100/70'
                  : 'text-slate-400'
              }`}
            >
              Click on any project to inspect architectural details, Backend subsystems, and AI engines.
            </p>
          </div>
        </ScrollReveal>

        {/* Tab & Domain Filters */}
        <ScrollReveal direction="up" delay={80}>
          <div className="flex items-center justify-center mb-12">
            <div
              className={`inline-flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-2xl border shadow-inner ${
                isLight
                  ? 'bg-slate-100 border-slate-200'
                  : isCyber
                  ? 'bg-[#031118]/90 border-emerald-500/30'
                  : 'bg-slate-900/90 border-slate-800'
              }`}
            >
            <button
              onClick={() => setActiveTab('all')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeTab === 'all'
                  ? isCyber
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/30'
                    : 'bg-gradient-to-r from-indigo-500 to-blue-600 text-white shadow-md shadow-indigo-500/25'
                  : isLight
                  ? 'text-slate-600 hover:text-slate-900'
                  : isCyber
                  ? 'text-emerald-300/70 hover:text-emerald-300'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FaRocket className="text-xs" />
              <span>All Projects ({externalProjects.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('be')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeTab === 'be'
                  ? isCyber
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/30'
                    : 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
                  : isLight
                  ? 'text-slate-600 hover:text-indigo-600'
                  : isCyber
                  ? 'text-cyan-300/70 hover:text-cyan-300'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FaServer className="text-xs" />
              <span>Backend (BE)</span>
            </button>

            <button
              onClick={() => setActiveTab('ai')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeTab === 'ai'
                  ? isCyber
                    ? 'bg-emerald-400 text-slate-950 font-bold shadow-md shadow-emerald-400/30'
                    : 'bg-purple-600 text-white shadow-md shadow-purple-500/25'
                  : isLight
                  ? 'text-slate-600 hover:text-purple-600'
                  : isCyber
                  ? 'text-emerald-400/70 hover:text-emerald-300'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FaBrain className="text-xs" />
              <span>AI Engine (AI)</span>
            </button>

            {githubProjects && githubProjects.length > 0 && (
              <button
                onClick={() => setActiveTab('github')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  activeTab === 'github'
                    ? isCyber
                      ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/30'
                      : 'bg-gradient-to-r from-indigo-500 to-blue-600 text-white shadow-md shadow-indigo-500/25'
                    : isLight
                    ? 'text-slate-600 hover:text-slate-900'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <FaGithub className="text-xs" />
                <span>GitHub Repos ({githubProjects.length})</span>
              </button>
            )}
          </div>
        </div>
      </ScrollReveal>

        {/* Compact Projects Grid: Click card to view full architectural details */}
        {activeTab !== 'github' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {filteredProjects.map((project, index) => {
              const isBE = project.category === 'BE';
              const isAI = project.category === 'AI';
              const techList = project.beStack || project.aiStack || [];
              const previewTags = techList.slice(0, 3);
              const remainingCount = techList.length - previewTags.length;

              return (
                <ScrollReveal key={index} delay={index * 110} direction="up" className="h-full">
                  <div
                    onClick={() => setSelectedProject(project)}
                    className={`h-full group rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer hover:-translate-y-1.5 ${
                      isLight
                        ? 'bg-white border-slate-200 hover:border-indigo-400 shadow-md hover:shadow-xl shadow-slate-200/50'
                        : isCyber
                        ? 'bg-[#041118] border-emerald-500/30 hover:border-cyan-400 shadow-[0_0_15px_rgba(16,185,129,0.1)] hover:shadow-[0_0_25px_rgba(6,182,212,0.25)]'
                        : 'bg-gradient-to-b from-[#0e1628] to-[#0a0f1d] border-slate-800 hover:border-indigo-500/50 shadow-xl hover:shadow-indigo-500/10'
                    }`}
                  >
                  <div>
                    {/* Compact Image Container */}
                    <div
                      className={`relative w-full h-40 overflow-hidden flex items-center justify-center border-b ${
                        isLight
                          ? 'bg-slate-100 border-slate-200'
                          : isCyber
                          ? 'bg-black border-emerald-500/20'
                          : 'bg-slate-950 border-slate-800/80'
                      }`}
                    >
                      {project.imageUrl ? (
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-slate-500 p-4 w-full h-full bg-gradient-to-br from-indigo-950/20 to-purple-950/20">
                          {isAI ? (
                            <FaBrain className="text-3xl mb-2 text-purple-400/70 animate-pulse" />
                          ) : (
                            <FaLaptopCode className="text-3xl mb-2 text-indigo-400/60" />
                          )}
                          <span className="text-xs font-mono font-medium text-center line-clamp-1 max-w-[85%] text-slate-400">
                            {project.title}
                          </span>
                        </div>
                      )}

                      {/* Category Badge overlay on image */}
                      <div className="absolute top-2.5 left-2.5">
                        {isBE && (
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold backdrop-blur-md shadow ${
                              isCyber
                                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                                : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                            }`}
                          >
                            <FaServer className="text-[9px]" />
                            <span>BE</span>
                          </span>
                        )}
                        {isAI && (
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold backdrop-blur-md shadow ${
                              isCyber
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40'
                                : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                            }`}
                          >
                            <FaBrain className="text-[9px]" />
                            <span>AI</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-4 sm:p-5">
                      <h3
                        className={`text-base font-bold tracking-tight line-clamp-1 transition-colors ${
                          isLight
                            ? 'text-slate-900 group-hover:text-indigo-600'
                            : isCyber
                            ? 'text-emerald-300 group-hover:text-cyan-300'
                            : 'text-white group-hover:text-indigo-300'
                        }`}
                      >
                        {project.title}
                      </h3>

                      {/* Teaser Description (clean line-clamp-2) */}
                      <p
                        className={`text-xs mt-2 line-clamp-2 leading-relaxed ${
                          isLight
                            ? 'text-slate-600'
                            : isCyber
                            ? 'text-emerald-100/70'
                            : 'text-slate-400'
                        }`}
                      >
                        {project.description}
                      </p>

                      {/* Quick Tech Preview Badges */}
                      <div className="flex flex-wrap gap-1 mt-3">
                        {previewTags.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className={`px-2 py-0.5 rounded text-[10px] font-mono border ${
                              isLight
                                ? 'bg-slate-100 text-slate-700 border-slate-200'
                                : isCyber
                                ? 'bg-[#021820] text-emerald-300 border-emerald-500/30'
                                : 'bg-slate-900 text-slate-300 border-slate-800'
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                        {remainingCount > 0 && (
                          <span
                            className={`px-1.5 py-0.5 rounded text-[10px] font-mono border ${
                              isLight
                                ? 'bg-indigo-50 text-indigo-600 border-indigo-200'
                                : isCyber
                                ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
                                : 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20'
                            }`}
                          >
                            +{remainingCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom: Click to read info */}
                  <div
                    className={`px-4 sm:px-5 py-3 border-t flex items-center justify-between text-xs font-semibold ${
                      isLight
                        ? 'border-slate-100 text-indigo-600 group-hover:text-indigo-700'
                        : isCyber
                        ? 'border-emerald-500/20 text-cyan-400 group-hover:text-cyan-300'
                        : 'border-slate-800/80 text-indigo-400 group-hover:text-indigo-300'
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

      {/* GitHub Repositories Grid with ScrollReveal & Stagger */}
      {activeTab === 'github' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {githubProjects.map((repo, idx) => (
            <ScrollReveal key={idx} delay={idx * 90} direction="up" className="h-full">
              <a
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className={`h-full group p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between shadow-lg hover:-translate-y-1.5 ${
                  isLight
                    ? 'bg-white border-slate-200 hover:border-indigo-400 shadow-slate-200/60 hover:shadow-xl'
                    : isCyber
                    ? 'bg-[#041118] border-emerald-500/30 hover:border-cyan-400 shadow-[0_0_15px_rgba(16,185,129,0.08)] hover:shadow-[0_0_25px_rgba(6,182,212,0.2)]'
                    : 'bg-gradient-to-b from-[#0e1628] to-[#0a0f1d] border-slate-800 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between pb-3">
                    <span
                      className={`text-xs font-mono group-hover:underline flex items-center gap-1.5 font-semibold ${
                        isCyber ? 'text-emerald-300' : 'text-indigo-400'
                      }`}
                    >
                      <FaGithub className="text-sm" />
                      <span className="truncate max-w-[200px]">{repo.name}</span>
                    </span>
                    <FaArrowUpRightFromSquare className="text-xs text-slate-500 group-hover:text-indigo-400 transition-colors" />
                  </div>

                  <p
                    className={`text-xs line-clamp-3 leading-relaxed mt-1 ${
                      isLight
                        ? 'text-slate-600'
                        : isCyber
                        ? 'text-emerald-100/70'
                        : 'text-slate-400'
                    }`}
                  >
                    {repo.description || 'No description provided.'}
                  </p>
                </div>

                <div
                  className={`pt-4 mt-4 border-t flex items-center justify-between text-xs font-mono ${
                    isLight
                      ? 'border-slate-100 text-slate-500'
                      : isCyber
                      ? 'border-emerald-500/20 text-emerald-300/70'
                      : 'border-slate-800/80 text-slate-400'
                  }`}
                >
                  {repo.language ? (
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: getLanguageColor(repo.language) }}
                      />
                      <span>{repo.language}</span>
                    </div>
                  ) : (
                    <span>Code</span>
                  )}

                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <FaStar className="text-amber-400 text-[11px]" />
                      <span>{repo.stargazers_count}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <FaCodeFork className="text-[11px]" />
                      <span>{repo.forks_count}</span>
                    </span>
                  </div>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      )}

      {/* GitHub Direct Link Button */}
      <ScrollReveal direction="up" delay={150}>
        <div className="mt-12 text-center">
          <a
            href={`https://github.com/${username}?tab=repositories`}
            target="_blank"
            rel="noreferrer"
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border text-xs font-semibold transition-all shadow ${
              isLight
                ? 'bg-white hover:bg-slate-100 border-slate-300 text-slate-700 hover:text-slate-900'
                : isCyber
                ? 'bg-[#041118] hover:bg-[#061d28] border-emerald-500/40 text-emerald-300 hover:text-cyan-300'
                : 'bg-slate-900/80 hover:bg-slate-800 border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white'
            }`}
          >
            <FaGithub className="text-sm" />
            <span>Explore all repositories on GitHub</span>
            <FaArrowUpRightFromSquare className="text-[10px]" />
          </a>
        </div>
      </ScrollReveal>
    </div>

      {/* DETAIL MODAL POPUP: Displays complete architectural specifications on click */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
          {/* Backdrop click to close */}
          <div
            className="absolute inset-0"
            onClick={() => setSelectedProject(null)}
          />

          {/* Modal Content Box */}
          <div
            className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border shadow-2xl p-6 sm:p-8 z-10 ${
              isLight
                ? 'bg-white border-slate-200 text-slate-900'
                : isCyber
                ? 'bg-[#030e16] border-emerald-500/60 text-slate-100 shadow-[0_0_40px_rgba(16,185,129,0.25)]'
                : 'bg-[#0d1424] border-slate-700/80 text-white shadow-black/80'
            }`}
          >
            {/* Modal Top Bar */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  {selectedProject.category === 'BE' && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
                      <FaServer className="text-[10px]" />
                      <span>Backend Subsystem (BE)</span>
                    </span>
                  )}
                  {selectedProject.category === 'AI' && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                      <FaBrain className="text-[10px]" />
                      <span>AI Engine Subsystem (AI)</span>
                    </span>
                  )}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                  {selectedProject.title}
                </h3>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-white transition-colors"
                aria-label="Close dialog"
              >
                <FaXmark className="text-base" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="py-6 space-y-6">
              {/* Image Preview */}
              {selectedProject.imageUrl && (
                <div className="w-full h-56 sm:h-64 rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <img
                    src={selectedProject.imageUrl}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              )}

              {/* Full Detailed Description */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-indigo-500 dark:text-indigo-400 font-semibold mb-2">
                  Architecture & Engineering Details
                </h4>
                <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-line">
                  {selectedProject.description}
                </p>
              </div>

              {/* Full Tech Stack */}
              {(selectedProject.beStack || selectedProject.aiStack) && (
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-indigo-500 dark:text-indigo-400 font-semibold mb-2.5">
                    Technologies & Technical Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {(selectedProject.beStack || selectedProject.aiStack || []).map(
                      (tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-3 py-1.5 rounded-xl text-xs font-mono font-medium border bg-slate-100 dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200"
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
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Close
              </button>

              <a
                href={selectedProject.link}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-semibold text-white transition-all shadow-md ${
                  isCyber
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold shadow-emerald-500/20'
                    : 'bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 shadow-indigo-500/25'
                }`}
              >
                {selectedProject.link.includes('github.com') ? (
                  <>
                    <FaGithub className="text-sm" />
                    <span>Open GitHub Repository</span>
                  </>
                ) : (
                  <>
                    <FaArrowUpRightFromSquare className="text-xs" />
                    <span>Visit Live Website</span>
                  </>
                )}
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
