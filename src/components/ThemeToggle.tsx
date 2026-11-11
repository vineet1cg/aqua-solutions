"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const [isDark, setIsDark] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme");
    if (stored === "light") {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    } else {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  if (!mounted) {
    return (
      <div className={`w-9 h-9 rounded-lg border border-neutral-800 bg-black ${className}`} />
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to black/dark theme"}
      title={isDark ? "લાઈટ મોડમાં બદલો (Switch to Light Mode)" : "ડાર્ક મોડમાં બદલો (Switch to Dark Mode)"}
      className={`inline-flex items-center justify-center w-9 h-9 rounded-lg border transition-colors text-xs ${
        isDark
          ? "bg-black border-neutral-800 text-neutral-300 hover:bg-neutral-900 hover:text-white"
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
