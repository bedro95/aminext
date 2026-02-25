"use client";

import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { industries } from "@/data/industries";
import { IndustryCard } from "@/components/cards/IndustryCard";

export function IndustriesOverview() {
  const featured = industries.slice(0, 6);

  return (
    <section className="py-16 bg-[var(--muted)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)]">Industries Under Pressure</h2>
            <p className="text-[var(--muted-foreground)] mt-2">Which sectors are being transformed fastest by AI</p>
          </div>
          <Link href="/industries" className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-sky-600 dark:text-sky-400 hover:underline">
            All industries <ArrowRight size={14} weight="bold" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featured.map((industry, i) => (
            <motion.div key={industry.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.07 }}>
              <IndustryCard industry={industry} />
            </motion.div>
          ))}
        </div>

        <div className="mt-6 sm:hidden text-center">
          <Link href="/industries" className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-600 dark:text-sky-400 hover:underline">
            See all industries <ArrowRight size={14} weight="bold" />
          </Link>
        </div>
      </div>
    </section>
  );
}
