// gitprofile.config.ts

const CONFIG = {
  github: {
    username: 'khanhtrinh150703', // Your GitHub org/user name. (This is the only required config)
  },
  /**
   * If you are deploying to https://<USERNAME>.github.io/, for example your repository is at https://github.com/zafus/zafus.github.io, set base to '/'.
   * If you are deploying to https://<USERNAME>.github.io/<REPO_NAME>/,
   * for example your repository is at https://github.com/zafus/portfolio, then set base to '/portfolio/'.
   */
  base: '/',
  projects: {
    github: {
      display: true, // Display GitHub projects?
      header: 'GitHub Projects',
      mode: 'automatic', // Mode can be: 'automatic' or 'manual'
      automatic: {
        sortBy: 'stars', // Sort projects by 'stars' or 'updated'
        limit: 4, // How many projects to display.
        exclude: {
          forks: false, // Forked projects will not be displayed if set to true.
          projects: [
            'khanhtrinh150703/python-youtube-tutorials',
            'khanhtrinh150703/cracking-the-coding-interview',
            'khanhtrinh150703/BadmintonManagement',
            'khanhtrinh150703/khanhtrinh150703.github.io',
            'khanhtrinh150703/Bai07_Nhom02',
            'khanhtrinh150703/python',
            'khanhtrinh150703/Reinforcement-Learning',
            'khanhtrinh150703/kiemtra',
            'khanhtrinh150703/DemoPython',
            'khanhtrinh150703/BTWeb',
            'khanhtrinh150703/MathQuizTS',
            'khanhtrinh150703/Test',
            'khanhtrinh150703/Tester',
            'khanhtrinh150703/Trinhhhhhh',
          ], // These projects will not be displayed. example: ['zafus/my-project1', 'zafus/my-project2']
        },
      },
      manual: {
        // Properties for manually specifying projects
        projects: [], // List of repository names to display. example: ['zafus/my-project1', 'zafus/my-project2']
      },
    },
    external: {
      header: 'My Published Projects',
      // To hide the `External Projects` section, keep it empty.
      projects: [
        {
          title: 'MathQuiz Application',
          description:
            'A math quiz practice app for students. Users can register/login, take quizzes, review past results, and join classes. Admins can manage users, quizzes, and classes. Built entirely with Java Spring Boot.',
          imageUrl:
            'https://play-lh.googleusercontent.com/jzk4udprxbRqywvNTWbzNttgoQdPFGSlm8KymplGpZD5_ojLz6JOwoLKjj2GtHpUZIE=w480-h960-rw',
          link: 'https://github.com/NghiaDau/MathQuizJava',
        },
        {
          title: 'RubikBMT Website',
          description:
            'Official website for RubikBMT Academy. Users can enroll in courses, read and comment on news, and track live competition results. Admins can manage students, posts, and competitions. Developed using Java Spring Boot for the backend and HTML, CSS, Bootstrap, Thymeleaf for the frontend.',
          imageUrl: 'https://www.rubikbmt.vn/images/AvatarRubikBmt.png',
          link: 'https://rubikbmt.vn',
        },
      ],
    },
  },
  seo: {
    title: 'Portfolio of Nguyen Ba Khanh Trinh',
    description: '',
    imageURL: '',
  },
  social: {
    linkedin: 'khanh-trinh-78a7b6235',
    phone: '0963788076',
    email: 'khanhtrinh150703@gmail.com',
  },

  dateOfBirth: {
    dateOfBirth: '15/07/2003 | Viet Nam 🇻🇳', // Empty fileUrl will hide the `Download Resume` button.
  },

  description: {
    description:
      'Passionate developer with experience in Java Spring Boot and Node.js (TypeScript). I have worked on building APIs, real-time communication systems, and IoT solutions using MQTT and Jetson Orin. Along with optimizing data mining techniques like N-List and PP-Tree, I focus on integrating AI models such as YOLO and PhoBERT into backend infrastructures to develop intelligent, data-driven systems',
  },

  skills: [
    'Java (SpringBoot)',
    'Python',
    'JavaScript',
    'TypeScript',
    'C/C++/C#',
    'MySQL',
    'SQLServer',
    'Postgresql',
    'MongoDB',
  ],
  experiences: [
    {
      company: 'TOIDM',
      position: 'Teacher Assistant',
      from: 'September 2024',
      to: 'December 2024',
      companyLink: 'https://www.facebook.com/toidmedu/',
    },
    {
      company: 'HONDAPLUS VIETNAM CO., LTD',
      position: 'Ai Engineer',
      from: 'April 2025',
      to: 'January 2026',
      companyLink: 'https://www.hondaplus-vietnam.com.vn/vi',
    },
  ],
  certifications: [
    {
      name: 'B1 HUTECH',
      year: 'July 2024',
    },
  ],
  educations: [
    {
      institution: 'Ho Chi Minh City University of Technology (HUTECH)',
      degree: 'Current GPA: 3.6/4.0',
      from: '2021',
      to: '2025',
    },
  ],
  // publications: [
  //   {
  //     title: 'Publication Title',
  //     conferenceName: '',
  //     journalName: 'Journal Name',
  //     authors: 'John Doe, Jane Smith',
  //     link: 'https://example.com',
  //     description:
  //       'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  //   },
  //   {
  //     title: 'Publication Title',
  //     conferenceName: 'Conference Name',
  //     journalName: '',
  //     authors: 'John Doe, Jane Smith',
  //     link: 'https://example.com',
  //     description:
  //       'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  //   },
  // ],
  // Display articles from your medium or dev account. (Optional)
  // blog: {
  //   source: 'dev', // medium | dev
  //   username: 'zafus', // to hide blog section, keep it empty
  //   limit: 2, // How many articles to display. Max is 10.
  // },
  googleAnalytics: {
    id: '', // GA3 tracking id/GA4 tag id UA-XXXXXXXXX-X | G-XXXXXXXXXX
  },
  // Track visitor interaction and behavior. https://www.hotjar.com
  hotjar: {
    id: '',
    snippetVersion: 6,
  },
  themeConfig: {
    defaultTheme: 'dark',

    // Hides the switch in the navbar
    // Useful if you want to support a single color mode
    disableSwitch: false,

    // Should use the prefers-color-scheme media-query,
    // using user system preferences, instead of the hardcoded defaultTheme
    respectPrefersColorScheme: false,

    // Display the ring in Profile picture
    displayAvatarRing: true,

    // Available themes. To remove any theme, exclude from here.
    themes: [
      'light',
      'dark',
      // 'cupcake',
      // 'bumblebee',
      // 'emerald',
      // 'corporate',
      // 'synthwave',
      // 'retro',
      // 'cyberpunk',
      // 'valentine',
      // 'halloween',
      // 'garden',
      // 'forest',
      // 'aqua',
      // 'lofi',
      // 'pastel',
      // 'fantasy',
      // 'wireframe',
      // 'black',
      // 'luxury',
      // 'dracula',
      // 'cmyk',
      // 'autumn',
      // 'business',
      // 'acid',
      // 'lemonade',
      // 'night',
      // 'coffee',
      // 'winter',
      // 'dim',
      // 'nord',
      // 'sunset',
      // 'procyon',
    ],

    // Custom theme, applied to `procyon` theme
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

  // Optional Footer. Supports plain text or HTML.
  // footer: `Made with <a
  //     class="text-primary" href="https://github.com/zafus/gitprofile"
  //     target="_blank"
  //     rel="noreferrer"
  //   >GitProfile</a> and ❤️`,

  enablePWA: true,
};

export default CONFIG;
