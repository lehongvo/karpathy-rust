import { PLAN } from "@/lib/plan-data";
import { MonthCard } from "@/components/MonthCard";
import { TimelineChart } from "@/components/TimelineChart";
import { ParallelTracks } from "@/components/ParallelTracks";

export default function PlanPage() {
  return (
    <div className="space-y-10">
      <section>
        <h1 className="mb-2 text-3xl font-bold">12-month plan</h1>
        <p className="font-mono text-sm text-white/60">scroll horizontally · click a month to drill in</p>
      </section>

      <section>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {PLAN.map((m) => (
            <MonthCard key={m.index} month={m} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 font-mono text-sm uppercase tracking-wider text-white/60">
          hours by category × month
        </h2>
        <TimelineChart plan={PLAN} />
      </section>

      <section>
        <h2 className="mb-4 font-mono text-sm uppercase tracking-wider text-white/60">parallel tracks</h2>
        <ParallelTracks />
      </section>
    </div>
  );
}
