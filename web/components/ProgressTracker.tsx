"use client";

import { useEffect, useState } from "react";
import { loadProgress, logHours, exportJSON, resetProgress, streak } from "@/lib/progress";
import { Button } from "./ui/button";
import { Card, CardLabel } from "./ui/card";
import { Badge } from "./ui/badge";
import { Flame, Download, RotateCcw } from "lucide-react";

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
    <Card hover>
      <div className="mb-4 flex items-center justify-between">
        <CardLabel>Today · {today}</CardLabel>
        {streakDays > 0 && (
          <Badge variant="rust" className="gap-1">
            <Flame className="h-3 w-3" />
            <span className="tabular-nums">{streakDays}d</span>
          </Badge>
        )}
      </div>

      <div className="mb-1 flex items-baseline gap-2">
        <input
          type="number"
          min={0}
          max={24}
          step={0.5}
          value={hours}
          onChange={(e) => save(Number(e.target.value))}
          className="w-20 rounded-md border border-white/10 bg-white/[0.02] px-2.5 py-1.5 font-mono text-2xl font-semibold tabular-nums focus:border-rust/50 focus:outline-none focus:ring-2 focus:ring-rust/20"
        />
        <span className="text-sm text-white/50">hours studied</span>
      </div>

      <div className="mt-5 flex gap-2">
        <Button size="sm" variant="outline" onClick={onExport}>
          <Download className="h-3.5 w-3.5" />
          Export
        </Button>
        <Button size="sm" variant="ghost" onClick={onReset}>
          <RotateCcw className="h-3.5 w-3.5" />
          Reset
        </Button>
      </div>
    </Card>
  );
}
