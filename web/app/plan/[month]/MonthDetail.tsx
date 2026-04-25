"use client";

import { useEffect, useState } from "react";
import type { MonthPlan, TaskCategory } from "@/lib/types";
import { loadProgress, toggleTask } from "@/lib/progress";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, X } from "lucide-react";
import Link from "next/link";

const CATS: TaskCategory[] = [
  "learn",
  "build",
  "certify",
  "apply",
  "interview-prep",
  "real-interview",
];

const LABEL: Record<TaskCategory, string> = {
  learn: "LEARN",
  build: "BUILD",
  certify: "CERTIFY",
  apply: "APPLY",
  "interview-prep": "INTERVIEW PREP",
  "real-interview": "REAL INTERVIEW",
};

export function MonthDetail({ month }: { month: MonthPlan }) {
  const [active, setActive] = useState<TaskCategory>("learn");
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [dismissed, setDismissed] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setDone(loadProgress().taskDone);
  }, []);

  const tasks = month.tasks.filter((t) => t.category === active);
  const total = month.tasks.length;
  const doneCount = month.tasks.filter((t) => done[t.id]).length;
  const pct = total ? Math.round((doneCount / total) * 100) : 0;

  return (
    <div className="space-y-8">
      <section>
        <Link
          href="/plan"
          className="mb-3 inline-block font-mono text-xs text-white/50 hover:text-white"
        >
          ← back to plan
        </Link>
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-sm text-white/50">M{String(month.index).padStart(2, "0")}</span>
          <h1 className="text-3xl font-bold">{month.title}</h1>
          <Badge>{month.phase}</Badge>
        </div>
        <div className="mt-3 max-w-md">
          <div className="mb-1 flex justify-between font-mono text-xs text-white/60">
            <span>
              {doneCount} / {total} tasks
            </span>
            <span>{pct}%</span>
          </div>
          <div className="h-1 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full bg-gradient-to-r from-rust to-solana transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </section>

      {month.redFlags.filter((_, i) => !dismissed[`rf-${i}`]).length > 0 && (
        <section className="space-y-2">
          {month.redFlags.map((rf, i) =>
            dismissed[`rf-${i}`] ? null : (
              <div
                key={i}
                className="flex items-start justify-between rounded-md border border-rust/40 bg-rust/10 p-3"
              >
                <div className="flex gap-2 font-mono text-sm">
                  <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-rust" />
                  <span>{rf}</span>
                </div>
                <button
                  onClick={() => setDismissed({ ...dismissed, [`rf-${i}`]: true })}
                  className="text-white/50 hover:text-white"
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
        <div className="mb-4 flex flex-wrap gap-2">
          {CATS.map((c) => {
            const count = month.tasks.filter((t) => t.category === c).length;
            return (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`rounded-md px-3 py-1.5 font-mono text-xs uppercase transition-colors ${
                  active === c
                    ? "bg-rust text-white"
                    : "border border-white/15 text-white/70 hover:bg-white/5"
                }`}
              >
                {LABEL[c]} <span className="ml-1 opacity-60">{count}</span>
              </button>
            );
          })}
        </div>

        {tasks.length === 0 ? (
          <p className="font-mono text-sm text-white/40">no tasks in this category</p>
        ) : (
          <div className="space-y-2">
            {tasks.map((t) => (
              <Card key={t.id} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={!!done[t.id]}
                  onChange={() => {
                    const next = toggleTask(t.id);
                    setDone({ ...next.taskDone });
                  }}
                  className="h-4 w-4 accent-rust"
                  aria-label={t.text}
                />
                <div className="flex-1">
                  <div className={done[t.id] ? "text-white/40 line-through" : ""}>{t.text}</div>
                  {t.resourceUrl && (
                    <a
                      href={t.resourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-xs text-rust hover:underline"
                    >
                      {t.resourceUrl}
                    </a>
                  )}
                </div>
                <span className="font-mono text-xs text-white/40">{t.hours}h</span>
              </Card>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-3 font-mono text-sm uppercase tracking-wider text-white/60">
          end-of-month checklist
        </h2>
        <ul className="space-y-1 font-mono text-sm">
          {month.endOfMonthCheck.map((c, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-emerald-400">✓</span>
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
