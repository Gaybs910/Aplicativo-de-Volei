/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        arena: {
          950: '#0a0e14',
          900: '#10151d',
          800: '#1a2028',
          700: '#252c37',
          600: '#384250',
        },
        court: '#1d6f42',
        courtDark: '#14502f',
        courtLine: '#f5f5f5',
        ball: {
          blue: '#2E6FF2',
          yellow: '#FFC93C',
        },
        scoreboard: '#FF7A33',
        chalk: '#F4F1EA',
        danger: '#ef4444',
      },
      fontFamily: {
        display: ['Oswald', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      boxShadow: {
        panel: '0 4px 24px rgba(0, 0, 0, 0.35)',
        court: '0 8px 32px rgba(0, 0, 0, 0.5)',
      },
      backgroundImage: {
        'wood-grain':
          'repeating-linear-gradient(90deg, #8a5a34 0px, #8a5a34 2px, #7c4f2c 2px, #7c4f2c 4px)',
      },
    },
  },
  plugins: [],
};
