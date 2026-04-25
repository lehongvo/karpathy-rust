"use client";

import Link from "next/link";
import type { MonthPlan } from "@/lib/types";
import { motion } from "framer-motion";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ProgressBar } from "./ProgressBar";
import { useEffect, useState } from "react";
import { getTaskStatus, loadProgress } from "@/lib/progress";

const PHASE_VARIANT: Record<MonthPlan["phase"], "rust" | "warning" | "solana" | "success"> = {
  foundation: "rust",
  specialization: "warning",
  portfolio: "solana",
  interview: "success",
};

export function MonthCard({ month }: { month: MonthPlan }) {
  const [pct, setPct] = useState(0);
  const [doneCount, setDoneCount] = useState(0);

  useEffect(() => {
    const p = loadProgress();
    const total = month.tasks.length;
    const done = month.tasks.filter((t) => getTaskStatus(p, t.id) === "done").length;
    setDoneCount(done);
    setPct(total ? Math.round((done / total) * 100) : 0);
  }, [month]);

  return (
    <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.15 }}>
      <Link href={`/plan/${month.index}`} className="block">
        <Card hover className="!p-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/40">
              M{String(month.index).padStart(2, "0")}
            </span>
            <Badge variant={PHASE_VARIANT[month.phase]}>{month.phase}</Badge>
          </div>
          <h3 className="mb-4 text-base font-semibold tracking-tight text-white">{month.title}</h3>
          <div className="mb-1.5 flex items-center justify-between font-mono text-[11px] tabular-nums text-white/45">
            <span>
              {doneCount} / {month.tasks.length} tasks
            </span>
            <span>{pct}%</span>
          </div>
          <ProgressBar value={pct} />
        </Card>
      </Link>
    </motion.div>
  );
}
