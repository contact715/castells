/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./index.tsx",
    "./App.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
    "./services/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ivory: '#EBECE7',
        coral: '#E08576',
        'coral-dark': '#D67060',
        surface: '#FFFFFF',
      },
      fontFamily: {
        display: ['Newsreader', 'serif'],
        sans: ['Satoshi', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
