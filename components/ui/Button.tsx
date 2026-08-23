import React from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'outline-white';
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
 * - secondary: Accent background, white text
 * - outline: Transparent background, black  * 
 * Sizes:
 * - sm: px-5 py-2.5 text-sm (small buttons)
 * - md: px-5 py-3 text-[15px] (default, medium buttons)
 * - lg: px-8 py-4 text-sm (large buttons, CTAs)
 */
export /*
  23 августа 2026 кнопки переведены на редакторский стиль по образцу, который
  выбрал владелец (academy.claude.com). Там кнопка набрана обычным регистром,
  средним весом, 15 пикселей. У нас было ЗАГЛАВНЫМИ, жирным, 12 пикселей и с
  широкой разрядкой — от этого интерфейс читался как рекламный баннер, а не
  как издание. Разрядка на заглавных ещё и мешает читать: глаз собирает слово
  по буквам.
*/
const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
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

    const baseStyles = "relative flex cursor-pointer items-center justify-center overflow-hidden text-center transition-[background-color,color,box-shadow,border-color,filter] duration-300 ease-in-out rounded-button font-medium whitespace-nowrap";

    const variants = {
      primary: "bg-black text-white dark:bg-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90",
      secondary: "bg-white text-black hover:bg-white/90 dark:bg-white dark:text-black dark:hover:bg-white/90",
      accent: "bg-accent-gradient text-white hover:shadow-lg hover:shadow-accent/25 hover:brightness-110",
      outline: "bg-transparent border border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black",
      'outline-white': "bg-transparent border border-white/10 text-white hover:bg-white hover:text-black"
    };

    const sizes = {
      sm: "px-5 py-2.5 text-sm",
      md: "px-5 py-3 text-[15px]",
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
          'focus:outline-hidden focus:ring-2 focus:ring-accent focus:ring-offset-2',
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

