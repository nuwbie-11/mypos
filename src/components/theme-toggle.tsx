"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="relative h-8 w-14 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-300 overflow-hidden">
        <div className="absolute top-1 w-6 h-6 rounded-full bg-gray-400 dark:bg-gray-500 shadow-md transform transition-all duration-300 ease-in-out left-1" />
      </div>
    );
  }

  const isDark = theme === "dark";

  const handleThemeChange = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      onClick={handleThemeChange}
      className="relative h-8 w-14 rounded-full bg-muted transition-colors duration-300 overflow-hidden border dark:border-primary border-yellow-500"
      aria-label="Toggle theme"
    >
      <div
        className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-md transform transition-all duration-300 ease-in-out flex items-center justify-center ${
          isDark ? "translate-x-7" : "translate-x-1"
        }`}
      >
        {isDark ? (
          <Moon className="h-4 w-4 text-primary" />
        ) : (
          <Sun className="h-4 w-4 text-yellow-500" />
        )}
      </div>
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
