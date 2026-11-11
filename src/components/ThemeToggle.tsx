"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    // Check if user previously chose dark mode
    const stored = localStorage.getItem("theme");
    if (stored === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const nextIsDark = !isDark;
    setIsDark(nextIsDark);
    if (nextIsDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  if (!mounted) {
    return (
      <div className={`w-9 h-9 rounded-lg border border-neutral-300 dark:border-neutral-800 bg-neutral-100 dark:bg-black ${className}`} />
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to white/light theme" : "Switch to black/dark theme"}
      title={isDark ? "લાઈટ મોડમાં બદલો (Switch to White Mode)" : "ડાર્ક મોડમાં બદલો (Switch to Black Mode)"}
      className={`inline-flex items-center justify-center w-9 h-9 rounded-lg border transition-colors text-xs ${
        isDark
          ? "bg-black border-neutral-800 text-neutral-200 hover:bg-neutral-900 hover:text-white"
          : "bg-white border-neutral-300 text-black hover:bg-neutral-100 shadow-sm"
      } ${className}`}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-white" />
      ) : (
        <Moon className="w-4 h-4 text-black" />
      )}
    </button>
  );
}
