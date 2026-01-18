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
                ivory: '#F4F5F5', // Platinum/Off-white
                coral: '#FF5722', // Electric Orange
                'coral-dark': '#E64A19',
                surface: '#FFFFFF',
                primary: '#FF5722', // Semantic alias
                secondary: '#212121', // Semantic alias

                'text-primary': '#111111',
                'text-secondary': '#666666',
                glass: 'rgba(255, 255, 255, 0.7)',
                'glass-border': 'rgba(255, 255, 255, 0.5)',

                // Dark mode colors - Mosco.ai Premium
                'dark-bg': '#0A0A0A', // Deep Onyx
                'dark-surface': '#161616', // Dark Slate
                'dark-glass': 'rgba(22, 22, 22, 0.8)',
                'dark-glass-border': 'rgba(255, 255, 255, 0.08)',
                'dark-text-primary': '#FFFFFF',
                'dark-text-secondary': '#A3A3A3',
            },
            fontFamily: {
                display: ['Satoshi', 'sans-serif'], // Unify display font
                sans: ['Satoshi', 'sans-serif'],
            },
            borderRadius: {
                none: '0',
                sm: '0.25rem',   // 4px
                DEFAULT: '0.25rem',
                md: '0.5rem',    // 8px
                lg: '0.75rem',   // 12px
                xl: '1rem',      // 16px
                '2xl': '1.5rem', // 24px
                '3xl': '2rem',   // 32px (kept for legacy support if needed)

                // Semantic components - Cloud/Soft Radius
                'card': '2rem',    // 32px (Restored per user request)
                'button': '2rem',  // 32px
                'input': '2rem',   // 32px
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



