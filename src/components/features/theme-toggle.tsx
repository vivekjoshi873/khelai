"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-6 w-12 rounded-full bg-gray-200" />;
  }

  const isDark = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full border-2 transition-colors duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      style={{
        backgroundColor: isDark ? "#374151" : "#ffffff",
        borderColor: isDark ? "#374151" : "var(--color-border)",
      }}
    >
      <span className="sr-only">Toggle theme</span>
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute top-0 left-0 inline-flex h-5 w-5 transform items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg ring-0 transition-transform duration-300 ease-in-out ${
          isDark ? "translate-x-6" : "translate-x-0"
        }`}
      >
        {isDark ? <Moon size={12} /> : <Sun size={12} />}
      </span>
    </button>
  );
}
