"use client";

import { useEffect } from "react";
import { useTheme } from "@/components/providers/ThemeProvider";

/**
 * Enforces Thalassa light theme inside dashboard routes.
 * Sets light theme with teal accent color.
 */
export function DashboardThemeEnforcer() {
  const { setTheme, setAccentColor, setBackgroundMode } = useTheme();

  useEffect(() => {
    setTheme("light");
    setAccentColor("teal");
    setBackgroundMode("static");
  }, [setTheme, setAccentColor, setBackgroundMode]);

  return null;
}
