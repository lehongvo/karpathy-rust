"use client";

import { useEffect, useState } from "react";
import { loadProgress, logHours, exportJSON, resetProgress, streak } from "@/lib/progress";
import { Button } from "./ui/button";
import { Card, CardTitle } from "./ui/card";

export function ProgressTracker() {
  const [today, setToday] = useState("");
  const [hours, setHours] = useState(0);
  const [streakDays, setStreakDays] = useState(0);

  useEffect(() => {
    const t = new Date().toISOString().slice(0, 10);
    setToday(t);
    const p = loadProgress();
    setHours(p.hoursPerDay[t] ?? 0);
    setStreakDays(streak());
  }, []);

  const save = (h: number) => {
    setHours(h);
    logHours(today, h);
    setStreakDays(streak());
  };

  const onExport = () => {
    const blob = new Blob([exportJSON()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `karpathy-rust-progress-${today}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const onReset = () => {
    if (confirm("Reset all progress? Cannot undo.")) {
      resetProgress();
      window.location.reload();
    }
  };

  return (
    <Card>
      <CardTitle>Today · {today}</CardTitle>
      <div className="mt-4 flex items-center gap-3">
        <input
          type="number"
          min={0}
          max={24}
          step={0.5}
          value={hours}
          onChange={(e) => save(Number(e.target.value))}
          className="w-24 rounded-md border border-white/15 bg-transparent px-3 py-2 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-rust"
        />
        <span className="font-mono text-sm text-white/60">hours studied</span>
      </div>
      <div className="mt-3 font-mono text-xs text-white/60">streak: {streakDays} days</div>
      <div className="mt-5 flex gap-2">
        <Button size="sm" variant="outline" onClick={onExport}>
          Export JSON
        </Button>
        <Button size="sm" variant="ghost" onClick={onReset}>
          Reset
        </Button>
      </div>
    </Card>
  );
}
