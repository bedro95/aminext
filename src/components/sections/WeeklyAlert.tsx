"use client";

import { AlertTriangle, Zap } from "lucide-react";

const alerts = [
  {
    icon: "🤖",
    title: "AI agents now complete 40% of software tasks autonomously",
    detail: "GitHub Copilot Workspace and Devin report autonomous task completion rates doubling in Q1 2025.",
    type: "high" as const,
  },
  {
    icon: "📊",
    title: "Goldman Sachs deploys AI for 95% of IPO prospectus drafting",
    detail: "Goldman reduces junior analyst headcount by 30% as LLMs handle routine financial document creation.",
    type: "high" as const,
  },
  {
    icon: "🎬",
    title: "Major studios use AI for 60% of visual effects in blockbusters",
    detail: "VFX artists face the biggest wave of layoffs since the digital transition of the 1990s.",
    type: "medium" as const,
  },
  {
    icon: "🏥",
    title: "FDA approves first fully AI-diagnosed skin cancer detection tool",
    detail: "DermAI achieves 94.5% accuracy vs 91% human dermatologist average, cleared for clinical use.",
    type: "medium" as const,
  },
];

export function WeeklyAlert() {
  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-500/15">
          <AlertTriangle size={16} className="text-amber-600 dark:text-amber-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-[var(--foreground)]">This Week in AI Disruption</h2>
          <p className="text-sm text-[var(--muted-foreground)]">
            Real developments reshaping the workforce
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {alerts.map((alert, i) => (
          <div
            key={i}
            className={`p-5 rounded-xl border transition-all duration-150 ${
              alert.type === "high"
                ? "border-red-100 dark:border-red-500/20 bg-red-50/50 dark:bg-red-500/5"
                : "border-amber-100 dark:border-amber-500/20 bg-amber-50/50 dark:bg-amber-500/5"
            }`}
          >
            <div className="flex items-start gap-3">
              <span className="text-xl flex-shrink-0 mt-0.5">{alert.icon}</span>
              <div>
                <p className="text-sm font-semibold text-[var(--foreground)] leading-tight mb-1.5">
                  {alert.title}
                </p>
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">{alert.detail}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
