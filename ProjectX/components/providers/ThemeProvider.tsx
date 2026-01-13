"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";
export type AccentColor = "coral" | "blue" | "yellow" | "green";

const accentPalette: Record<AccentColor, { primary: string; dark: string }> = {
  coral: { primary: "224, 133, 118", dark: "214, 112, 96" },
  blue: { primary: "133, 169, 224", dark: "112, 149, 214" },
  yellow: { primary: "224, 201, 133", dark: "214, 188, 112" },
  green: { primary: "133, 224, 153", dark: "112, 214, 134" },
};

interface ThemeContextType {
  theme: Theme;
  accentColor: AccentColor;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  setAccentColor: (color: AccentColor) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [accentColor, setAccentColorState] = useState<AccentColor>("coral");

  useEffect(() => {
    // Check local storage for theme
    const savedTheme = localStorage.getItem("theme") as Theme;
    if (savedTheme) {
      setThemeState(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else {
      document.documentElement.classList.add("dark");
    }

    // Check local storage for accent color
    const savedAccent = localStorage.getItem("accent-color") as AccentColor;
    if (savedAccent && accentPalette[savedAccent]) {
      setAccentColorState(savedAccent);
      updateAccentVariables(savedAccent);
    } else {
      updateAccentVariables("coral");
    }
  }, []);

  const updateAccentVariables = (color: AccentColor) => {
    const palette = accentPalette[color];
    document.documentElement.style.setProperty("--accent", palette.primary);
    document.documentElement.style.setProperty("--accent-dark", palette.dark);
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const setAccentColor = (newColor: AccentColor) => {
    setAccentColorState(newColor);
    localStorage.setItem("accent-color", newColor);
    updateAccentVariables(newColor);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, accentColor, toggleTheme, setTheme, setAccentColor }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
