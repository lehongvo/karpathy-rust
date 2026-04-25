"use client";

import type { Task, TaskStatus } from "@/lib/types";
import { TaskRow } from "./TaskRow";

interface Props {
  weekIndex: number;
  tasks: Task[];
  statusOf: (id: string) => TaskStatus;
  onCycle: (id: string, next: TaskStatus) => void;
}

export function WeekGroup({ weekIndex, tasks, statusOf, onCycle }: Props) {
  if (tasks.length === 0) return null;
  return (
    <section>
      <div className="mb-3 flex items-center gap-3">
        <h3 className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/40">
          Week {weekIndex}
        </h3>
        <div className="h-px flex-1 bg-white/[0.06]" />
        <span className="font-mono text-[11px] tabular-nums text-white/30">
          {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
        </span>
      </div>
      <div className="space-y-2">
        {tasks.map((t) => (
          <TaskRow
            key={t.id}
            task={t}
            status={statusOf(t.id)}
            onCycle={(n) => onCycle(t.id, n)}
          />
        ))}
      </div>
    </section>
  );
}
