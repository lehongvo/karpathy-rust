import { PLAN, PLAN_META } from "@/lib/plan-data";
import { Card, CardTitle, CardValue } from "@/components/ui/card";
import { ProgressTracker } from "@/components/ProgressTracker";
import { PhaseCard } from "@/components/PhaseCard";
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
    <div className="space-y-10">
      <section>
        <p className="mb-2 font-mono text-xs text-white/50">karpathy-rust · 12-month plan</p>
        <h1 className="mb-3 text-4xl font-bold">
          backend → <span className="gradient-text">remote rust/solana</span>
        </h1>
        <p className="font-mono text-sm text-white/60">
          target: ≥ ${PLAN_META.targetMonthlyUSD.toLocaleString()}/mo by {PLAN_META.targetOfferDate} · {remaining} days remaining
        </p>
      </section>

      <section className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Card>
          <CardTitle>Days elapsed</CardTitle>
          <CardValue>{elapsed}</CardValue>
        </Card>
        <Card>
          <CardTitle>Days remaining</CardTitle>
          <CardValue>{remaining}</CardValue>
        </Card>
        <Card>
          <CardTitle>Current month</CardTitle>
          <CardValue>M{String(monthIndex).padStart(2, "0")}</CardValue>
        </Card>
        <Card>
          <CardTitle>Total progress</CardTitle>
          <CardValue>{pctTotal}%</CardValue>
        </Card>
      </section>

      <section>
        <h2 className="mb-4 font-mono text-sm uppercase tracking-wider text-white/60">phases</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {(["foundation", "specialization", "portfolio", "interview"] as const).map((p) => (
            <PhaseCard key={p} phase={p} current={month?.phase === p} />
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <h2 className="mb-4 font-mono text-sm uppercase tracking-wider text-white/60">
            today&apos;s focus · {month?.title}
          </h2>
          <ul className="space-y-2 font-mono text-sm">
            {month?.tasks.slice(0, 4).map((t) => (
              <li key={t.id} className="flex justify-between border-b border-white/5 py-2">
                <span>{t.text}</span>
                <span className="text-white/40">{t.hours}h</span>
              </li>
            ))}
          </ul>
          <Link
            href={`/plan/${monthIndex}`}
            className="mt-3 inline-block font-mono text-sm text-rust hover:underline"
          >
            view month →
          </Link>
        </div>
        <ProgressTracker />
      </section>
    </div>
  );
}
