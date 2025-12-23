import React from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'outline-white';
  size?: 'sm' | 'md' | 'lg';
  as?: 'button' | 'a';
  href?: string;
  children: React.ReactNode;
}

/**
 * Standardized Button component for consistent styling across the site
 * 
 * Variants:
 * - primary: Black background, white text (default)
 * - secondary: Coral background, white text
 * - outline: Transparent background, black  * 
 * Sizes:
 * - sm: px-6 py-2.5 text-xs (small buttons)
 * - md: px-6 py-3 text-xs (default, medium buttons)
 * - lg: px-8 py-4 text-sm (large buttons, CTAs)
 */
export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      as,
      href,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const Component = as || (href ? 'a' : 'button');
    const buttonProps = href ? { href } : { type: 'button' as const };

    const baseStyles = "relative flex cursor-pointer items-center justify-center overflow-hidden text-center transition-all duration-300 ease-in-out rounded-[2rem] font-bold uppercase tracking-widest";

    const variants = {
      primary: "bg-black text-white dark:bg-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90",
      secondary: "bg-white text-black hover:bg-white/90",
      outline: "bg-transparent  -black dark:-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black",
      'outline-white': "bg-transparent  -white/10 text-white hover:bg-white hover:text-black"
    };

    const sizes = {
      sm: "px-6 py-2.5 text-xs",
      md: "px-6 py-3 text-xs",
      lg: "px-8 py-4 text-sm"
    };

    // Add accessibility attributes
    const accessibilityProps = Component === 'button' ? {
      'aria-label': props['aria-label'] || (typeof children === 'string' ? children : undefined),
    } : {};

    return (
      <Component
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          'focus:outline-none focus:ring-2 focus:ring-coral focus:ring-offset-2',
          className
        )}
        ref={ref as any}
        {...buttonProps}
        {...accessibilityProps}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Button.displayName = "Button";

