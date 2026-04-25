"use client";

import { Circle, CircleDot, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TaskStatus } from "@/lib/types";

interface Props {
  status: TaskStatus;
  className?: string;
  onClick?: () => void;
}

export function StatusIcon({ status, className, onClick }: Props) {
  const Icon = status === "done" ? CheckCircle2 : status === "doing" ? CircleDot : Circle;
  const color =
    status === "done"
      ? "text-emerald-400"
      : status === "doing"
      ? "text-rust"
      : "text-white/30";
  const props = {
    className: cn("h-[18px] w-[18px] shrink-0 transition-colors", color, className),
    "aria-label": `status ${status}`,
  };
  if (onClick) {
    return (
      <button onClick={onClick} className="rounded-full transition-transform hover:scale-110" type="button">
        <Icon {...props} />
      </button>
    );
  }
  return <Icon {...props} />;
}

export function nextStatus(s: TaskStatus): TaskStatus {
  return s === "todo" ? "doing" : s === "doing" ? "done" : "todo";
}
