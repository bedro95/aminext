import Link from "next/link";
import { TrendingUp, Minus, ChevronRight } from "lucide-react";
import { Profession } from "@/data/professions";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { getRiskLevel, getRiskLabel, getRiskColor, getRiskGradient, getRiskIconBg } from "@/lib/utils";

interface ProfessionCardProps {
  profession: Profession;
}

export function ProfessionCard({ profession }: ProfessionCardProps) {
  const riskLevel = getRiskLevel(profession.automationScore);

  return (
    <Link href={`/profession/${profession.slug}`} className="block group h-full">
      <article className="relative h-full overflow-hidden rounded-2xl border border-[var(--card-border)] bg-[var(--card)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/8 dark:hover:shadow-black/30 hover:border-transparent">

        {/* Top gradient stripe */}
        <div className={`h-1 w-full bg-gradient-to-r ${getRiskGradient(profession.automationScore)}`} />

        <div className="p-5">
          {/* Icon + Score */}
          <div className="flex items-start justify-between mb-4">
            {/* Icon bubble */}
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl border ${getRiskIconBg(profession.automationScore)} flex-shrink-0`}>
              {profession.icon}
            </div>
            {/* Score */}
            <div className="flex flex-col items-end gap-1">
              <span className={`text-2xl font-black tabular-nums leading-none ${getRiskColor(profession.automationScore)}`}>
                {profession.automationScore}%
              </span>
              <Badge variant={riskLevel}>{getRiskLabel(profession.automationScore)}</Badge>
            </div>
          </div>

          {/* Name + industry */}
          <h3 className="text-sm font-bold text-[var(--foreground)] mb-0.5 leading-snug group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
            {profession.title}
          </h3>
          <p className="text-xs text-[var(--muted-foreground)] mb-3">{profession.industry}</p>

          {/* Progress bar */}
          <ProgressBar value={profession.automationScore} height="sm" animated={false} />

          {/* Footer */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-[var(--border)]">
            <div className="flex items-center gap-1.5">
              {profession.trend === "rising" ? (
                <TrendingUp size={11} className="text-red-400" />
              ) : (
                <Minus size={11} className="text-slate-400" />
              )}
              <span className="text-xs text-[var(--muted-foreground)]">{profession.timeline}</span>
            </div>
            <ChevronRight
              size={14}
              className="text-[var(--muted-foreground)] group-hover:text-sky-500 group-hover:translate-x-0.5 transition-all"
            />
          </div>
        </div>
      </article>
    </Link>
  );
}
