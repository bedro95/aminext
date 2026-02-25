import { industries } from "@/data/industries";
import { IndustryCard } from "@/components/cards/IndustryCard";
import { IndustryRadar } from "@/components/charts/IndustryRadar";
import { Card } from "@/components/ui/Card";
import { formatNumber, getRiskLabel, getRiskLevel } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";

export const metadata = {
  title: "Industries — Automation Risk by Sector",
  description: "See how AI is transforming each major industry sector with detailed automation risk analysis.",
};

export default function IndustriesPage() {
  const sorted = [...industries].sort((a, b) => b.automationScore - a.automationScore);
  const totalAtRisk = industries.reduce((sum, i) => sum + i.workersAffected, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--foreground)] mb-3">
          Industries Under Pressure
        </h1>
        <p className="text-lg text-[var(--muted-foreground)] max-w-2xl">
          How AI is transforming each major sector — which industries face existential disruption
          and which retain the most human value.
        </p>
        <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-sky-50 dark:bg-sky-500/10 border border-sky-100 dark:border-sky-500/20 text-sky-700 dark:text-sky-400 text-sm font-medium">
          {formatNumber(totalAtRisk)}+ workers at significant automation risk globally
        </div>
      </div>

      {/* Radar + Top 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12">
        <Card className="lg:col-span-2">
          <h2 className="text-sm font-semibold text-[var(--foreground)] mb-4">Risk Overview Radar</h2>
          <IndustryRadar />
        </Card>

        <div className="lg:col-span-3 space-y-4">
          <h2 className="text-sm font-semibold text-[var(--foreground)]">Most Disrupted Sectors</h2>
          {sorted.slice(0, 4).map((industry, i) => {
            const riskLevel = getRiskLevel(industry.automationScore);
            return (
              <div
                key={industry.id}
                id={industry.slug}
                className="flex items-center gap-4 p-4 rounded-xl border border-[var(--card-border)] bg-[var(--card)]"
              >
                <span className="text-xl w-8 text-center">{industry.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-[var(--foreground)]">{industry.name}</span>
                    <Badge variant={riskLevel}>{industry.automationScore}%</Badge>
                  </div>
                  <ProgressBar value={industry.automationScore} height="sm" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* All industries detailed */}
      <h2 className="text-xl font-bold text-[var(--foreground)] mb-6">All Sectors — Detailed Analysis</h2>
      <div className="space-y-6">
        {sorted.map((industry) => {
          const riskLevel = getRiskLevel(industry.automationScore);
          const affectedPct = Math.round((industry.workersAffected / industry.totalWorkers) * 100);
          return (
            <Card key={industry.id} id={industry.slug} className="overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                {/* Icon + name */}
                <div className="flex items-center gap-3 sm:w-52 flex-shrink-0">
                  <span className="text-3xl">{industry.icon}</span>
                  <div>
                    <h3 className="text-sm font-bold text-[var(--foreground)]">{industry.name}</h3>
                    <Badge variant={riskLevel} className="mt-1">
                      {getRiskLabel(industry.automationScore)}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-4">
                    {industry.description}
                  </p>

                  {/* Stats row */}
                  <div className="flex flex-wrap gap-6 mb-4 text-sm">
                    <div>
                      <div className="text-lg font-bold tabular-nums text-[var(--foreground)]">
                        {industry.automationScore}%
                      </div>
                      <div className="text-xs text-[var(--muted-foreground)]">Automation Risk</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold tabular-nums text-[var(--foreground)]">
                        {formatNumber(industry.workersAffected)}
                      </div>
                      <div className="text-xs text-[var(--muted-foreground)]">Workers at Risk</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold tabular-nums text-[var(--foreground)]">
                        {affectedPct}%
                      </div>
                      <div className="text-xs text-[var(--muted-foreground)]">of Workforce</div>
                    </div>
                  </div>

                  <ProgressBar value={industry.automationScore} height="md" className="mb-4" />

                  {/* Key drivers */}
                  <div className="flex flex-wrap gap-1.5">
                    {industry.keyDrivers.map((driver) => (
                      <span
                        key={driver}
                        className="px-2.5 py-1 rounded-md bg-[var(--accent)] text-[var(--muted-foreground)] text-xs font-medium"
                      >
                        {driver}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
