"use client";

import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { STATS } from "@/lib/constants";
import { formatNumber } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28 lg:py-36">
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-sky-400/6 dark:bg-sky-500/8 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-violet-400/5 dark:bg-violet-500/6 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Live badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-sky-200 bg-sky-50 dark:border-sky-500/30 dark:bg-sky-500/10 text-sky-700 dark:text-sky-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500" />
            </span>
            <span className="text-xs font-semibold tracking-wide uppercase">Live Tracking — AGI Era</span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[var(--foreground)] leading-[1.07] tracking-tight mb-6">
            How AI is reshaping{" "}
            <span className="gradient-text">every profession</span>{" "}
            on Earth
          </h1>
          <p className="text-lg sm:text-xl text-[var(--muted-foreground)] max-w-2xl mx-auto leading-relaxed">
            Real-time automation risk data for{" "}
            <strong className="text-[var(--foreground)] font-semibold">
              {formatNumber(STATS.totalJobs)} workers
            </strong>{" "}
            across every industry. See where your career stands — and what to do about it.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10"
        >
          <Link
            href="/professions"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-600 dark:bg-sky-400 dark:hover:bg-sky-500 text-white dark:text-slate-900 font-semibold text-sm shadow-lg shadow-sky-500/25 dark:shadow-sky-400/20 transition-all duration-150 active:scale-95"
          >
            Explore All Professions
            <ArrowRight size={15} />
          </Link>
          <Link
            href="/survival-guide"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] font-semibold text-sm hover:bg-[var(--accent)] transition-all duration-150 active:scale-95"
          >
            Survival Guide
          </Link>
        </motion.div>

        {/* Key stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto"
        >
          {[
            { label: "Workers Tracked", value: formatNumber(STATS.totalJobs), color: "text-[var(--foreground)]" },
            { label: "High Risk Jobs", value: formatNumber(STATS.atHighRisk), color: "text-red-500" },
            { label: "Oxford Study", value: `${STATS.oxfordPercentage}%`, color: "text-orange-500" },
            { label: "McKinsey Study", value: `${STATS.mckinseyPercentage}%`, color: "text-yellow-600 dark:text-yellow-400" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center p-4 rounded-xl border border-[var(--card-border)] bg-[var(--card)]"
            >
              <span className={`text-2xl sm:text-3xl font-extrabold tabular-nums ${stat.color}`}>
                {stat.value}
              </span>
              <span className="text-xs text-[var(--muted-foreground)] mt-1 leading-tight">{stat.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Source note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center text-xs text-[var(--muted-foreground)] mt-6"
        >
          Data sourced from Oxford University, McKinsey Global Institute, Goldman Sachs & WEF
        </motion.p>
      </div>
    </section>
  );
}
