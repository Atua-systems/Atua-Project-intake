import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        atua: {
          bg: '#0B1628',
          sidebar: '#0f1d38',
          card: '#162444',
          modal: '#122040',
          accent: '#C9A84C',
          'accent-light': '#E8C97A',
          'accent-dark': '#8a6d2e',
          text: '#F5F2EC',
          'text-dim': 'rgba(245,242,236,0.58)',
          success: '#2ECC71',
          warning: '#E8A020',
          danger: '#C8102E',
          info: '#3AB8E8',
        },
      },
      fontFamily: {
        display: ['var(--font-syncopate)', 'sans-serif'],
        serif: ['var(--font-cormorant)', 'serif'],
        sans: ['var(--font-jost)', 'sans-serif'],
      },
      spacing: {
        '4.5': '18px',
        '13': '52px',
        '15': '60px',
        '18': '72px',
      },
      animation: {
        'slide-up': 'slideUp 0.3s ease-out',
        'fade-in': 'fadeIn 0.2s ease-out',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
