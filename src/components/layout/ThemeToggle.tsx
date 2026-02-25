"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className={cn("w-9 h-9 rounded-xl bg-[var(--accent)] animate-pulse", className)} />;
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className={cn(
        "relative flex items-center justify-center w-9 h-9 rounded-xl border transition-all duration-200",
        "border-slate-200 bg-white text-slate-500 hover:text-slate-800 hover:bg-slate-50 hover:border-slate-300",
        "dark:border-slate-700/80 dark:bg-slate-800/60 dark:text-slate-400 dark:hover:bg-slate-700/80 dark:hover:text-slate-200 dark:hover:border-slate-600",
        "shadow-sm",
        className
      )}
    >
      <span className="transition-all duration-300" style={{ transform: isDark ? "rotate(0deg)" : "rotate(-20deg)" }}>
        {isDark ? <Sun size={15} strokeWidth={2} /> : <Moon size={15} strokeWidth={2} />}
      </span>
    </button>
  );
}
