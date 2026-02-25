"use client";

import { useState, useMemo } from "react";
import { professions } from "@/data/professions";
import { ProfessionCard } from "@/components/cards/ProfessionCard";
import { SearchInput } from "@/components/ui/SearchInput";
import { getRiskLevel } from "@/lib/utils";

const INDUSTRIES = ["All", ...Array.from(new Set(professions.map((p) => p.industry))).sort()];
const RISK_FILTERS = ["All", "Critical (80-100%)", "High (60-79%)", "Medium (40-59%)", "Low (0-39%)"];

export default function ProfessionsPage() {
  const [search, setSearch] = useState("");
  const [industryFilter, setIndustryFilter] = useState("All");
  const [riskFilter, setRiskFilter] = useState("All");
  const [sortBy, setSortBy] = useState<"score-desc" | "score-asc" | "name">("score-desc");

  const filtered = useMemo(() => {
    let result = professions;

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.industry.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (industryFilter !== "All") {
      result = result.filter((p) => p.industry === industryFilter);
    }

    if (riskFilter !== "All") {
      result = result.filter((p) => {
        const lvl = getRiskLevel(p.automationScore);
        if (riskFilter.startsWith("Critical")) return lvl === "critical";
        if (riskFilter.startsWith("High")) return lvl === "high";
        if (riskFilter.startsWith("Medium")) return lvl === "medium";
        if (riskFilter.startsWith("Low")) return lvl === "low";
        return true;
      });
    }

    if (sortBy === "score-desc") result = [...result].sort((a, b) => b.automationScore - a.automationScore);
    else if (sortBy === "score-asc") result = [...result].sort((a, b) => a.automationScore - b.automationScore);
    else result = [...result].sort((a, b) => a.title.localeCompare(b.title));

    return result;
  }, [search, industryFilter, riskFilter, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--foreground)] mb-3">
          All Professions
        </h1>
        <p className="text-lg text-[var(--muted-foreground)] max-w-2xl">
          Browse automation risk data for {professions.length}+ professions. Understand your exposure,
          your timeline, and your survival strategy.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 space-y-4">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search professions, industries..."
          className="max-w-md"
        />

        <div className="flex flex-wrap gap-3">
          {/* Industry filter */}
          <div className="flex flex-wrap gap-1.5">
            {INDUSTRIES.slice(0, 6).map((ind) => (
              <button
                key={ind}
                onClick={() => setIndustryFilter(ind)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  industryFilter === ind
                    ? "bg-sky-500 text-white dark:bg-sky-400 dark:text-slate-900"
                    : "bg-[var(--accent)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                }`}
              >
                {ind}
              </button>
            ))}
          </div>

          {/* Risk filter */}
          <div className="flex flex-wrap gap-1.5">
            {RISK_FILTERS.map((rf) => (
              <button
                key={rf}
                onClick={() => setRiskFilter(rf)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  riskFilter === rf
                    ? "bg-[var(--foreground)] text-[var(--background)]"
                    : "bg-[var(--accent)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                }`}
              >
                {rf}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[var(--accent)] text-[var(--muted-foreground)] border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-sky-500/40"
          >
            <option value="score-desc">Highest Risk First</option>
            <option value="score-asc">Lowest Risk First</option>
            <option value="name">A–Z</option>
          </select>
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-[var(--muted-foreground)] mb-5">
        Showing <strong className="text-[var(--foreground)]">{filtered.length}</strong> professions
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-[var(--muted-foreground)]">
          <p className="text-5xl mb-4">🔍</p>
          <p className="text-lg font-medium">No professions found</p>
          <p className="text-sm mt-2">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((profession) => (
            <ProfessionCard key={profession.id} profession={profession} />
          ))}
        </div>
      )}
    </div>
  );
}
