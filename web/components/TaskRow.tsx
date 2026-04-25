"use client";

import { ExternalLink } from "lucide-react";
import type { Task, TaskStatus } from "@/lib/types";
import { StatusIcon, nextStatus } from "./StatusIcon";
import { cn } from "@/lib/utils";

interface Props {
  task: Task;
  status: TaskStatus;
  onCycle: (next: TaskStatus) => void;
}

export function TaskRow({ task, status, onCycle }: Props) {
  return (
    <div
      className={cn(
        "group flex items-center gap-3 rounded-lg border border-white/[0.05] bg-white/[0.01] px-4 py-3 transition-colors",
        "hover:bg-white/[0.025] hover:border-white/[0.10]"
      )}
    >
      <StatusIcon status={status} onClick={() => onCycle(nextStatus(status))} />
      <div className="min-w-0 flex-1">
        <div
          className={cn(
            "text-[14px] leading-snug",
            status === "done" ? "text-white/40 line-through" : "text-white/85"
          )}
        >
          {task.text}
        </div>
        {task.resourceUrl && (
          <a
            href={task.resourceUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-0.5 inline-flex items-center gap-1 font-mono text-[11px] text-white/35 hover:text-rust"
          >
            <ExternalLink className="h-3 w-3" />
            <span className="truncate">{task.resourceUrl.replace(/^https?:\/\//, "")}</span>
          </a>
        )}
      </div>
      <span className="shrink-0 font-mono text-xs tabular-nums text-white/35">{task.hours}h</span>
    </div>
  );
}
