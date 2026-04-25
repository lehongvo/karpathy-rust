import { PLAN } from "@/lib/plan-data";
import { MonthCard } from "@/components/MonthCard";
import { TimelineChart } from "@/components/TimelineChart";
import { ParallelTracks } from "@/components/ParallelTracks";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";

export default function PlanPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        eyebrow="strategy"
        title="12-month plan"
        subtitle="Click any month to drill into tasks. Every task costs roughly 60 hours total budget per month."
      />

      <section>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {PLAN.map((m) => (
            <MonthCard key={m.index} month={m} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-base font-semibold tracking-tight">Hours by category × month</h2>
        <Card className="!p-4">
          <TimelineChart plan={PLAN} />
        </Card>
      </section>

      <section>
        <h2 className="mb-4 text-base font-semibold tracking-tight">Parallel tracks</h2>
        <ParallelTracks />
      </section>
    </div>
  );
}
