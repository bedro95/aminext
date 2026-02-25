"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface TrendLineProps {
  currentScore: number;
  title: string;
}

// Generate projected automation scores based on current score
function generateProjection(current: number) {
  const base2020 = Math.max(current - 35, 5);
  const base2022 = Math.max(current - 22, 8);
  const base2023 = Math.max(current - 14, 10);
  const base2024 = Math.max(current - 7, current * 0.88);

  return [
    { year: "2020", score: Math.round(base2020) },
    { year: "2022", score: Math.round(base2022) },
    { year: "2023", score: Math.round(base2023) },
    { year: "2024", score: Math.round(base2024) },
    { year: "2025", score: current },
    { year: "2027", score: Math.min(Math.round(current + (100 - current) * 0.12), 100) },
    { year: "2030", score: Math.min(Math.round(current + (100 - current) * 0.22), 100) },
  ];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--card)] shadow-lg">
        <p className="text-xs font-medium text-[var(--foreground)]">{label}</p>
        <p className="text-sm font-bold text-sky-500">{payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

export function TrendLine({ currentScore }: TrendLineProps) {
  const data = generateProjection(currentScore);

  return (
    <div className="w-full h-52">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 8, bottom: 8, left: -16 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-slate-100 dark:text-slate-800" />
          <XAxis
            dataKey="year"
            tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}%`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#38bdf8"
            strokeWidth={2.5}
            dot={{ fill: "#38bdf8", strokeWidth: 0, r: 4 }}
            activeDot={{ r: 6, fill: "#38bdf8" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
