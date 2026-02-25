import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRiskLevel(score: number): "critical" | "high" | "medium" | "low" {
  if (score >= 80) return "critical";
  if (score >= 60) return "high";
  if (score >= 40) return "medium";
  return "low";
}

export function getRiskLabel(score: number): string {
  const level = getRiskLevel(score);
  const map = {
    critical: "Critical Risk",
    high: "High Risk",
    medium: "Medium Risk",
    low: "Low Risk",
  };
  return map[level];
}

export function getRiskColor(score: number): string {
  const level = getRiskLevel(score);
  const map = {
    critical: "text-red-500",
    high: "text-orange-500",
    medium: "text-yellow-500",
    low: "text-emerald-500",
  };
  return map[level];
}

export function getRiskBg(score: number): string {
  const level = getRiskLevel(score);
  const map = {
    critical: "bg-red-500/10 border-red-500/20 text-red-500",
    high: "bg-orange-500/10 border-orange-500/20 text-orange-500",
    medium: "bg-yellow-500/10 border-yellow-500/20 text-yellow-500",
    low: "bg-emerald-500/10 border-emerald-500/20 text-emerald-500",
  };
  return map[level];
}

export function getRiskBarColor(score: number): string {
  if (score >= 80) return "bg-red-500";
  if (score >= 60) return "bg-orange-500";
  if (score >= 40) return "bg-yellow-500";
  return "bg-emerald-500";
}

export function getRiskGradient(score: number): string {
  if (score >= 80) return "from-red-500 to-rose-600";
  if (score >= 60) return "from-orange-500 to-amber-500";
  if (score >= 40) return "from-yellow-400 to-lime-500";
  return "from-emerald-400 to-teal-500";
}

export function getRiskIconBg(score: number): string {
  if (score >= 80) return "bg-red-50 dark:bg-red-500/10 border-red-100 dark:border-red-500/20";
  if (score >= 60) return "bg-orange-50 dark:bg-orange-500/10 border-orange-100 dark:border-orange-500/20";
  if (score >= 40) return "bg-yellow-50 dark:bg-yellow-500/10 border-yellow-100 dark:border-yellow-500/20";
  return "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/20";
}

export function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return n.toString();
}

export function slugify(text: string): string {
  return text.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}
