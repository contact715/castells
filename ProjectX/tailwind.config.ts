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
                coral: 'rgba(var(--accent), <alpha-value>)',
                'coral-dark': 'rgba(var(--accent-dark), <alpha-value>)',
                surface: '#FFFFFF',
                'text-primary': 'rgb(0, 0, 0)',
                'text-secondary': 'rgb(85, 85, 85)',
                glass: 'rgba(255, 255, 255, 0.7)',
                'glass-border': 'rgba(255, 255, 255, 0.5)',

                // Dark mode colors - EXTREME CONTRAST for solid plates
                'dark-bg': '#000000', // Pitch black
                'dark-surface': '#1A1C1E', // Distinct graphite (Clearly visible as a plate)
                'dark-glass': 'rgba(26, 28, 30, 0.9)',
                'dark-glass-border': 'transparent',
                'dark-text-primary': '#FFFFFF',
                'dark-text-secondary': '#A1A1A1',
            },
            fontFamily: {
                display: ['var(--font-outfit)', 'var(--font-inter)', 'sans-serif'],
                sans: ['Satoshi', 'var(--font-inter)', 'sans-serif'],
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



