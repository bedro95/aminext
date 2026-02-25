import { timelineEvents } from "@/data/timeline";
import { Badge } from "@/components/ui/Badge";
import { formatNumber } from "@/lib/utils";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Timeline — AI Disruption History",
  description: "A chronological record of key AI breakthroughs and their impact on human employment.",
};

const categoryConfig: Record<string, { label: string; color: string }> = {
  model: { label: "AI Model", color: "bg-sky-500" },
  deployment: { label: "Deployment", color: "bg-violet-500" },
  research: { label: "Research", color: "bg-orange-500" },
  policy: { label: "Policy", color: "bg-emerald-500" },
  economic: { label: "Economic", color: "bg-rose-500" },
};

const impactConfig: Record<string, { variant: "critical" | "high" | "medium" | "low"; label: string }> = {
  high: { variant: "critical", label: "High Impact" },
  medium: { variant: "medium", label: "Medium Impact" },
  low: { variant: "low", label: "Low Impact" },
};

export default function TimelinePage() {
  const sorted = [...timelineEvents].sort((a, b) => b.year - a.year);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--foreground)] mb-3">
          The AGI Disruption Timeline
        </h1>
        <p className="text-lg text-[var(--muted-foreground)] max-w-2xl">
          A living record of key AI breakthroughs, deployments, and their documented impact on
          human employment from 2022 to present.
        </p>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-4 mb-12">
        {[
          { label: "Events Tracked", value: timelineEvents.length.toString() },
          {
            label: "Jobs Disrupted",
            value: formatNumber(
              timelineEvents.reduce((sum, e) => sum + (e.jobsAffected || 0), 0)
            ),
          },
          {
            label: "High-Impact Events",
            value: timelineEvents.filter((e) => e.impact === "high").length.toString(),
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center p-4 rounded-xl border border-[var(--card-border)] bg-[var(--card)] text-center"
          >
            <span className="text-2xl font-extrabold text-[var(--foreground)]">{stat.value}</span>
            <span className="text-xs text-[var(--muted-foreground)] mt-1">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-px bg-[var(--border)]" />

        <div className="space-y-8">
          {sorted.map((event, i) => {
            const cat = categoryConfig[event.category] || { label: event.category, color: "bg-slate-500" };
            const impact = impactConfig[event.impact];

            return (
              <div key={event.id} className="relative pl-12 sm:pl-16">
                {/* Dot */}
                <div
                  className={cn(
                    "absolute left-2.5 sm:left-4 top-2 w-3 h-3 rounded-full border-2 border-[var(--background)]",
                    event.impact === "high"
                      ? "bg-red-500"
                      : event.impact === "medium"
                      ? "bg-orange-400"
                      : "bg-slate-400"
                  )}
                />

                {/* Card */}
                <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5">
                  {/* Top row */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="text-xs font-semibold text-[var(--muted-foreground)]">
                      {event.date}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <div className={cn("w-2 h-2 rounded-full", cat.color)} />
                      <span className="text-xs text-[var(--muted-foreground)]">{cat.label}</span>
                    </div>
                    <Badge variant={impact.variant}>{impact.label}</Badge>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-[var(--foreground)] mb-2 leading-tight">
                    {event.title}
                  </h3>
                  <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                    {event.description}
                  </p>

                  {/* Footer */}
                  <div className="flex flex-wrap items-center gap-4 mt-4 pt-3 border-t border-[var(--border)]">
                    {event.jobsAffected && (
                      <span className="text-xs text-[var(--muted-foreground)]">
                        <strong className="text-[var(--foreground)]">
                          {formatNumber(event.jobsAffected)}
                        </strong>{" "}
                        workers affected
                      </span>
                    )}
                    {event.source && (
                      <span className="text-xs text-[var(--muted-foreground)]">
                        Source: {event.source}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-16 p-5 rounded-xl border border-[var(--border)] bg-[var(--muted)]">
        <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
          <strong className="text-[var(--foreground)]">Methodology note:</strong> Events are selected
          for their documented or projected impact on employment. Job displacement figures are estimates
          from referenced research reports and may include both direct displacement and significant
          task-level automation across affected workforces.
        </p>
      </div>
    </div>
  );
}
