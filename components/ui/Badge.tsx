import React from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'pulse' | 'outline';
  size?: 'sm' | 'md';
}

/**
 * Standardized Badge component for section labels and tags
 * 
 * Variants:
 * - default: Coral dot + text
 * - pulse: Coral dot with pulse animation + text
 * - outline: Border only, no dot
 * 
 * Sizes:
 * - sm: text-[10px] (small badges)
 * - md: text-xs (default)
 */
export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'pulse',
  size = 'md',
  className,
  ...props
}) => {
  return (
    <div className={cn("flex items-center gap-2", className)} {...props}>
      {variant !== 'outline' && (
        <span
          className={cn(
            "w-2 h-2 rounded-full bg-coral",
            variant === 'pulse' && "animate-pulse"
          )}
        />
      )}
      <span
        className={cn(
          "font-bold uppercase tracking-widest text-text-secondary",
          size === 'sm' ? "text-[10px]" : "text-xs"
        )}
      >
        {children}
      </span>
    </div>
  );
};

Badge.displayName = "Badge";



