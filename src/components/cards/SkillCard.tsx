import { Clock, TrendUp } from "@phosphor-icons/react/dist/ssr";
import { Skill } from "@/data/skills";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";

const categoryConfig = {
  technical: { emoji: "⚡", gradient: "from-sky-500 to-indigo-500" },
  cognitive:  { emoji: "🧠", gradient: "from-violet-500 to-purple-600" },
  social:     { emoji: "🤝", gradient: "from-emerald-500 to-teal-500" },
  creative:   { emoji: "🎨", gradient: "from-rose-500 to-orange-500" },
};

const demandConfig = {
  surging: { variant: "surging" as const, label: "🔥 Surging" },
  growing: { variant: "growing" as const, label: "↗ Growing" },
  stable:  { variant: "stable"  as const, label: "→ Stable" },
};

export function SkillCard({ skill }: { skill: Skill }) {
  const cat = categoryConfig[skill.category];
  const demand = demandConfig[skill.demandTrend];

  return (
    <article className="relative overflow-hidden rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-5 h-full flex flex-col">
      <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${cat.gradient}`} />

      <div className="flex items-start justify-between gap-3 mb-3 mt-1">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">{cat.emoji}</span>
            <h3 className="text-sm font-bold text-[var(--foreground)] leading-tight">{skill.name}</h3>
          </div>
          <Badge variant={demand.variant}>{demand.label}</Badge>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="text-xl font-black tabular-nums text-[var(--foreground)]">{skill.futureProofScore}</div>
          <div className="text-[9px] uppercase tracking-widest text-[var(--muted-foreground)] font-semibold mt-0.5">Score</div>
        </div>
      </div>

      <ProgressBar value={skill.futureProofScore} height="sm" className="mb-3" />

      <p className="text-xs text-[var(--muted-foreground)] leading-relaxed flex-1 mb-4">
        {skill.description}
      </p>

      <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]">
        <div className="flex items-center gap-1.5 text-xs text-[var(--muted-foreground)]">
          <Clock size={13} weight="duotone" color="#64748b" />
          <span>{skill.timeToLearn}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
          <TrendUp size={13} weight="duotone" color="#10b981" />
          <span>{skill.avgSalaryImpact}</span>
        </div>
      </div>
    </article>
  );
}
