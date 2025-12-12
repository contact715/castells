/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./App.tsx",
    "./index.tsx",
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
        display: ['Playfair Display', 'serif'],
        sans: ['Satoshi', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
