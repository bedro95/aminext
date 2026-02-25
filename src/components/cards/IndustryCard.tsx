import Link from "next/link";
import { TrendUp, Minus } from "@phosphor-icons/react/dist/ssr";
import { Industry } from "@/data/industries";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { getRiskLabel, formatNumber, getRiskGradient, getRiskColor } from "@/lib/utils";

interface IndustryCardProps {
  industry: Industry;
}

export function IndustryCard({ industry }: IndustryCardProps) {
  const affectedPct = Math.round((industry.workersAffected / industry.totalWorkers) * 100);

  return (
    <Link href={`/industries#${industry.slug}`} className="block group h-full">
      <article className="relative h-full overflow-hidden rounded-2xl border border-[var(--card-border)] bg-[var(--card)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/8 dark:hover:shadow-black/30 hover:border-transparent">
        <div className={`h-1 w-full bg-gradient-to-r ${getRiskGradient(industry.automationScore)}`} />

        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ backgroundColor: `${industry.color}18`, border: `1.5px solid ${industry.color}35` }}
              >
                {industry.icon}
              </div>
              <div>
                <h3 className="text-sm font-bold text-[var(--foreground)] leading-tight group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                  {industry.name}
                </h3>
                <div className="flex items-center gap-1 mt-0.5">
                  {industry.trend === "rising"
                    ? <TrendUp size={11} weight="bold" className="text-red-400" />
                    : <Minus size={11} weight="bold" className="text-slate-400" />
                  }
                  <span className="text-[10px] text-[var(--muted-foreground)]">
                    {industry.trend === "rising" ? "Accelerating" : "Stable"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <span className={`text-2xl font-black tabular-nums ${getRiskColor(industry.automationScore)}`}>
                {industry.automationScore}%
              </span>
              <span className="text-[10px] text-[var(--muted-foreground)]">{getRiskLabel(industry.automationScore)}</span>
            </div>
          </div>

          <ProgressBar value={industry.automationScore} height="sm" className="mb-3" />

          <div className="flex items-center justify-between">
            <span className="text-xs text-[var(--muted-foreground)]">
              <span className="font-semibold text-[var(--foreground)]">{formatNumber(industry.workersAffected)}</span> at risk
            </span>
            <span className="text-xs text-[var(--muted-foreground)]">
              <span className="font-semibold text-[var(--foreground)]">{affectedPct}%</span> of workforce
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
