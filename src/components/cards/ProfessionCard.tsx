import Link from "next/link";
import { TrendUp, Minus, CaretRight } from "@phosphor-icons/react/dist/ssr";
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
        <div className={`h-1 w-full bg-gradient-to-r ${getRiskGradient(profession.automationScore)}`} />

        <div className="p-5">
          <div className="flex items-start justify-between mb-4">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl border ${getRiskIconBg(profession.automationScore)} flex-shrink-0`}>
              {profession.icon}
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className={`text-2xl font-black tabular-nums leading-none ${getRiskColor(profession.automationScore)}`}>
                {profession.automationScore}%
              </span>
              <Badge variant={riskLevel}>{getRiskLabel(profession.automationScore)}</Badge>
            </div>
          </div>

          <h3 className="text-sm font-bold text-[var(--foreground)] mb-0.5 leading-snug group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
            {profession.title}
          </h3>
          <p className="text-xs text-[var(--muted-foreground)] mb-3">{profession.industry}</p>

          <ProgressBar value={profession.automationScore} height="sm" animated={false} />

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-[var(--border)]">
            <div className="flex items-center gap-1.5">
              {profession.trend === "rising"
                ? <TrendUp size={13} weight="bold" className="text-red-400" />
                : <Minus size={13} weight="bold" className="text-slate-400" />
              }
              <span className="text-xs text-[var(--muted-foreground)]">{profession.timeline}</span>
            </div>
            <CaretRight size={14} weight="bold" className="text-[var(--muted-foreground)] group-hover:text-sky-500 group-hover:translate-x-0.5 transition-all" />
          </div>
        </div>
      </article>
    </Link>
  );
}
