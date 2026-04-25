import { INITIAL_DECISIONS } from "@/lib/plan-data";
import { DecisionGate } from "@/components/DecisionGate";

export default function DecisionsPage() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="mb-2 text-3xl font-bold">decision log</h1>
        <p className="font-mono text-sm text-white/60">pivot decisions, reasoning, outcomes</p>
      </section>

      <section className="space-y-3">
        {INITIAL_DECISIONS.map((d, i) => (
          <DecisionGate key={i} entry={d} />
        ))}
      </section>

      <section className="rounded-md border border-white/10 bg-white/[0.02] p-5 font-mono text-sm text-white/60">
        <p>
          To add new entries, edit <code className="text-rust">web/lib/plan-data.ts</code> →{" "}
          <code>INITIAL_DECISIONS</code>.
        </p>
        <p className="mt-2">
          See also <code className="text-rust">plan/decision-log.md</code> at repo root.
        </p>
      </section>
    </div>
  );
}
