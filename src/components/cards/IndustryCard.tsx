import Link from "next/link";
import { TrendingUp, Minus } from "lucide-react";
import { Industry } from "@/data/industries";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Badge } from "@/components/ui/Badge";
import { getRiskLevel, getRiskLabel, formatNumber } from "@/lib/utils";

interface IndustryCardProps {
  industry: Industry;
}

export function IndustryCard({ industry }: IndustryCardProps) {
  const riskLevel = getRiskLevel(industry.automationScore);
  const affectedPct = Math.round((industry.workersAffected / industry.totalWorkers) * 100);

  return (
    <Link href={`/industries#${industry.slug}`} className="block group">
      <article className="h-full rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 transition-all duration-200 hover:border-sky-200 dark:hover:border-sky-500/30 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl" role="img" aria-label={industry.name}>
            {industry.icon}
          </span>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-[var(--foreground)] leading-tight group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors truncate">
              {industry.name}
            </h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              {industry.trend === "rising" ? (
                <TrendingUp size={11} className="text-red-400" />
              ) : (
                <Minus size={11} className="text-slate-400" />
              )}
              <span className="text-xs text-[var(--muted-foreground)]">
                {industry.trend === "rising" ? "Accelerating" : "Stable pace"}
              </span>
            </div>
          </div>
          <Badge variant={riskLevel}>{industry.automationScore}%</Badge>
        </div>

        <ProgressBar value={industry.automationScore} height="sm" className="mb-4" />

        <div className="flex items-center justify-between text-xs text-[var(--muted-foreground)]">
          <span>{formatNumber(industry.workersAffected)} at risk</span>
          <span>{affectedPct}% of workforce</span>
        </div>
      </article>
    </Link>
  );
}
