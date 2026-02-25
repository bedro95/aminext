"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface ProgressBarProps {
  value: number; // 0-100
  className?: string;
  animated?: boolean;
  height?: "sm" | "md" | "lg";
}

const heightMap = { sm: "h-1.5", md: "h-2", lg: "h-2.5" };

function getGradient(value: number): string {
  if (value >= 80) return "linear-gradient(90deg, #f87171, #ef4444, #dc2626)";
  if (value >= 60) return "linear-gradient(90deg, #fb923c, #f97316, #ea580c)";
  if (value >= 40) return "linear-gradient(90deg, #facc15, #eab308, #a3e635)";
  return "linear-gradient(90deg, #34d399, #10b981, #14b8a6)";
}

export function ProgressBar({ value, className, animated = true, height = "md" }: ProgressBarProps) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!animated) {
      setWidth(value);
      return;
    }
    const timer = setTimeout(() => setWidth(value), 80);
    return () => clearTimeout(timer);
  }, [value, animated]);

  return (
    <div
      className={cn(
        "w-full rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800/80",
        heightMap[height],
        className
      )}
    >
      <div
        className="h-full rounded-full transition-all duration-700 ease-out"
        style={{
          width: `${width}%`,
          background: getGradient(value),
        }}
      />
    </div>
  );
}
