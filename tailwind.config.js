import CONFIG from './gitprofile.config';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        dark: {
          bg: '#070a12',
          card: '#0d1322',
          surface: '#121b30',
          border: 'rgba(255, 255, 255, 0.08)',
          accent: '#6366f1',
        },
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'floatSlow 14s ease-in-out infinite',
        'float-reverse': 'floatReverse 16s ease-in-out infinite',
        'float-fast': 'floatFast 10s ease-in-out infinite',
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(45px, -65px) scale(1.12)' },
          '66%': { transform: 'translate(-35px, 35px) scale(0.92)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(-55px, 45px) scale(1.1)' },
          '66%': { transform: 'translate(35px, -45px) scale(0.9)' },
        },
        floatFast: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '50%': { transform: 'translate(30px, -40px) scale(1.06)' },
        },
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    logs: false,
    themes: [
      ...CONFIG.themeConfig.themes,
      { procyon: CONFIG.themeConfig.customTheme },
    ],
  },
};
