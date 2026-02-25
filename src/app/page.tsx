import { Hero } from "@/components/sections/Hero";
import { TopAtRisk } from "@/components/sections/TopAtRisk";
import { IndustriesOverview } from "@/components/sections/IndustriesOverview";
import { WeeklyAlert } from "@/components/sections/WeeklyAlert";
import { IndustryRadar } from "@/components/charts/IndustryRadar";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TopAtRisk />
      <IndustriesOverview />

      {/* Industry radar section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] mb-4">
              Automation Risk by Industry
            </h2>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-6">
              The radar map shows relative automation risk across major industries. Administrative,
              Finance, and Retail sectors face the highest exposure, while Healthcare, Education, and
              Skilled Trades maintain greater human irreplaceability.
            </p>
            <div className="space-y-3">
              {[
                { color: "bg-red-500", label: "80–100% — Critical: Administrative, Finance, Retail" },
                { color: "bg-orange-500", label: "60–79% — High: Transportation, Legal, Media" },
                { color: "bg-yellow-500", label: "40–59% — Medium: Technology, Education, Healthcare" },
                { color: "bg-emerald-500", label: "0–39% — Low: Skilled Trades, Social Services" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${item.color}`} />
                  <span className="text-sm text-[var(--muted-foreground)]">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-6">
            <IndustryRadar />
          </div>
        </div>
      </section>

      <WeeklyAlert />

      {/* CTA section */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-10 sm:p-14">
            <span className="text-4xl mb-4 block">🧬</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] mb-4">
              Is your career future-proof?
            </h2>
            <p className="text-[var(--muted-foreground)] mb-8 leading-relaxed">
              Explore 25+ professions with detailed automation analysis, risk timelines, and the exact
              skills you need to adapt and thrive in the AGI era.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/professions"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-600 dark:bg-sky-400 dark:hover:bg-sky-500 text-white dark:text-slate-900 font-semibold text-sm shadow-lg shadow-sky-500/20 transition-all duration-150 active:scale-95"
              >
                Check Your Profession
                <ArrowRight size={15} />
              </Link>
              <Link
                href="/survival-guide"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] font-semibold text-sm hover:bg-[var(--accent)] transition-all duration-150 active:scale-95"
              >
                Build Future Skills
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
