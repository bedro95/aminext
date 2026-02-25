"use client";

import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";
import { industries } from "@/data/industries";

export function IndustryRadar() {
  const data = industries.slice(0, 7).map((ind) => ({
    subject: ind.name.split(" ")[0],
    score: ind.automationScore,
  }));

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} margin={{ top: 8, right: 20, bottom: 8, left: 20 }}>
          <PolarGrid stroke="currentColor" className="text-slate-200 dark:text-slate-700" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
          />
          <Radar
            name="Automation Risk"
            dataKey="score"
            stroke="#38bdf8"
            fill="#38bdf8"
            fillOpacity={0.15}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
