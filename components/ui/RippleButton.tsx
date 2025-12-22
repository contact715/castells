import React from "react";
import { cn } from "../../lib/utils";

interface RippleButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  rippleColor?: string; // Deprecated, kept for backward compatibility
  duration?: string; // Deprecated, kept for backward compatibility
  as?: 'button' | 'a';
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
}

export const RippleButton = React.forwardRef<HTMLElement, any>(
  (
    {
      className,
      children,
      rippleColor,
      duration,
      onClick,
      href,
      as,
      type = "button",
      ...props
    },
    ref
  ) => {
    const Component = as || (href ? 'a' : 'button');
    const buttonProps = href ? { href } : { type };

    return (
      <Component
        className={cn(
          "relative flex cursor-pointer items-center justify-center overflow-hidden rounded-[2rem] px-4 py-2 text-center transition-all duration-300 ease-in-out",
          className
        )}
        onClick={onClick}
        ref={ref}
        {...buttonProps}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

RippleButton.displayName = "RippleButton"
