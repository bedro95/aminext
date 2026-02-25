import Link from "next/link";
import { TrendingUp, Minus, ArrowRight } from "lucide-react";
import { Profession } from "@/data/professions";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { getRiskLevel, getRiskLabel } from "@/lib/utils";

interface ProfessionCardProps {
  profession: Profession;
}

export function ProfessionCard({ profession }: ProfessionCardProps) {
  const riskLevel = getRiskLevel(profession.automationScore);

  return (
    <Link href={`/profession/${profession.slug}`} className="block group">
      <article className="h-full rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 transition-all duration-200 hover:border-sky-200 dark:hover:border-sky-500/30 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-[var(--foreground)] leading-tight mb-1 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors truncate">
              {profession.title}
            </h3>
            <p className="text-xs text-[var(--muted-foreground)]">{profession.industry}</p>
          </div>
          <Badge variant={riskLevel}>{getRiskLabel(profession.automationScore)}</Badge>
        </div>

        {/* Score */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[var(--muted-foreground)]">Automation Risk</span>
            <div className="flex items-center gap-1.5">
              {profession.trend === "rising" ? (
                <TrendingUp size={12} className="text-red-400" />
              ) : (
                <Minus size={12} className="text-slate-400" />
              )}
              <span className="text-sm font-bold tabular-nums text-[var(--foreground)]">
                {profession.automationScore}%
              </span>
            </div>
          </div>
          <ProgressBar value={profession.automationScore} height="sm" />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-[var(--muted-foreground)]">{profession.timeline}</span>
          <ArrowRight
            size={14}
            className="text-[var(--muted-foreground)] group-hover:text-sky-500 group-hover:translate-x-0.5 transition-all"
          />
        </div>
      </article>
    </Link>
  );
}
