
import React, { MouseEvent, useEffect, useState } from "react";
import { cn } from "../lib/utils";

interface RippleButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  rippleColor?: string;
  duration?: string;
  as?: 'button' | 'a';
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
}

export const RippleButton = React.forwardRef<HTMLElement, any>(
  (
    {
      className,
      children,
      rippleColor = "#ffffff",
      duration = "600ms",
      onClick,
      href,
      as,
      type = "button",
      ...props
    },
    ref
  ) => {
    const [buttonRipples, setButtonRipples] = useState<
      Array<{ x: number; y: number; size: number; key: number }>
    >([])

    const handleClick = (event: any) => {
      createRipple(event)
      onClick?.(event)
    }

    const createRipple = (event: MouseEvent<HTMLElement>) => {
      const button = event.currentTarget
      const rect = button.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = event.clientX - rect.left - size / 2
      const y = event.clientY - rect.top - size / 2

      const newRipple = { x, y, size, key: Date.now() }
      setButtonRipples((prevRipples) => [...prevRipples, newRipple])
    }

    useEffect(() => {
      if (buttonRipples.length > 0) {
        const lastRipple = buttonRipples[buttonRipples.length - 1]
        const timeout = setTimeout(() => {
          setButtonRipples((prevRipples) =>
            prevRipples.filter((ripple) => ripple.key !== lastRipple.key)
          )
        }, parseInt(duration))
        return () => clearTimeout(timeout)
      }
    }, [buttonRipples, duration])

    const Component = as || (href ? 'a' : 'button');
    const buttonProps = href ? { href } : { type };

    return (
      <Component
        className={cn(
          "relative flex cursor-pointer items-center justify-center overflow-hidden rounded-lg px-4 py-2 text-center",
          className
        )}
        onClick={handleClick}
        ref={ref}
        {...buttonProps}
        {...props}
        style={{ '--ripple-duration': duration } as React.CSSProperties}
      >
        <div className="relative z-10">{children}</div>
        <span className="pointer-events-none absolute inset-0 z-0">
          {buttonRipples.map((ripple) => (
            <span
              className="animate-rippling absolute rounded-full opacity-30"
              key={ripple.key}
              style={{
                width: `${ripple.size}px`,
                height: `${ripple.size}px`,
                top: `${ripple.y}px`,
                left: `${ripple.x}px`,
                backgroundColor: rippleColor,
                transform: `scale(0)`,
              }}
            />
          ))}
        </span>
      </Component>
    )
  }
)

RippleButton.displayName = "RippleButton"
