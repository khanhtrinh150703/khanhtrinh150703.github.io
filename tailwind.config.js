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
          bg: '#030712',
          card: '#081229',
          surface: '#0d1d3d',
          border: 'rgba(59, 130, 246, 0.15)',
          accent: '#2563eb',
        },
        sapphire: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#0a192f',
        },
        navy: {
          800: '#0c1a38',
          900: '#060f22',
          950: '#030712',
        },
      },
      boxShadow: {
        'blue-glow': '0 0 35px -5px rgba(37, 99, 235, 0.35)',
        'blue-glow-lg': '0 0 50px -5px rgba(59, 130, 246, 0.45)',
        'blue-inner': 'inset 0 0 20px 0 rgba(59, 130, 246, 0.15)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'floatSlow 14s ease-in-out infinite',
        'float-reverse': 'floatReverse 16s ease-in-out infinite',
        'float-fast': 'floatFast 10s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
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
        glowPulse: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
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
