"use client";

import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { getTopAtRisk, getMostSafe } from "@/data/professions";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Badge } from "@/components/ui/Badge";
import { getRiskLevel, getRiskLabel } from "@/lib/utils";

export function TopAtRisk() {
  const atRisk = getTopAtRisk(6);
  const safest = getMostSafe(4);

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Most at risk — 2/3 width */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-[var(--foreground)]">Highest Automation Risk</h2>
              <p className="text-sm text-[var(--muted-foreground)] mt-1">
                Professions facing imminent AI displacement
              </p>
            </div>
            <Link
              href="/professions"
              className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-sky-600 dark:text-sky-400 hover:underline"
            >
              View all <ArrowRight size={12} />
            </Link>
          </div>

          <div className="space-y-3">
            {atRisk.map((profession, i) => {
              const riskLevel = getRiskLevel(profession.automationScore);
              return (
                <motion.div
                  key={profession.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                >
                  <Link href={`/profession/${profession.slug}`} className="group block">
                    <div className="flex items-center gap-4 p-4 rounded-xl border border-[var(--card-border)] bg-[var(--card)] hover:border-sky-200 dark:hover:border-sky-500/30 hover:shadow-md hover:shadow-black/5 dark:hover:shadow-black/20 transition-all duration-150">
                      {/* Rank */}
                      <div className="text-sm font-bold tabular-nums text-[var(--muted-foreground)] w-5 flex-shrink-0">
                        {i + 1}
                      </div>

                      {/* Name */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-sm font-semibold text-[var(--foreground)] group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors truncate">
                            {profession.title}
                          </span>
                          {profession.trend === "rising" && (
                            <TrendingUp size={12} className="text-red-400 flex-shrink-0" />
                          )}
                        </div>
                        <ProgressBar value={profession.automationScore} height="sm" animated={false} />
                      </div>

                      {/* Score + Badge */}
                      <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                        <span className="text-base font-bold tabular-nums text-[var(--foreground)]">
                          {profession.automationScore}%
                        </span>
                        <Badge variant={riskLevel}>{getRiskLabel(profession.automationScore)}</Badge>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Safest — 1/3 width */}
        <div>
          <div className="mb-6">
            <h2 className="text-xl font-bold text-[var(--foreground)]">Most Future-Proof</h2>
            <p className="text-sm text-[var(--muted-foreground)] mt-1">
              Lowest automation risk careers
            </p>
          </div>

          <div className="space-y-3">
            {safest.map((profession, i) => {
              const riskLevel = getRiskLevel(profession.automationScore);
              return (
                <motion.div
                  key={profession.id}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                >
                  <Link href={`/profession/${profession.slug}`} className="group block">
                    <div className="p-4 rounded-xl border border-[var(--card-border)] bg-[var(--card)] hover:border-emerald-200 dark:hover:border-emerald-500/30 hover:shadow-md hover:shadow-black/5 dark:hover:shadow-black/20 transition-all duration-150">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-[var(--foreground)] group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors truncate mr-2">
                          {profession.title}
                        </span>
                        <Badge variant={riskLevel}>{profession.automationScore}%</Badge>
                      </div>
                      <ProgressBar value={profession.automationScore} height="sm" animated={false} />
                      <p className="text-xs text-[var(--muted-foreground)] mt-2">{profession.industry}</p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Alert box */}
          <div className="mt-6 p-4 rounded-xl border border-sky-200 dark:border-sky-500/30 bg-sky-50 dark:bg-sky-500/8">
            <p className="text-xs font-semibold text-sky-700 dark:text-sky-400 mb-1">
              🔍 Key Finding
            </p>
            <p className="text-xs text-sky-600 dark:text-sky-300 leading-relaxed">
              Skilled trades, caregiving, and roles requiring physical dexterity + empathy remain
              the most automation-resistant careers through 2035.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
