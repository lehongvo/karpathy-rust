import { PLAN, PLAN_META } from "@/lib/plan-data";
import { PageHeader } from "@/components/PageHeader";
import { StatCard } from "@/components/StatCard";
import { ProgressBar } from "@/components/ProgressBar";
import { ProgressTracker } from "@/components/ProgressTracker";
import { PhaseCard } from "@/components/PhaseCard";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Target, Clock, ChevronRight } from "lucide-react";
import Link from "next/link";

function daysBetween(a: string, b: string): number {
  return Math.max(0, Math.floor((new Date(b).getTime() - new Date(a).getTime()) / 86400000));
}

function currentMonthIndex(): number {
  const start = new Date(PLAN_META.startDate).getTime();
  const now = Date.now();
  if (now < start) return 1;
  const months = Math.floor((now - start) / (1000 * 60 * 60 * 24 * 30));
  return Math.min(12, Math.max(1, months + 1));
}

export default function Home() {
  const today = new Date().toISOString().slice(0, 10);
  const elapsed = daysBetween(PLAN_META.startDate, today);
  const remaining = daysBetween(today, PLAN_META.targetOfferDate);
  const totalDays = daysBetween(PLAN_META.startDate, PLAN_META.targetOfferDate) || 1;
  const pctTotal = Math.min(100, Math.round((elapsed / totalDays) * 100));
  const monthIndex = currentMonthIndex();
  const month = PLAN[monthIndex - 1];

  return (
    <div className="space-y-12">
      <section className="gradient-bg-subtle -mx-6 -mt-10 px-6 pb-2 pt-10 md:-mx-0 md:rounded-2xl md:p-10">
        <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.12em] text-white/40">
          12-month plan · ${PLAN_META.targetMonthlyUSD.toLocaleString()}/mo target
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
          backend → <span className="gradient-text">remote rust/solana</span>
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/55">
          Minimal, education-first plan. Track daily progress, ship 2 Solana programs,
          land remote offer ≥ ${PLAN_META.targetMonthlyUSD.toLocaleString()}/month by{" "}
          <span className="font-mono">{PLAN_META.targetOfferDate}</span>.
        </p>

        <div className="mt-8 max-w-md">
          <div className="mb-2 flex items-center justify-between font-mono text-xs">
            <span className="text-white/50">overall progress</span>
            <span className="tabular-nums text-white/80">
              {elapsed} / {totalDays} days · {pctTotal}%
            </span>
          </div>
          <ProgressBar value={pctTotal} size="md" />
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Day" value={elapsed} icon={Calendar} hint={`of ${totalDays}`} />
        <StatCard label="Days left" value={remaining} icon={Clock} />
        <StatCard
          label="Current month"
          value={`M${String(monthIndex).padStart(2, "0")}`}
          icon={Target}
          hint={month?.title}
        />
        <StatCard label="Progress" value={`${pctTotal}%`} hint="elapsed" />
      </section>

      <section>
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold tracking-tight">Phases</h2>
          <Link
            href="/plan"
            className="inline-flex items-center gap-1 font-mono text-xs text-white/50 transition-colors hover:text-white"
          >
            view full plan <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
          {(["foundation", "specialization", "portfolio", "interview"] as const).map((p) => (
            <PhaseCard key={p} phase={p} current={month?.phase === p} />
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
        <Card hover className="!p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/40">
                this month · M{String(monthIndex).padStart(2, "0")}
              </p>
              <h2 className="mt-1 text-xl font-semibold tracking-tight">{month?.title}</h2>
            </div>
            <Badge variant="rust">{month?.phase}</Badge>
          </div>
          <ul className="divide-y divide-white/[0.05]">
            {month?.tasks.slice(0, 5).map((t) => (
              <li key={t.id} className="flex items-center justify-between py-2.5 text-sm">
                <span className="text-white/80">{t.text}</span>
                <span className="font-mono text-xs text-white/35">{t.hours}h</span>
              </li>
            ))}
          </ul>
          <Link
            href={`/plan/${monthIndex}`}
            className="mt-5 inline-flex items-center gap-1 text-sm text-rust hover:underline"
          >
            view month details <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </Card>
        <ProgressTracker />
      </section>
    </div>
  );
}
