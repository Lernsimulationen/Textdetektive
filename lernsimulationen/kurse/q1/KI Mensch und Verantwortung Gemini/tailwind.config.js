/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          950: '#07090e',
          900: '#0f172a',
          800: '#1e293b',
          700: '#334155',
        },
        rel: {
          yellow: '#eab308',
          light: '#fef08a',
          bg: 'rgba(234, 179, 8, 0.15)',
          border: 'rgba(234, 179, 8, 0.35)'
        },
        sowi: {
          red: '#ef4444',
          light: '#fca5a5',
          bg: 'rgba(239, 68, 68, 0.15)',
          border: 'rgba(239, 68, 68, 0.35)'
        },
        neutral: {
          cyan: '#06b6d4',
          light: '#a5f3fc',
          bg: 'rgba(6, 182, 212, 0.15)',
          border: 'rgba(6, 182, 212, 0.35)'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        code: ['JetBrains Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}
