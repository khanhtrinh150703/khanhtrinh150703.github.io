// gitprofile.config.ts
import profileData from './profile.data.json';

const CONFIG = {
  github: {
    username: profileData.personal.github,
  },
  base: '/',
  projects: {
    github: {
      display: true,
      header: 'GitHub Projects',
      mode: 'manual',
      automatic: {
        sortBy: 'stars',
        limit: 8,
        exclude: {
          forks: false,
          projects: [],
        },
      },
      manual: {
        projects:
          (profileData as any).displayGithubProjects ||
          (profileData as any).githubProjects ||
          (profileData as any).excludeGithubProjects ||
          [],
      },
    },
    external: {
      header: 'My Featured Projects',
      projects: profileData.projects,
    },
  },
  seo: {
    title: `Portfolio of ${profileData.personal.name}`,
    description: profileData.personal.shortBio,
    imageURL: '',
  },
  social: {
    linkedin: profileData.personal.linkedin,
    phone: profileData.personal.phone,
    email: profileData.personal.email,
  },
  dateOfBirth: {
    dateOfBirth: profileData.personal.location,
  },
  description: {
    description: profileData.personal.shortBio,
  },
  skills: profileData.skills.allSkills,
  experiences: profileData.experiences,
  certifications: profileData.certifications,
  educations: profileData.education,
  googleAnalytics: {
    id: '',
  },
  hotjar: {
    id: '',
    snippetVersion: 6,
  },
  themeConfig: {
    defaultTheme: 'dark',
    disableSwitch: false,
    respectPrefersColorScheme: false,
    displayAvatarRing: true,
    themes: ['light', 'dark'],
    customTheme: {
      primary: '#fc055b',
      secondary: '#219aaf',
      accent: '#e8d03a',
      neutral: '#2A2730',
      'base-100': '#E3E3ED',
      '--rounded-box': '3rem',
      '--rounded-btn': '3rem',
    },
  },
  enablePWA: true,
};

export default CONFIG;
