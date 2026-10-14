import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { HelmetProvider } from 'react-helmet-async';
import '../assets/index.css';
import { getSanitizedConfig, setupHotjar } from '../utils';
import { SanitizedConfig } from '../interfaces/sanitized-config';
import HeadTagEditor from './head-tag-editor';
import { Profile } from '../interfaces/profile';
import { GithubProject } from '../interfaces/github-project';

// Modern Components
import Navbar from './modern/Navbar';
import Hero from './modern/Hero';
import About from './modern/About';
import Experience from './modern/Experience';
import Projects from './modern/Projects';
import Skills from './modern/Skills';
import Education from './modern/Education';
import Contact from './modern/Contact';
import Footer from './modern/Footer';
import AnimatedBackground from './modern/AnimatedBackground';
import ScrollProgress from './modern/ScrollProgress';
import { WeatherTheme } from './modern/ThemeSwitcher';

/**
 * Weather-Themed Atmospheric Developer Portfolio for Nguyen Ba Khanh Trinh
 */
const GitProfile = ({ config }: { config: Config }) => {
  const [sanitizedConfig] = useState<SanitizedConfig>(
    getSanitizedConfig(config) as SanitizedConfig,
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [profile, setProfile] = useState<Profile | null>({
    avatar: '/avatar.jpg',
    name: config.seo?.title?.replace('Portfolio of ', '') || 'Nguyen Ba Khanh Trinh',
    bio: config.description?.description || '',
    location: config.dateOfBirth?.dateOfBirth || 'Vietnam 🇻🇳',
    company: 'HondaPlus Vietnam / TOIDM',
  });
  const [githubProjects, setGithubProjects] = useState<GithubProject[]>([]);

  // Weather Theme State: 'sunny' | 'cloudy' | 'rainy' | 'moonlit'
  const [theme, setTheme] = useState<WeatherTheme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('weather_theme_preference') as WeatherTheme;
      if (saved && ['sunny', 'cloudy', 'rainy', 'moonlit'].includes(saved)) {
        return saved;
      }
    }
    return 'sunny';
  });

  useEffect(() => {
    localStorage.setItem('weather_theme_preference', theme);
    const root = document.documentElement;
    root.setAttribute('data-weather', theme);
    const isLightMode = theme === 'sunny' || theme === 'cloudy';
    if (isLightMode) {
      root.classList.remove('dark');
      root.classList.add('light');
      root.setAttribute('data-theme', 'light');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
    }
  }, [theme]);

  const getGithubProjects = useCallback(
    async (publicRepoCount: number): Promise<GithubProject[]> => {
      try {
        if (!sanitizedConfig?.projects?.github?.display) return [];

        if (sanitizedConfig.projects.github.mode === 'automatic') {
          if (publicRepoCount === 0) return [];

          const cleanRepo = (p: string) =>
            p
              .replace(/^https?:\/\/github\.com\//i, '')
              .replace(/\.git$/i, '')
              .replace(/^\/+|\/+$/g, '')
              .trim();

          const excludeRepo =
            sanitizedConfig.projects.github.automatic.exclude.projects
              .map((project) => `+-repo:${cleanRepo(project)}`)
              .join('');

          const query = `user:${sanitizedConfig.github.username}+fork:${!sanitizedConfig.projects.github.automatic.exclude.forks}${excludeRepo}`;
          const url = `https://api.github.com/search/repositories?q=${query}&sort=${sanitizedConfig.projects.github.automatic.sortBy}&per_page=${sanitizedConfig.projects.github.automatic.limit}&type=Repositories`;

          const repoResponse = await axios.get(url, {
            headers: { 'Content-Type': 'application/vnd.github.v3+json' },
          });

          const items: GithubProject[] = repoResponse.data.items || [];
          const excludeList = sanitizedConfig.projects.github.automatic.exclude.projects.map(
            (p) => cleanRepo(p).toLowerCase()
          );
          return items.filter((item) => {
            const fullName = item.name
              ? `${sanitizedConfig.github.username}/${item.name}`.toLowerCase()
              : '';
            const name = item.name ? item.name.toLowerCase() : '';
            return (
              !excludeList.includes(fullName) &&
              !excludeList.includes(name) &&
              !excludeList.some((ex) => ex.endsWith('/' + name) || ex === name)
            );
          });
        } else {
          if (sanitizedConfig.projects.github.manual.projects.length === 0) return [];
          const cleanRepoManual = (p: string) => {
            let cleaned = p
              .replace(/^https?:\/\/github\.com\//i, '')
              .replace(/\.git$/i, '')
              .replace(/^\/+|\/+$/g, '')
              .trim();
            if (!cleaned.includes('/')) {
              cleaned = `${sanitizedConfig.github.username}/${cleaned}`;
            }
            return cleaned;
          };

          const validManualRepos = sanitizedConfig.projects.github.manual.projects.map(cleanRepoManual);

          let rawItems: GithubProject[] = [];
          try {
            const repos = validManualRepos
              .map((project) => `+repo:${project}`)
              .join('');

            const url = `https://api.github.com/search/repositories?q=${repos}+fork:true&type=Repositories`;
            const repoResponse = await axios.get(url, {
              headers: { 'Content-Type': 'application/vnd.github.v3+json' },
            });
            rawItems = repoResponse.data.items || [];
          } catch (searchErr) {
            console.warn('GitHub search query error:', searchErr);
          }

          // For any repo not found in bulk search, try direct repository lookup
          for (const cleanFullName of validManualRepos) {
            const repoOnlyName = cleanFullName.includes('/')
              ? cleanFullName.split('/')[1]
              : cleanFullName;
            const alreadyFound = rawItems.some(
              (item) => item.name.toLowerCase() === repoOnlyName.toLowerCase()
            );
            if (!alreadyFound) {
              try {
                const singleRes = await axios.get(`https://api.github.com/repos/${cleanFullName}`, {
                  headers: { 'Content-Type': 'application/vnd.github.v3+json' },
                });
                if (singleRes.data && singleRes.data.name) {
                  rawItems.push(singleRes.data);
                }
              } catch {
                // If private or not found, fallback handles it
              }
            }
          }

          // Return items strictly in the EXACT sequence specified from top to bottom
          const orderedItems: GithubProject[] = validManualRepos.map((cleanFullName) => {
            const repoOnlyName = cleanFullName.includes('/')
              ? cleanFullName.split('/')[1]
              : cleanFullName;

            const found = rawItems.find(
              (item) =>
                item.name.toLowerCase() === repoOnlyName.toLowerCase() ||
                `${sanitizedConfig.github.username}/${item.name}`.toLowerCase() === cleanFullName.toLowerCase()
            );

            if (found) {
              return found;
            }

            return {
              name: repoOnlyName,
              html_url: `https://github.com/${cleanFullName}`,
              description: 'Backend & Intelligent Systems Project',
              stargazers_count: '0',
              forks_count: '0',
              language: 'TypeScript',
            };
          });

          return orderedItems;
        }
      } catch (err) {
        console.warn('Could not fetch GitHub repositories:', err);
        return [];
      }
    },
    [sanitizedConfig],
  );

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.github.com/users/${sanitizedConfig.github.username}`,
      );
      const data = response.data;

      setProfile({
        avatar: '/avatar.jpg',
        name: data.name || 'Nguyen Ba Khanh Trinh',
        bio: data.bio || sanitizedConfig.description.description || '',
        location: data.location || sanitizedConfig.dateOfBirth.dateOfBirth || '',
        company: data.company || '',
      });

      if (sanitizedConfig.projects.github.display) {
        const repos = await getGithubProjects(data.public_repos || 0);
        setGithubProjects(repos);
      }
    } catch (err) {
      console.warn('GitHub user API fetch error (using fallback data):', err);
    } finally {
      setLoading(false);
    }
  }, [sanitizedConfig, getGithubProjects]);

  useEffect(() => {
    if (sanitizedConfig?.hotjar) {
      setupHotjar(sanitizedConfig.hotjar);
    }
    loadData();
  }, [sanitizedConfig, loadData]);

  if (!sanitizedConfig || !sanitizedConfig.github) {
    return (
      <div className="min-h-screen bg-[#070a12] flex items-center justify-center text-white font-mono text-sm">
        Invalid configuration.
      </div>
    );
  }

  const isLight = theme === 'sunny' || theme === 'cloudy';

  return (
    <HelmetProvider>
      <div
        className={`min-h-screen font-sans antialiased relative transition-colors duration-700 ${
          isLight
            ? 'text-slate-800 selection:bg-sky-200 selection:text-sky-900'
            : 'text-slate-100 selection:bg-sky-500/30 selection:text-sky-200'
        }`}
      >
        <HeadTagEditor
          googleAnalyticsId={sanitizedConfig.googleAnalytics?.id}
          appliedTheme={theme}
        />

        {/* Dynamic Animated Background with Floating Orbs & Interactive Particle Canvas */}
        <AnimatedBackground theme={theme} />

        {/* Global sticky navbar with Theme Switcher */}
        <Navbar
          config={sanitizedConfig}
          theme={theme}
          onThemeChange={setTheme}
        />

        <main className="relative z-10">
          {/* Hero Section */}
          <Hero
            config={sanitizedConfig}
            profile={profile}
            theme={theme}
            loading={loading}
          />

          {/* About Section */}
          <About
            config={sanitizedConfig}
            profile={profile}
            theme={theme}
          />

          {/* Experience Section */}
          {sanitizedConfig.experiences && sanitizedConfig.experiences.length > 0 && (
            <Experience
              experiences={sanitizedConfig.experiences}
              theme={theme}
            />
          )}

          {/* Projects Section (Clear separation between BE and AI) */}
          <Projects
            externalProjects={sanitizedConfig.projects.external.projects}
            externalHeader={sanitizedConfig.projects.external.header}
            githubProjects={githubProjects}
            username={sanitizedConfig.github.username}
            theme={theme}
            loading={loading}
          />

          {/* Skills Section */}
          {sanitizedConfig.skills && sanitizedConfig.skills.length > 0 && (
            <Skills
              skills={sanitizedConfig.skills}
              theme={theme}
            />
          )}

          {/* Education & Certifications Section */}
          {(sanitizedConfig.educations?.length > 0 || sanitizedConfig.certifications?.length > 0) && (
            <Education
              educations={sanitizedConfig.educations}
              certifications={sanitizedConfig.certifications}
              theme={theme}
            />
          )}

          {/* Contact Section */}
          <Contact
            config={sanitizedConfig}
            theme={theme}
          />
        </main>

        {/* Footer */}
        <Footer
          config={sanitizedConfig}
          theme={theme}
        />

        {/* Floating Scroll Progress & Scroll-to-Top Button */}
        <ScrollProgress theme={theme} />
      </div>
    </HelmetProvider>
  );
};

export default GitProfile;
