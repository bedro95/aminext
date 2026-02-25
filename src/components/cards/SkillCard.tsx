import { Clock, TrendingUp, Zap } from "lucide-react";
import { Skill } from "@/data/skills";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { cn } from "@/lib/utils";

const categoryConfig = {
  technical: { label: "Technical", icon: "⚡" },
  cognitive: { label: "Cognitive", icon: "🧠" },
  social: { label: "Social", icon: "🤝" },
  creative: { label: "Creative", icon: "🎨" },
};

interface SkillCardProps {
  skill: Skill;
}

export function SkillCard({ skill }: SkillCardProps) {
  const cat = categoryConfig[skill.category];

  return (
    <article className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-base">{cat.icon}</span>
            <h3 className="text-sm font-semibold text-[var(--foreground)] leading-tight">{skill.name}</h3>
          </div>
          <Badge variant={skill.demandTrend}>{skill.demandTrend === "surging" ? "🔥 Surging" : skill.demandTrend === "growing" ? "↗ Growing" : "→ Stable"}</Badge>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold tabular-nums text-[var(--foreground)]">{skill.futureProofScore}</div>
          <div className="text-[10px] text-[var(--muted-foreground)] uppercase tracking-wide">Future Score</div>
        </div>
      </div>

      {/* Future proof bar */}
      <ProgressBar value={skill.futureProofScore} height="sm" className="mb-3" />

      {/* Description */}
      <p className="text-xs text-[var(--muted-foreground)] leading-relaxed mb-4 flex-1">
        {skill.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]">
        <div className="flex items-center gap-1.5 text-xs text-[var(--muted-foreground)]">
          <Clock size={11} />
          <span>{skill.timeToLearn}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
          <TrendingUp size={11} />
          <span>{skill.avgSalaryImpact}</span>
        </div>
      </div>
    </article>
  );
}
