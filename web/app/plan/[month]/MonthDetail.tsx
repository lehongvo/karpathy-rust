"use client";

import { useEffect, useMemo, useState } from "react";
import type { MonthPlan, TaskCategory, TaskStatus } from "@/lib/types";
import { getTaskStatus, loadProgress, setTaskStatus } from "@/lib/progress";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ProgressBar";
import { WeekGroup } from "@/components/WeekGroup";
import { PageHeader } from "@/components/PageHeader";
import { AlertTriangle, X, ChevronLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const CATS: (TaskCategory | "all")[] = [
  "all",
  "learn",
  "build",
  "certify",
  "apply",
  "interview-prep",
  "real-interview",
];

const LABEL: Record<TaskCategory | "all", string> = {
  all: "All",
  learn: "Learn",
  build: "Build",
  certify: "Certify",
  apply: "Apply",
  "interview-prep": "Prep",
  "real-interview": "Interview",
};

function distributeWeeks(tasks: MonthPlan["tasks"]): Record<1 | 2 | 3 | 4, MonthPlan["tasks"]> {
  const buckets: Record<1 | 2 | 3 | 4, MonthPlan["tasks"]> = { 1: [], 2: [], 3: [], 4: [] };
  tasks.forEach((t, i) => {
    const w = (t.week ?? (((i % 4) + 1) as 1 | 2 | 3 | 4));
    buckets[w].push(t);
  });
  return buckets;
}

export function MonthDetail({ month }: { month: MonthPlan }) {
  const [active, setActive] = useState<TaskCategory | "all">("all");
  const [statuses, setStatuses] = useState<Record<string, TaskStatus>>({});
  const [dismissed, setDismissed] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const p = loadProgress();
    const next: Record<string, TaskStatus> = {};
    for (const t of month.tasks) next[t.id] = getTaskStatus(p, t.id);
    setStatuses(next);
  }, [month]);

  const filteredTasks = useMemo(
    () => (active === "all" ? month.tasks : month.tasks.filter((t) => t.category === active)),
    [month, active]
  );

  const total = month.tasks.length;
  const doneCount = Object.values(statuses).filter((s) => s === "done").length;
  const pct = total ? Math.round((doneCount / total) * 100) : 0;

  const weeks = distributeWeeks(filteredTasks);

  const onCycle = (id: string, next: TaskStatus) => {
    setTaskStatus(id, next);
    setStatuses((prev) => ({ ...prev, [id]: next }));
  };

  return (
    <div className="space-y-10">
      <Link
        href="/plan"
        className="inline-flex items-center gap-1 font-mono text-xs text-white/40 transition-colors hover:text-white"
      >
        <ChevronLeft className="h-3.5 w-3.5" />
        back to plan
      </Link>

      <PageHeader
        eyebrow={`M${String(month.index).padStart(2, "0")} · ${month.phase}`}
        title={month.title}
        subtitle={`${month.hoursBudget}h budget · ${total} tasks across ${
          new Set(month.tasks.map((t) => t.category)).size
        } categories`}
        actions={
          <div className="flex items-center gap-2">
            <Badge variant="default" className="gap-1">
              <span className="tabular-nums">
                {doneCount} / {total}
              </span>
              <span className="text-white/40">done</span>
            </Badge>
          </div>
        }
      />

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_280px]">
        <Card hover>
          <div className="mb-2 flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/40">
              progress
            </span>
            <span className="font-mono text-xs tabular-nums text-white/70">{pct}%</span>
          </div>
          <ProgressBar value={pct} size="md" />
          <p className="mt-4 text-sm leading-relaxed text-white/55">
            Click any status circle to cycle through{" "}
            <span className="text-white/70">todo → doing → done</span>. Progress persists in
            localStorage.
          </p>
        </Card>

        <Card>
          <div className="mb-3 flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/40">
              end-of-month
            </span>
            <CheckCircle2 className="h-4 w-4 text-emerald-400/60" />
          </div>
          <ul className="space-y-1.5 text-xs leading-relaxed">
            {month.endOfMonthCheck.map((c, i) => (
              <li key={i} className="flex gap-2 text-white/65">
                <span className="text-emerald-400/80">✓</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      {month.redFlags.filter((_, i) => !dismissed[`rf-${i}`]).length > 0 && (
        <section className="space-y-2">
          {month.redFlags.map((rf, i) =>
            dismissed[`rf-${i}`] ? null : (
              <div
                key={i}
                className="flex items-start justify-between rounded-lg border border-amber-500/30 bg-amber-500/[0.06] p-3.5"
              >
                <div className="flex gap-2.5 text-sm">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                  <span className="leading-relaxed text-amber-100/90">{rf}</span>
                </div>
                <button
                  onClick={() => setDismissed({ ...dismissed, [`rf-${i}`]: true })}
                  className="text-white/40 transition-colors hover:text-white"
                  aria-label="dismiss"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )
          )}
        </section>
      )}

      <section>
        <div className="mb-5 flex flex-wrap gap-1.5">
          {CATS.map((c) => {
            const count = c === "all" ? total : month.tasks.filter((t) => t.category === c).length;
            if (c !== "all" && count === 0) return null;
            return (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  active === c
                    ? "bg-white/[0.08] text-white ring-1 ring-inset ring-white/15"
                    : "text-white/55 hover:bg-white/[0.04] hover:text-white"
                }`}
              >
                {LABEL[c]}{" "}
                <span className="ml-1 font-mono tabular-nums opacity-50">{count}</span>
              </button>
            );
          })}
        </div>

        {filteredTasks.length === 0 ? (
          <p className="text-sm text-white/40">no tasks in this category</p>
        ) : (
          <div className="space-y-8">
            {([1, 2, 3, 4] as const).map((w) => (
              <WeekGroup
                key={w}
                weekIndex={w}
                tasks={weeks[w]}
                statusOf={(id) => statuses[id] ?? "todo"}
                onCycle={onCycle}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
