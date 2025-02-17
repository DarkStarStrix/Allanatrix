import type { Config } from 'tailwindcss';
import { defaultTheme } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', ...defaultTheme.fontFamily.sans],
        mono: ['monospace', ...defaultTheme.fontFamily.mono],
      },
      colors: {
        cyberpunk: {
          primary: '#00ff9d',
          secondary: '#39ff14',
          accent: '#9D00FF',
          text: '#e0fee0',
          'text-secondary': '#7fff7f',
        },
        gray: {
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
      },
      animation: {
        glitch: 'glitch 0.3s infinite',
        glow: 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' },
        },
        glow: {
          'from': { textShadow: '0 0 5px #00ff9d, 0 0 10px #00ff9d' },
          'to': { textShadow: '0 0 20px #00ff9d, 0 0 30px #00ff9d' },
        },
      },
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            color: theme('colors.cyberpunk.text'),
            a: {
              color: theme('colors.cyberpunk.primary'),
              '&:hover': {
                color: theme('colors.cyberpunk.secondary'),
              },
            },
            h1: {
              color: theme('colors.cyberpunk.primary'),
            },
            h2: {
              color: theme('colors.cyberpunk.secondary'),
            },
            code: {
              color: theme('colors.cyberpunk.accent'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
};

export default config;
