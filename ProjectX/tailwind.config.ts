import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: '#EBECE7',
        coral: '#E08576',
        'coral-dark': '#D67060',
        surface: '#FFFFFF',
        'text-primary': 'rgb(0, 0, 0)',
        'text-secondary': 'rgb(85, 85, 85)',
        glass: 'rgba(255, 255, 255, 0.7)',
        'glass-border': 'rgba(255, 255, 255, 0.5)',
        
        // Dark mode colors
        'dark-bg': '#0F0F0F', // Deeper black for premium feel
        'dark-surface': '#1E1E1E',
        'dark-glass': 'rgba(30, 30, 30, 0.7)',
        'dark-glass-border': 'rgba(255, 255, 255, 0.1)',
        'dark-text-primary': '#FFFFFF',
        'dark-text-secondary': '#A1A1A1',
      },
      fontFamily: {
        display: ['Newsreader', 'serif'],
        sans: ['Satoshi', 'sans-serif'],
      },
      borderRadius: {
        'card': '2rem',
        'button': '0.75rem',
        'input': '0.75rem',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;



