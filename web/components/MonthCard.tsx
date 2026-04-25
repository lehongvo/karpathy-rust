"use client";

import Link from "next/link";
import type { MonthPlan } from "@/lib/types";
import { motion } from "framer-motion";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { useEffect, useState } from "react";
import { loadProgress } from "@/lib/progress";

export function MonthCard({ month }: { month: MonthPlan }) {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const p = loadProgress();
    const total = month.tasks.length;
    const done = month.tasks.filter((t) => p.taskDone[t.id]).length;
    setPct(total ? Math.round((done / total) * 100) : 0);
  }, [month]);

  return (
    <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.15 }}>
      <Link href={`/plan/${month.index}`}>
        <Card className="min-w-[260px] cursor-pointer">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-mono text-xs text-white/50">M{String(month.index).padStart(2, "0")}</span>
            <Badge>{month.phase}</Badge>
          </div>
          <h3 className="mb-3 text-lg font-semibold">{month.title}</h3>
          <div className="mb-1 flex items-center justify-between font-mono text-xs text-white/60">
            <span>{month.tasks.length} tasks</span>
            <span>{pct}%</span>
          </div>
          <div className="h-1 overflow-hidden rounded-full bg-white/10">
            <div className="h-full bg-gradient-to-r from-rust to-solana" style={{ width: `${pct}%` }} />
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
