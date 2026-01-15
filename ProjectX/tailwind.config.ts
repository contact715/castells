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

                // Dark mode colors - Matching Castells Studio
                'dark-bg': '#191919',
                'dark-surface': '#2A2A2A',
                'dark-glass': 'rgba(42, 42, 42, 0.8)',
                'dark-glass-border': 'rgba(255, 255, 255, 0.05)',
                'dark-text-primary': '#FFFFFF',
                'dark-text-secondary': '#A1A1A1',
            },
            fontFamily: {
                display: ['Newsreader', 'serif'],
                sans: ['Satoshi', 'sans-serif'],
            },
            borderRadius: {
                '3xl': '2rem',
                'card': '2rem',
                'button': '2rem',
                'input': '2rem',
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



