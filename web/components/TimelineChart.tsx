"use client";

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import type { MonthPlan, TaskCategory } from "@/lib/types";

const CATS: TaskCategory[] = ["learn", "build", "certify", "apply", "interview-prep", "real-interview"];
const COLORS: Record<TaskCategory, string> = {
  learn: "#ce422b",
  build: "#9945ff",
  certify: "#f59e0b",
  apply: "#22c55e",
  "interview-prep": "#3b82f6",
  "real-interview": "#ec4899",
};
const LABELS: Record<TaskCategory, string> = {
  learn: "Learn",
  build: "Build",
  certify: "Certify",
  apply: "Apply",
  "interview-prep": "Prep",
  "real-interview": "Interview",
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
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <XAxis
            dataKey="month"
            stroke="#888"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 11, fill: "rgba(255,255,255,0.5)" }}
          />
          <YAxis
            stroke="#888"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 11, fill: "rgba(255,255,255,0.4)" }}
          />
          <Tooltip
            cursor={{ fill: "rgba(255,255,255,0.03)" }}
            contentStyle={{
              background: "rgba(11, 13, 16, 0.95)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 8,
              fontSize: 12,
              padding: "8px 12px",
            }}
            labelStyle={{ color: "rgba(255,255,255,0.7)", marginBottom: 4 }}
          />
          <Legend
            wrapperStyle={{ fontSize: 11, paddingTop: 8 }}
            formatter={(v) => LABELS[v as TaskCategory] ?? v}
          />
          {CATS.map((c, idx) => (
            <Bar
              key={c}
              dataKey={c}
              name={c}
              stackId="a"
              fill={COLORS[c]}
              radius={idx === CATS.length - 1 ? [4, 4, 0, 0] : 0}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
