"use client";

import { useEffect, useState } from "react";
import { loadProgress, exportJSON, resetProgress, incApplications, incInterviews } from "@/lib/progress";
import type { ProgressState } from "@/lib/types";
import { Card, CardTitle, CardValue } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

export default function ProgressPage() {
  const [state, setState] = useState<ProgressState>({
    hoursPerDay: {},
    taskDone: {},
    applicationsSent: 0,
    interviewsReached: 0,
    resourcesStatus: {},
    lastUpdated: new Date().toISOString(),
  });

  useEffect(() => {
    setState(loadProgress());
  }, []);

  const refresh = () => setState(loadProgress());

  const days = Object.keys(state.hoursPerDay).sort();
  const hoursData = days.map((d) => ({ date: d.slice(5), hours: state.hoursPerDay[d] }));
  const totalHours = days.reduce((acc, d) => acc + (state.hoursPerDay[d] ?? 0), 0);
  const tasksDone = Object.values(state.taskDone).filter(Boolean).length;
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
    if (confirm("Reset all progress?")) {
      resetProgress();
      refresh();
    }
  };

  return (
    <div className="space-y-10">
      <section>
        <h1 className="text-3xl font-bold">progress</h1>
      </section>

      <section className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Card>
          <CardTitle>Total hours</CardTitle>
          <CardValue>{totalHours.toFixed(1)}</CardValue>
        </Card>
        <Card>
          <CardTitle>Tasks done</CardTitle>
          <CardValue>{tasksDone}</CardValue>
        </Card>
        <Card>
          <CardTitle>Apps sent</CardTitle>
          <CardValue>{state.applicationsSent}</CardValue>
        </Card>
        <Card>
          <CardTitle>Interviews</CardTitle>
          <CardValue>{state.interviewsReached}</CardValue>
        </Card>
      </section>

      <section className="flex gap-2">
        <Button
          size="sm"
          onClick={() => {
            incApplications(1);
            refresh();
          }}
        >
          + Application
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            incInterviews(1);
            refresh();
          }}
        >
          + Interview
        </Button>
      </section>

      <section>
        <h2 className="mb-4 font-mono text-sm uppercase tracking-wider text-white/60">
          contribution heatmap (study hours)
        </h2>
        <Heatmap days={heatmapDays} />
      </section>

      <section>
        <h2 className="mb-4 font-mono text-sm uppercase tracking-wider text-white/60">hours over time</h2>
        <div className="h-72 w-full">
          <ResponsiveContainer>
            <LineChart data={hoursData}>
              <XAxis dataKey="date" stroke="#888" tick={{ fontFamily: "monospace", fontSize: 10 }} />
              <YAxis stroke="#888" tick={{ fontFamily: "monospace", fontSize: 10 }} />
              <Tooltip
                contentStyle={{
                  background: "#0a0a0a",
                  border: "1px solid rgba(255,255,255,0.15)",
                  fontFamily: "monospace",
                }}
              />
              <Line type="monotone" dataKey="hours" stroke="#CE422B" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="flex gap-2">
        <Button size="sm" variant="outline" onClick={onExport}>
          Export JSON
        </Button>
        <Button size="sm" variant="ghost" onClick={onReset}>
          Reset
        </Button>
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

function Heatmap({ days }: { days: { date: string; hours: number }[] }) {
  const intensity = (h: number) => {
    if (h === 0) return "bg-white/5";
    if (h < 1) return "bg-rust/20";
    if (h < 2) return "bg-rust/40";
    if (h < 3) return "bg-rust/60";
    return "bg-rust";
  };
  const cols: { date: string; hours: number }[][] = [];
  for (let i = 0; i < days.length; i += 7) cols.push(days.slice(i, i + 7));
  return (
    <div className="flex gap-1 overflow-x-auto">
      {cols.map((week, i) => (
        <div key={i} className="flex flex-col gap-1">
          {week.map((d) => (
            <div
              key={d.date}
              title={`${d.date}: ${d.hours}h`}
              className={`h-3 w-3 rounded-sm ${intensity(d.hours)}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
