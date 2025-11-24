
import React, { useCallback, useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { cn } from '../lib/utils';

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

  return (
    <button
      onClick={toggleTheme}
      className={cn("relative p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors", className)}
      {...props}
    >
      {isDark ? <Sun className="w-5 h-5 text-text-primary" /> : <Moon className="w-5 h-5 text-text-primary" />}
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}

export default AnimatedThemeToggler;
