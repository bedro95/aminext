"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { getRiskLabel, getRiskColor } from "@/lib/utils";

interface AutomationGaugeProps {
  score: number;
}

export function AutomationGauge({ score }: AutomationGaugeProps) {
  const data = [
    { value: score },
    { value: 100 - score },
  ];

  const getColor = (s: number) => {
    if (s >= 80) return "#ef4444";
    if (s >= 60) return "#f97316";
    if (s >= 40) return "#eab308";
    return "#10b981";
  };

  const color = getColor(score);

  return (
    <div className="relative flex flex-col items-center justify-center">
      <div className="w-48 h-48 sm:w-56 sm:h-56">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              startAngle={180}
              endAngle={0}
              innerRadius="65%"
              outerRadius="85%"
              dataKey="value"
              strokeWidth={0}
            >
              <Cell fill={color} />
              <Cell fill="currentColor" className="text-slate-100 dark:text-slate-800 fill-current" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      {/* Center text */}
      <div className="absolute flex flex-col items-center justify-center" style={{ top: "38%", left: "50%", transform: "translate(-50%, -50%)" }}>
        <span className="text-4xl font-extrabold tabular-nums" style={{ color }}>{score}%</span>
        <span className="text-xs text-[var(--muted-foreground)] mt-0.5">Automation Risk</span>
      </div>
      <p className="text-sm font-semibold mt-2" style={{ color }}>{getRiskLabel(score)}</p>
    </div>
  );
}
