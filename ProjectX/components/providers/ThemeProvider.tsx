"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";
export type AccentColor = "teal" | "ink" | "coral" | "blue" | "yellow" | "green";

// Thalassa design system colors
const accentPalette: Record<AccentColor, { primary: string; dark: string; secondary: string }> = {
  teal: { primary: "59, 130, 246", dark: "37, 99, 235", secondary: "96, 165, 250" }, // Blue-500
  ink: { primary: "17, 24, 39", dark: "15, 23, 42", secondary: "100, 116, 139" },
  coral: { primary: "239, 68, 68", dark: "220, 38, 38", secondary: "248, 113, 113" }, // Red-500
  blue: { primary: "59, 130, 246", dark: "37, 99, 235", secondary: "96, 165, 250" }, // Blue-500
  yellow: { primary: "245, 158, 11", dark: "217, 119, 6", secondary: "251, 191, 36" }, // Amber-500
  green: { primary: "34, 197, 94", dark: "22, 163, 74", secondary: "74, 222, 128" }, // Green-500
};

export type BackgroundMode = "static" | "liquid" | "gradient" | "mesh";

export type LiquidVariant = "prism" | "lava" | "plasma" | "pulse" | "vortex" | "mist";

interface ThemeContextType {
  theme: Theme;
  accentColor: AccentColor;
  backgroundMode: BackgroundMode;
  liquidVariant: LiquidVariant;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  setAccentColor: (color: AccentColor) => void;
  setBackgroundMode: (mode: BackgroundMode) => void;
  setLiquidVariant: (variant: LiquidVariant) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Default to light theme with teal accent for Thalassa style
  const [theme, setThemeState] = useState<Theme>("light");
  const [accentColor, setAccentColorState] = useState<AccentColor>("teal");
  const [backgroundMode, setBackgroundModeState] = useState<BackgroundMode>("static");
  const [liquidVariant, setLiquidVariantState] = useState<LiquidVariant>("lava");

  useEffect(() => {
    // Check local storage for theme
    const savedTheme = localStorage.getItem("theme") as Theme;
    if (savedTheme) {
      setThemeState(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else {
      // Default to light theme for Thalassa
      document.documentElement.classList.remove("dark");
    }

    // Check local storage for accent color
    const savedAccent = localStorage.getItem("accent-color") as AccentColor;
    if (savedAccent && accentPalette[savedAccent]) {
      setAccentColorState(savedAccent);
      updateAccentVariables(savedAccent);
    } else {
      // Default to teal for Thalassa
      updateAccentVariables("teal");
    }

    // Check local storage for background mode
    const savedBg = localStorage.getItem("background-mode") as BackgroundMode;
    if (savedBg) {
      setBackgroundModeState(savedBg);
    }

    // Check local storage for liquid variant
    const savedLiquid = localStorage.getItem("liquid-variant") as LiquidVariant;
    if (savedLiquid) {
      setLiquidVariantState(savedLiquid);
    }
  }, []);

  const updateAccentVariables = (color: AccentColor) => {
    const palette = accentPalette[color];
    document.documentElement.style.setProperty("--accent", palette.primary);
    document.documentElement.style.setProperty("--accent-dark", palette.dark);
    document.documentElement.style.setProperty("--secondary", palette.secondary);
    // Keep legacy variables in sync
    document.documentElement.style.setProperty("--primary", palette.primary);
    document.documentElement.style.setProperty("--primary-dark", palette.dark);
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

  const setBackgroundMode = (newMode: BackgroundMode) => {
    setBackgroundModeState(newMode);
    localStorage.setItem("background-mode", newMode);
  };

  const setLiquidVariant = (newVariant: LiquidVariant) => {
    setLiquidVariantState(newVariant);
    localStorage.setItem("liquid-variant", newVariant);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, accentColor, backgroundMode, liquidVariant, toggleTheme, setTheme, setAccentColor, setBackgroundMode, setLiquidVariant }}>
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
