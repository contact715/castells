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
        'surface-dark': '#2A2A2A',
        'text-primary': '#000000',
        'text-secondary-light': '#555555',
        'text-secondary-dark': '#CCCCCC',
      },
      fontFamily: {
        display: ['Newsreader', 'serif'],
        sans: ['Satoshi', 'sans-serif'],
      },
      zIndex: {
        'base': '1',
        'content': '10',
        'sticky': '40',
        'overlay': '50',
        'modal': '60',
        'popover': '70',
        'toast': '80',
        'topmost': '9999',
      },
    },
  },
  plugins: [],
}
