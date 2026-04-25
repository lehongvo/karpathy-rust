import { INITIAL_DECISIONS } from "@/lib/plan-data";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function DecisionsPage() {
  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="reasoning"
        title="Decision log"
        subtitle="Pivot decisions with context, choice, and outcome. Append-only — past decisions stay even when reversed (history matters)."
      />

      <section className="relative">
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-rust/40 via-white/10 to-transparent md:left-[11px]" />
        <ol className="space-y-4">
          {INITIAL_DECISIONS.map((d, i) => (
            <li key={i} className="relative pl-8 md:pl-10">
              <div className="absolute left-0 top-3 h-3.5 w-3.5 rounded-full bg-rust ring-4 ring-[var(--color-bg)] md:left-1 md:h-4 md:w-4" />
              <Card hover>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <span className="font-mono text-xs tabular-nums text-white/45">{d.date}</span>
                  {d.outcome && (
                    <Badge variant={d.outcome.toLowerCase().includes("pending") ? "warning" : "success"}>
                      {d.outcome}
                    </Badge>
                  )}
                </div>
                <p className="text-sm leading-relaxed text-white/65">{d.context}</p>
                <p className="mt-3 border-l-2 border-rust/40 pl-3 text-sm font-medium leading-relaxed text-white/90">
                  {d.choice}
                </p>
              </Card>
            </li>
          ))}
        </ol>
      </section>

      <section className="rounded-xl border border-white/[0.07] bg-white/[0.015] p-5 text-sm leading-relaxed text-white/55">
        <p>
          To add new entries, edit{" "}
          <code className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-xs text-rust">
            web/lib/plan-data.ts
          </code>{" "}
          → <code className="font-mono text-xs">INITIAL_DECISIONS</code>.
        </p>
        <p className="mt-2 text-white/40">
          See also{" "}
          <code className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-xs">
            plan/decision-log.md
          </code>{" "}
          at repo root.
        </p>
      </section>
    </div>
  );
}
