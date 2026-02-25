import { skills, getSkillsByCategory } from "@/data/skills";
import { SkillCard } from "@/components/cards/SkillCard";
import { Badge } from "@/components/ui/Badge";

export const metadata = {
  title: "Survival Guide — Skills to Thrive in the AGI Era",
  description: "The most future-proof skills to build in the age of AI. Data-driven recommendations to stay ahead.",
};

const categories = [
  { key: "technical", label: "Technical Skills", emoji: "⚡", description: "Tools, platforms, and technical proficiencies that AI creates demand for." },
  { key: "cognitive", label: "Cognitive Skills", emoji: "🧠", description: "Thinking frameworks and mental models that AI cannot replicate." },
  { key: "social", label: "Social Skills", emoji: "🤝", description: "Human-to-human competencies that grow in value as AI handles more execution." },
  { key: "creative", label: "Creative Skills", emoji: "🎨", description: "Creative direction and aesthetic judgment that AI requires humans to provide." },
] as const;

export default function SurvivalGuidePage() {
  const surgingCount = skills.filter((s) => s.demandTrend === "surging").length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      {/* Header */}
      <div className="max-w-3xl mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-semibold mb-4">
          🛡️ AGI Survival Guide — Updated 2026
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--foreground)] mb-4">
          Skills that make you{" "}
          <span className="gradient-text">irreplaceable</span>
        </h1>
        <p className="text-lg text-[var(--muted-foreground)] leading-relaxed">
          As AI handles more execution, the value of distinctly human skills rises. These are the
          {" "}{skills.length} highest-impact skills to develop in the AGI era — ranked by future-proof
          score and demand trajectory.
        </p>

        {/* Key insight */}
        <div className="mt-6 p-5 rounded-xl border border-sky-200 dark:border-sky-500/30 bg-sky-50 dark:bg-sky-500/8">
          <p className="text-sm text-sky-800 dark:text-sky-300 leading-relaxed">
            <strong>Key insight:</strong>{" "}
            {surgingCount} of {skills.length} tracked skills show{" "}
            <strong>surging demand</strong> — all of them augment or direct AI rather than compete
            with it. The workers who thrive won&apos;t be those who ignore AI, but those who
            learn to command it.
          </p>
        </div>
      </div>

      {/* Demand legend */}
      <div className="flex flex-wrap gap-3 mb-10">
        {[
          { label: "🔥 Surging Demand", desc: "Growing 200%+ YoY in job postings", variant: "surging" as const },
          { label: "↗ Growing Demand", desc: "Growing 50-199% YoY", variant: "growing" as const },
          { label: "→ Stable Demand", desc: "Consistent demand, not growing rapidly", variant: "stable" as const },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <Badge variant={item.variant}>{item.label}</Badge>
            <span className="text-xs text-[var(--muted-foreground)]">{item.desc}</span>
          </div>
        ))}
      </div>

      {/* Skills by category */}
      <div className="space-y-14">
        {categories.map(({ key, label, emoji, description }) => {
          const categorySkills = getSkillsByCategory(key);
          return (
            <section key={key}>
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">{emoji}</span>
                  <h2 className="text-xl font-bold text-[var(--foreground)]">{label}</h2>
                </div>
                <p className="text-sm text-[var(--muted-foreground)] ml-9">{description}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {categorySkills.map((skill) => (
                  <SkillCard key={skill.id} skill={skill} />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Final CTA box */}
      <div className="mt-16 p-8 sm:p-12 rounded-2xl border border-[var(--card-border)] bg-[var(--card)] text-center">
        <h2 className="text-2xl font-bold text-[var(--foreground)] mb-3">
          The most important mindset shift
        </h2>
        <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto leading-relaxed">
          Stop asking &quot;will AI replace me?&quot; and start asking &quot;what can I do with AI that
          I couldn&apos;t do without it?&quot; The AGI era rewards those who treat AI as a collaborator
          and invest in the skills that make human-AI collaboration extraordinary.
        </p>
      </div>
    </div>
  );
}
