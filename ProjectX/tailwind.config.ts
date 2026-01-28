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
                /* ═══════════════════════════════════════════════════════════
                   THALASSA COLOR PALETTE
                   Clean, professional, light dashboard theme
                ═══════════════════════════════════════════════════════════ */
                
                // Primary: Soft Teal/Mint
                primary: 'rgb(var(--accent) / <alpha-value>)',
                'primary-dark': 'rgb(var(--primary-dark) / <alpha-value>)',
                
                // Secondary: Muted Blue-Gray
                secondary: 'rgb(var(--secondary) / <alpha-value>)',
                
                // Semantic
                success: '#10B981',
                warning: '#F59E0B',
                error: '#EF4444',
                info: '#3B82F6',
                
                // Surfaces
                surface: 'var(--surface)',
                'surface-secondary': 'var(--surface-secondary)',
                'surface-tertiary': 'var(--surface-tertiary)',
                
                // Text
                'text-primary': 'var(--text-primary)',
                'text-secondary': 'var(--text-secondary)',
                'text-tertiary': 'var(--text-tertiary)',
                
                // Legacy compatibility
                ivory: '#F5F8FA',
                glass: 'rgba(255, 255, 255, 0.9)',
                'glass-border': 'rgba(0, 0, 0, 0.06)',
                
                // Dark mode variants (for compatibility)
                'dark-bg': '#0F172A',
                'dark-surface': '#1E293B',
                'dark-glass': 'rgba(15, 23, 42, 0.8)',
                'dark-glass-border': 'rgba(255, 255, 255, 0.08)',
                'dark-text-primary': '#FFFFFF',
                'dark-text-secondary': '#94A3B8',
                
                // Accent highlight (soft lime for positive changes)
                'neon-lime': '#10B981',
            },
            fontFamily: {
                // Primary: Plus Jakarta Sans (clean geometric, similar to Lufga)
                sans: ['var(--font-plus-jakarta)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
                display: ['var(--font-plus-jakarta)', 'var(--font-outfit)', 'system-ui', 'sans-serif'],
                // Legacy
                instrument: ['var(--font-instrument)', 'system-ui', 'sans-serif'],
            },
            borderRadius: {
                none: '0',
                sm: '0.25rem',        // 4px
                DEFAULT: '0.5rem',    // 8px
                md: '0.5rem',         // 8px
                lg: '0.75rem',        // 12px
                xl: '1rem',           // 16px
                '2xl': '1.25rem',     // 20px
                '3xl': '1.5rem',      // 24px
                
                /* ═══════════════════════════════════════════════════════════
                   ФИРМЕННОЕ ЗАКРУГЛЕНИЕ
                   Единый радиус 20px для всех элементов
                ═══════════════════════════════════════════════════════════ */
                'container': '1.25rem',  // 20px - main layout blocks
                'card': '1.25rem',       // 20px - cards
                'inner': '1.25rem',      // 20px - inner elements
                'element': '0.75rem',    // 12px - small elements
                'pill': '9999px',        // full - pill shapes
                
                // Legacy aliases
                'button': '0.75rem',     // 12px
                'input': '0.75rem',      // 12px
            },
            boxShadow: {
                'thalassa-sm': '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.04)',
                'thalassa-md': '0 2px 8px rgba(0, 0, 0, 0.04), 0 4px 16px rgba(0, 0, 0, 0.04)',
                'thalassa-lg': '0 4px 12px rgba(0, 0, 0, 0.06), 0 8px 24px rgba(0, 0, 0, 0.05)',
                'thalassa-xl': '0 8px 24px rgba(0, 0, 0, 0.08), 0 16px 48px rgba(0, 0, 0, 0.06)',
                'thalassa-card': '0 2px 8px rgba(0, 0, 0, 0.04), 0 8px 24px rgba(0, 0, 0, 0.04)',
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
                "thalassa-gradient": "linear-gradient(135deg, #F5F8FA 0%, #E8F4F8 50%, #D9EAF7 100%)",
            },
        },
    },
    plugins: [],
};

export default config;
