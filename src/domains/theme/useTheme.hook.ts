"use client";

import { useEffect, useState } from "react";

type ThemeMode = "light" | "dark" | "system";

export function useTheme() {
  const [theme, setTheme] = useState<ThemeMode>("system");
  const [mounted, setMounted] = useState(false);

  // Leer localStorage SOLO en cliente
  useEffect(() => {
    setMounted(true);

    try {
      const saved = localStorage.getItem("theme") as ThemeMode | null;
      if (saved) {
        setTheme(saved);
      }
    } catch {}
  }, []);

  // Aplicar clases cuando cambie theme
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "light") root.classList.add("light");
    if (theme === "dark") root.classList.add("dark");

    try {
      localStorage.setItem("theme", theme);
    } catch {}
  }, [theme, mounted]);

  return {
    theme,
    setTheme,
    mounted, // útil para evitar hydration mismatch
  };
}
