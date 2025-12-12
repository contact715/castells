import React from 'react';
import { cn } from '../../lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: 'default' | 'minimal' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Standardized Input component for consistent form styling
 * 
 * Variants:
 * - default: Light background with border (for light forms)
 * - minimal: Transparent with bottom border (for dark forms)
 * - dark: Dark background (for dark forms)
 * 
 * Sizes:
 * - sm: px-4 py-2 text-sm
 * - md: px-4 py-3 text-base (default)
 * - lg: px-8 py-4 text-xl
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      variant = 'default',
      size = 'md',
      className,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    const baseStyles = "w-full focus:outline-none transition-all font-sans";
    
    const variants = {
      default: "bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-xl focus:border-coral dark:focus:border-coral focus:bg-white dark:focus:bg-white/10 placeholder:text-black/20 dark:placeholder:text-white/20",
      minimal: "bg-transparent border-b border-white/20 rounded-none focus:border-white placeholder:text-white/20 text-white",
      dark: "bg-ivory border border-black/10 rounded-xl focus:border-coral placeholder:text-text-secondary/40"
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-4 py-3 text-base",
      lg: "px-8 py-4 text-xl rounded-2xl"
    };

    const labelSizes = {
      sm: "text-[10px]",
      md: "text-xs",
      lg: "text-sm"
    };

    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "block font-bold uppercase tracking-widest",
              labelSizes[size],
              variant === 'minimal' ? "text-white/40" : "text-text-secondary",
              "ml-1"
            )}
          >
            {label}
            {props.required && <span className="text-coral ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            baseStyles,
            variants[variant],
            sizes[size],
            error && "border-red-500 focus:border-red-500",
            className
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-red-500 text-xs mt-1">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${inputId}-helper`} className={cn(
            "text-xs mt-1",
            variant === 'minimal' ? "text-white/40" : "text-text-secondary"
          )}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

