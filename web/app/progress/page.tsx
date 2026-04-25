"use client";

import { useEffect, useState } from "react";
import {
  loadProgress,
  exportJSON,
  resetProgress,
  incApplications,
  incInterviews,
  streak,
} from "@/lib/progress";
import type { ProgressState } from "@/lib/types";
import { PageHeader } from "@/components/PageHeader";
import { StatCard } from "@/components/StatCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle2, Send, MessageSquare, Flame, Download, RotateCcw } from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function ProgressPage() {
  const [state, setState] = useState<ProgressState>({
    hoursPerDay: {},
    taskDone: {},
    taskStatus: {},
    applicationsSent: 0,
    interviewsReached: 0,
    resourcesStatus: {},
    lastUpdated: new Date().toISOString(),
  });
  const [streakDays, setStreakDays] = useState(0);

  useEffect(() => {
    setState(loadProgress());
    setStreakDays(streak());
  }, []);

  const refresh = () => {
    setState(loadProgress());
    setStreakDays(streak());
  };

  const days = Object.keys(state.hoursPerDay).sort();
  const hoursData = days.map((d) => ({ date: d.slice(5), hours: state.hoursPerDay[d] }));
  const totalHours = days.reduce((acc, d) => acc + (state.hoursPerDay[d] ?? 0), 0);
  const tasksDone = Object.values(state.taskStatus).filter((s) => s === "done").length;
  const heatmapDays = generateHeatmap(state.hoursPerDay);

  const onExport = () => {
    const blob = new Blob([exportJSON()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `progress-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const onReset = () => {
    if (confirm("Reset all progress? This cannot be undone.")) {
      resetProgress();
      refresh();
    }
  };

  return (
    <div className="space-y-12">
      <PageHeader
        eyebrow="tracking"
        title="Progress"
        subtitle="Daily study hours, task completion, application funnel. Stored in localStorage — export to back up."
        actions={
          <>
            <Button size="sm" variant="outline" onClick={onExport}>
              <Download className="h-3.5 w-3.5" />
              Export
            </Button>
            <Button size="sm" variant="ghost" onClick={onReset}>
              <RotateCcw className="h-3.5 w-3.5" />
              Reset
            </Button>
          </>
        }
      />

      <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard
          label="Total hours"
          value={totalHours.toFixed(1)}
          icon={Clock}
          hint={`${days.length} active days`}
        />
        <StatCard label="Tasks done" value={tasksDone} icon={CheckCircle2} />
        <StatCard label="Apps sent" value={state.applicationsSent} icon={Send} />
        <StatCard label="Interviews" value={state.interviewsReached} icon={MessageSquare} />
      </section>

      <section className="flex flex-wrap items-center gap-2">
        <Button
          size="sm"
          variant="primary"
          onClick={() => {
            incApplications(1);
            refresh();
          }}
        >
          + Application
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => {
            incInterviews(1);
            refresh();
          }}
        >
          + Interview
        </Button>
        {streakDays > 0 && (
          <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-rust/10 px-2.5 py-1 font-mono text-xs text-rust ring-1 ring-rust/25">
            <Flame className="h-3.5 w-3.5" />
            <span className="tabular-nums">{streakDays}-day streak</span>
          </span>
        )}
      </section>

      <section>
        <h2 className="mb-4 text-base font-semibold tracking-tight">Contribution heatmap</h2>
        <Card className="!p-5">
          <Heatmap days={heatmapDays} />
          <div className="mt-4 flex items-center justify-end gap-2 font-mono text-[10px] text-white/40">
            <span>less</span>
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className={`h-2.5 w-2.5 rounded-sm ${intensityClass(i)}`} />
              ))}
            </div>
            <span>more</span>
          </div>
        </Card>
      </section>

      <section>
        <h2 className="mb-4 text-base font-semibold tracking-tight">Hours over time</h2>
        <Card className="!p-4">
          <div className="h-72 w-full">
            <ResponsiveContainer>
              <AreaChart data={hoursData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="hoursGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ce422b" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#ce422b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis
                  dataKey="date"
                  stroke="#888"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 10, fill: "rgba(255,255,255,0.4)" }}
                />
                <YAxis
                  stroke="#888"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 10, fill: "rgba(255,255,255,0.4)" }}
                />
                <Tooltip
                  cursor={{ stroke: "rgba(206,66,43,0.3)" }}
                  contentStyle={{
                    background: "rgba(11, 13, 16, 0.95)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 8,
                    fontSize: 12,
                    padding: "8px 12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="hours"
                  stroke="#ce422b"
                  strokeWidth={2}
                  fill="url(#hoursGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </section>
    </div>
  );
}

function generateHeatmap(hoursPerDay: Record<string, number>): { date: string; hours: number }[] {
  const out: { date: string; hours: number }[] = [];
  const today = new Date();
  for (let i = 364; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    out.push({ date: key, hours: hoursPerDay[key] ?? 0 });
  }
  return out;
}

function intensityClass(level: number): string {
  if (level === 0) return "bg-white/[0.04]";
  if (level === 1) return "bg-rust/25";
  if (level === 2) return "bg-rust/45";
  if (level === 3) return "bg-rust/65";
  return "bg-rust";
}

function intensityFor(h: number): number {
  if (h === 0) return 0;
  if (h < 1) return 1;
  if (h < 2) return 2;
  if (h < 3) return 3;
  return 4;
}

function Heatmap({ days }: { days: { date: string; hours: number }[] }) {
  const cols: { date: string; hours: number }[][] = [];
  for (let i = 0; i < days.length; i += 7) cols.push(days.slice(i, i + 7));
  return (
    <div className="flex gap-[3px] overflow-x-auto pb-1">
      {cols.map((week, i) => (
        <div key={i} className="flex flex-col gap-[3px]">
          {week.map((d) => (
            <div
              key={d.date}
              title={`${d.date}: ${d.hours}h`}
              className={`h-3 w-3 rounded-sm transition-colors ${intensityClass(intensityFor(d.hours))}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
