"use client";

import Link from "next/link";
import { ArrowRight, ChartBar, ShieldCheck, TrendUp, Users } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { STATS } from "@/lib/constants";
import { formatNumber } from "@/lib/utils";

const stats = [
  { icon: Users,       label: "Workers Tracked", value: formatNumber(STATS.totalJobs),          color: "text-sky-500 dark:text-sky-400",        iconBg: "bg-sky-100 dark:bg-sky-500/15",    iconColor: "#0ea5e9" },
  { icon: TrendUp,     label: "High-Risk Jobs",   value: formatNumber(STATS.atHighRisk),         color: "text-red-500",                          iconBg: "bg-red-100 dark:bg-red-500/15",    iconColor: "#ef4444" },
  { icon: ChartBar,    label: "Oxford Study",     value: `${STATS.oxfordPercentage}%`,           color: "text-orange-500",                       iconBg: "bg-orange-100 dark:bg-orange-500/15", iconColor: "#f97316" },
  { icon: ShieldCheck, label: "McKinsey Study",   value: `${STATS.mckinseyPercentage}%`,         color: "text-amber-500 dark:text-amber-400",   iconBg: "bg-amber-100 dark:bg-amber-500/15", iconColor: "#f59e0b" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28 lg:py-36">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[700px] rounded-full bg-sky-400/8 dark:bg-sky-500/10 blur-[120px]" />
        <div className="absolute top-[20%] right-[-5%] w-[450px] h-[450px] rounded-full bg-violet-400/8 dark:bg-violet-500/8 blur-[100px]" />
        <div className="absolute bottom-0 left-[-5%] w-[350px] h-[350px] rounded-full bg-indigo-300/6 dark:bg-indigo-600/8 blur-[80px]" />
        <div
          className="absolute inset-0 opacity-[0.022] dark:opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle, #64748b 1px, transparent 1px)", backgroundSize: "32px 32px" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Pill */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-sky-200/80 bg-white/80 dark:bg-sky-500/8 dark:border-sky-500/25 shadow-sm backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500" />
            </span>
            <span className="text-xs font-semibold tracking-widest uppercase text-sky-700 dark:text-sky-400">
              Live Tracking · AGI Era 2026
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.1 }} className="text-center max-w-4xl mx-auto mb-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[var(--foreground)] leading-[1.06] tracking-tight mb-6">
            How AI is reshaping{" "}
            <span className="gradient-text">every profession</span>{" "}
            on Earth
          </h1>
          <p className="text-lg sm:text-xl text-[var(--muted-foreground)] max-w-2xl mx-auto leading-relaxed">
            Real-time automation risk data for{" "}
            <strong className="text-[var(--foreground)] font-semibold">{formatNumber(STATS.totalJobs)} workers</strong>{" "}
            across every industry. See where your career stands — and what to do about it.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16">
          <Link href="/professions" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-600 hover:to-indigo-600 text-white font-bold text-sm shadow-lg shadow-sky-500/30 transition-all duration-150 active:scale-95">
            Explore All Professions
            <ArrowRight size={16} weight="bold" />
          </Link>
          <Link href="/survival-guide" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-[var(--border)] bg-[var(--card)]/80 backdrop-blur-sm text-[var(--foreground)] font-bold text-sm hover:bg-[var(--accent)] transition-all duration-150 active:scale-95">
            Survival Guide
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.3 }} className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="flex flex-col items-center text-center p-4 rounded-2xl border border-[var(--card-border)] bg-[var(--card)]/90 backdrop-blur-sm shadow-sm">
                <div className={`w-9 h-9 rounded-xl ${stat.iconBg} flex items-center justify-center mb-2.5`}>
                  <Icon size={18} weight="duotone" color={stat.iconColor} />
                </div>
                <span className={`text-2xl sm:text-3xl font-extrabold tabular-nums ${stat.color}`}>{stat.value}</span>
                <span className="text-[10px] text-[var(--muted-foreground)] mt-1 font-medium leading-tight tracking-wide">{stat.label}</span>
              </div>
            );
          })}
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }} className="text-center text-xs text-[var(--muted-foreground)] mt-5">
          Sources: Oxford University · McKinsey Global Institute · Goldman Sachs · World Economic Forum
        </motion.p>
      </div>
    </section>
  );
}
