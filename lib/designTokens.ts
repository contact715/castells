/**
 * Design Tokens - Centralized design system values
 * 
 * This file contains all standardized design values used across the site
 * to ensure consistency and maintainability.
 */

export const spacing = {
  // Section padding (vertical)
  section: {
    sm: 'py-20',
    md: 'py-24 md:py-32',
    lg: 'py-32 md:py-40',
  },
  // Container padding (horizontal)
  container: {
    default: 'px-6',
    wide: 'px-8 md:px-12',
  },
  // Gap between elements
  gap: {
    xs: 'gap-2',
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8 lg:gap-12',
    xl: 'gap-12 lg:gap-16',
    '2xl': 'gap-16 lg:gap-24',
  },
  // Card padding
  card: {
    sm: 'p-6',
    md: 'p-8',
    lg: 'p-10 md:p-12',
    xl: 'p-12 md:p-16',
  },
} as const;

export const typography = {
  // Headings
  heading: {
    h1: 'font-display text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.05] tracking-tight',
    h2: 'font-display text-3xl md:text-4xl lg:text-5xl font-medium leading-tight tracking-tight',
    h3: 'font-display text-2xl md:text-3xl font-medium leading-tight tracking-tight',
    h4: 'font-display text-xl md:text-2xl font-medium leading-tight',
  },
  // Body text
  body: {
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  },
  // UI text
  ui: {
    label: 'text-xs font-bold uppercase tracking-widest',
    badge: 'text-xs font-bold uppercase tracking-widest',
    small: 'text-[10px] font-bold uppercase tracking-widest',
  },
} as const;

export const borderRadius = {
  sm: 'rounded-xl',
  md: 'rounded-2xl',
  lg: 'rounded-3xl',
  full: 'rounded-full',
  // Specific values
  card: 'rounded-2xl',
  button: 'rounded-xl',
  input: 'rounded-xl',
} as const;

export const shadows = {
  sm: 'shadow-sm',
  md: 'shadow-lg',
  lg: 'shadow-xl',
  xl: 'shadow-2xl',
  // Hover states
  hover: {
    sm: 'hover:shadow-md',
    md: 'hover:shadow-xl',
    lg: 'hover:shadow-2xl',
  },
} as const;

export const transitions = {
  default: 'transition-all duration-300 ease-in-out',
  fast: 'transition-all duration-200 ease-in-out',
  slow: 'transition-all duration-500 ease-in-out',
  // Specific
  colors: 'transition-colors duration-300',
  transform: 'transition-transform duration-300',
} as const;

export const colors = {
  background: {
    light: 'bg-ivory',
    dark: 'dark:bg-black',
    surface: 'bg-white dark:bg-surface',
  },
  text: {
    primary: 'text-text-primary',
    secondary: 'text-text-secondary',
    accent: 'text-coral',
  },
  border: {
    light: 'border-black/5 dark:border-white/5',
    medium: 'border-black/10 dark:border-white/10',
    strong: 'border-black/20 dark:border-white/20',
  },
} as const;

/**
 * Standard section wrapper classes
 */
export const sectionClasses = {
  default: `${spacing.section.md} ${colors.background.light} ${colors.background.dark} relative`,
  withBorder: `${spacing.section.md} ${colors.background.light} ${colors.background.dark} relative border-t ${colors.border.light}`,
} as const;

/**
 * Standard container classes
 */
export const containerClasses = {
  default: `container mx-auto ${spacing.container.default} relative z-10`,
} as const;

/**
 * Standard card classes
 */
export const cardClasses = {
  default: `${colors.background.surface} ${spacing.card.md} ${borderRadius.card} ${shadows.md} ${colors.border.light} border`,
  hover: `${colors.background.surface} ${spacing.card.md} ${borderRadius.card} ${shadows.md} ${colors.border.light} border hover:${shadows.hover.md.replace('hover:', '')} hover:-translate-y-1 ${transitions.default}`,
} as const;

