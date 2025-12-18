
import React, { useCallback, useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { cn } from "../../lib/utils";

interface AnimatedThemeTogglerProps extends React.ComponentPropsWithoutRef<"button"> {
  className?: string;
}

export const AnimatedThemeToggler = ({
  className,
  ...props
}: AnimatedThemeTogglerProps) => {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark")
    setIsDark(isDarkMode)
  }, [])

  const toggleTheme = useCallback(() => {
    const newTheme = !isDark
    setIsDark(newTheme)

    // Simple toggle without ViewTransitions to prevent hook errors
    if (newTheme) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }, [isDark])

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
      className={cn("relative p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors", className)}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={isDark}
      {...props}
    >
      {isDark ? <Sun className="w-5 h-5 text-text-primary" aria-hidden="true" /> : <Moon className="w-5 h-5 text-text-primary" aria-hidden="true" />}
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}

export default AnimatedThemeToggler;
