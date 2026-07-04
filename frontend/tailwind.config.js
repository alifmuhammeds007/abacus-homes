/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0F2D5C', // Deep Navy Blue
          dark: '#0a1d3c',
          light: '#1e4887',
        },
        construction: {
          DEFAULT: '#1F5E2C', // Construction Green
          dark: '#143f1d',
          light: '#2e8740',
        },
        gold: {
          DEFAULT: '#D4A32D', // Gold Accent
          dark: '#aa8120',
          light: '#e0b753',
        },
        brandgray: {
          DEFAULT: '#F4F6F8', // Light Gray
          dark: '#e2e8f0',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Outfit', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 10px 30px -10px rgba(15, 45, 92, 0.08), 0 1px 3px rgba(15, 45, 92, 0.03)',
        'premium-hover': '0 20px 40px -15px rgba(15, 45, 92, 0.16), 0 2px 8px rgba(15, 45, 92, 0.06)',
        'glass': '0 8px 32px 0 rgba(15, 45, 92, 0.05)',
      }
    },
  },
  plugins: [],
}
