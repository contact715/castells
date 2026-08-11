
import React, { useCallback, useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { m as motion, AnimatePresence } from 'framer-motion';
import { cn } from "../../lib/utils";
import { useReducedMotion } from '../../lib/hooks/useReducedMotion';

interface AnimatedThemeTogglerProps extends React.ComponentPropsWithoutRef<"button"> {
  className?: string;
}

export const AnimatedThemeToggler = ({
  className,
  ...props
}: AnimatedThemeTogglerProps) => {
  const prefersReducedMotion = useReducedMotion();
  const [isDark, setIsDark] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark")
    setIsDark(isDarkMode)
  }, [])

  const toggleTheme = useCallback(() => {
    if (isAnimating) return; // Prevent rapid clicking
    
    setIsAnimating(true)
    const newTheme = !isDark
    setIsDark(newTheme)

    // Enable theme transition CSS only during toggle
    document.documentElement.classList.add("theme-transitioning");
    document.body.style.opacity = '0.95';

    requestAnimationFrame(() => {
      if (newTheme) {
        document.documentElement.classList.add("dark")
        localStorage.setItem("theme", "dark")
      } else {
        document.documentElement.classList.remove("dark")
        localStorage.setItem("theme", "light")
      }

      setTimeout(() => {
        document.body.style.opacity = '1';
        document.documentElement.classList.remove("theme-transitioning");
        setIsAnimating(false);
      }, 450);
    });
  }, [isDark, isAnimating])

  // Listen for system theme changes (only if no manual preference is set)
  useEffect(() => {
    if (!window.matchMedia) return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      const savedTheme = localStorage.getItem('theme')
      // Only update if user hasn't manually set a preference
      if (!savedTheme) {
        const newTheme = e.matches
        setIsDark(newTheme)
        if (newTheme) {
          document.documentElement.classList.add("dark")
        } else {
          document.documentElement.classList.remove("dark")
        }
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return (
    <button
      onClick={toggleTheme}
      className={cn("relative p-3 rounded-full hover:bg-black/5 dark:hover:bg-white/10 overflow-hidden", className)}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={isDark}
      disabled={isAnimating}
      {...props}
    >
      <div className="relative w-5 h-5">
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="sun"
              initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.4,
                ease: [0.4, 0, 0.2, 1]
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Sun className="w-5 h-5 text-text-primary" aria-hidden="true" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.4,
                ease: [0.4, 0, 0.2, 1]
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Moon className="w-5 h-5 text-text-primary" aria-hidden="true" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}

export default AnimatedThemeToggler;
