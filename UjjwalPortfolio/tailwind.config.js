/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        jet: '#050505',
        obsidian: {
          950: '#050505',
          900: '#08080a',
          850: '#0c0d10',
          800: '#111217',
          700: '#181920',
          600: '#232530',
        },
        crimson: {
          DEFAULT: '#ff003c',
          neon: '#ff003c',
          dark: '#b9002b',
          glow: 'rgba(255, 0, 60, 0.4)',
        },
        scarlet: {
          DEFAULT: '#e11d48',
          light: '#f43f5e',
          dark: '#991b1b',
        },
        ember: {
          DEFAULT: '#991b1b',
          light: '#f43f5e',
          glow: 'rgba(225, 29, 72, 0.3)',
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      backgroundImage: {
        'crimson-grid': "linear-gradient(to right, rgba(255, 0, 60, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 0, 60, 0.04) 1px, transparent 1px)",
        'laser-mesh': "radial-gradient(circle at 50% 0%, rgba(255, 0, 60, 0.12) 0%, transparent 60%)",
      },
      boxShadow: {
        'crimson-sm': '0 0 15px rgba(255, 0, 60, 0.12)',
        'crimson-md': '0 0 25px rgba(255, 0, 60, 0.2)',
        'crimson-lg': '0 0 40px rgba(255, 0, 60, 0.3)',
        'crimson-inset': 'inset 0 0 20px rgba(255, 0, 60, 0.15)',
      },
      animation: {
        'pulse-crimson': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'border-beam': 'border-beam 4s linear infinite',
      },
      keyframes: {
        'border-beam': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        }
      }
    },
  },
  plugins: [],
}
