"use client";

import { cn, getRiskBarColor } from "@/lib/utils";
import { useEffect, useState } from "react";

interface ProgressBarProps {
  value: number; // 0-100
  className?: string;
  animated?: boolean;
  height?: "sm" | "md" | "lg";
}

const heightMap = { sm: "h-1.5", md: "h-2", lg: "h-3" };

export function ProgressBar({ value, className, animated = true, height = "md" }: ProgressBarProps) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!animated) {
      setWidth(value);
      return;
    }
    const timer = setTimeout(() => setWidth(value), 100);
    return () => clearTimeout(timer);
  }, [value, animated]);

  return (
    <div
      className={cn(
        "w-full rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800",
        heightMap[height],
        className
      )}
    >
      <div
        className={cn("h-full rounded-full transition-all duration-700 ease-out", getRiskBarColor(value))}
        style={{ width: `${width}%` }}
      />
    </div>
  );
}
