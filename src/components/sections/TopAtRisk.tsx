"use client";

import Link from "next/link";
import { ArrowRight, TrendUp, Minus } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { getTopAtRisk, getMostSafe } from "@/data/professions";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { getRiskGradient, getRiskColor } from "@/lib/utils";

export function TopAtRisk() {
  const atRisk = getTopAtRisk(6);
  const safest = getMostSafe(4);

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Most at risk */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-[var(--foreground)]">Highest Automation Risk</h2>
              <p className="text-sm text-[var(--muted-foreground)] mt-0.5">Professions facing imminent AI displacement</p>
            </div>
            <Link href="/professions" className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline">
              View all <ArrowRight size={13} weight="bold" />
            </Link>
          </div>

          <div className="space-y-2.5">
            {atRisk.map((profession, i) => (
              <motion.div key={profession.id} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: i * 0.05 }}>
                <Link href={`/profession/${profession.slug}`} className="group block">
                  <div className="flex items-center gap-3 p-3.5 rounded-xl border border-[var(--card-border)] bg-[var(--card)] hover:border-transparent hover:-translate-y-px hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20 transition-all duration-150">
                    {/* Rank */}
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-black bg-gradient-to-br ${getRiskGradient(profession.automationScore)} text-white shadow-sm`}>
                      {i + 1}
                    </div>

                    <span className="text-xl flex-shrink-0">{profession.icon}</span>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-sm font-semibold text-[var(--foreground)] group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors truncate">
                          {profession.title}
                        </span>
                        {profession.trend === "rising" && (
                          <TrendUp size={12} weight="bold" className="text-red-400 flex-shrink-0" />
                        )}
                      </div>
                      <ProgressBar value={profession.automationScore} height="sm" animated={false} />
                    </div>

                    <span className={`text-lg font-black tabular-nums flex-shrink-0 ${getRiskColor(profession.automationScore)}`}>
                      {profession.automationScore}%
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Safest */}
        <div>
          <div className="mb-6">
            <h2 className="text-xl font-bold text-[var(--foreground)]">Most Future-Proof</h2>
            <p className="text-sm text-[var(--muted-foreground)] mt-0.5">Lowest automation risk careers</p>
          </div>

          <div className="space-y-2.5 mb-5">
            {safest.map((profession, i) => (
              <motion.div key={profession.id} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: i * 0.06 }}>
                <Link href={`/profession/${profession.slug}`} className="group block">
                  <div className="flex items-center gap-3 p-3.5 rounded-xl border border-[var(--card-border)] bg-[var(--card)] hover:border-transparent hover:-translate-y-px hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20 transition-all duration-150">
                    <span className="text-xl flex-shrink-0">{profession.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[var(--foreground)] group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors truncate mb-1.5">
                        {profession.title}
                      </p>
                      <ProgressBar value={profession.automationScore} height="sm" animated={false} />
                    </div>
                    <span className="text-base font-black tabular-nums text-emerald-500 flex-shrink-0">
                      {profession.automationScore}%
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="p-4 rounded-xl border border-sky-200/80 dark:border-sky-500/20 bg-gradient-to-br from-sky-50 to-indigo-50/50 dark:from-sky-500/8 dark:to-indigo-500/5">
            <p className="text-xs font-bold text-sky-700 dark:text-sky-400 mb-1.5">🔍 Key Finding</p>
            <p className="text-xs text-sky-600 dark:text-sky-300/80 leading-relaxed">
              Skilled trades, caregiving, and roles requiring physical dexterity + empathy remain the most automation-resistant through 2035.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
