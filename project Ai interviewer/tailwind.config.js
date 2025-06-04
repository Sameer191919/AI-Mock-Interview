/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'gray-750': '#2D3748',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'typewriter': 'typing 3.5s steps(40, end)',
      },
      keyframes: {
        typing: {
          from: { width: '0' },
          to: { width: '100%' }
        },
      },
    },
  },
  plugins: [],
};