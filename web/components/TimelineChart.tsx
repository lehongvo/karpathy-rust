"use client";

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import type { MonthPlan, TaskCategory } from "@/lib/types";

const CATS: TaskCategory[] = ["learn", "build", "certify", "apply", "interview-prep", "real-interview"];
const COLORS: Record<TaskCategory, string> = {
  learn: "#CE422B",
  build: "#9945FF",
  certify: "#fbbf24",
  apply: "#10b981",
  "interview-prep": "#3b82f6",
  "real-interview": "#ec4899",
};

export function TimelineChart({ plan }: { plan: MonthPlan[] }) {
  const data = plan.map((m) => {
    const acc: { month: string } & Record<TaskCategory, number> = {
      month: `M${m.index}`,
      learn: 0,
      build: 0,
      certify: 0,
      apply: 0,
      "interview-prep": 0,
      "real-interview": 0,
    };
    for (const t of m.tasks) acc[t.category] += t.hours;
    return acc;
  });

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="month" stroke="#888" tick={{ fontFamily: "monospace", fontSize: 11 }} />
          <YAxis stroke="#888" tick={{ fontFamily: "monospace", fontSize: 11 }} />
          <Tooltip
            contentStyle={{
              background: "#0a0a0a",
              border: "1px solid rgba(255,255,255,0.15)",
              fontFamily: "monospace",
              fontSize: 12,
            }}
          />
          <Legend wrapperStyle={{ fontFamily: "monospace", fontSize: 11 }} />
          {CATS.map((c) => (
            <Bar key={c} dataKey={c} stackId="a" fill={COLORS[c]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
