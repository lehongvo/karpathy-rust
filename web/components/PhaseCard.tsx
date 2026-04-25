import type { Phase } from "@/lib/types";
import { Card, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

const META: Record<Phase, { label: string; months: string; ring: string }> = {
  foundation: { label: "Foundation", months: "M1–M3", ring: "border-rust/40" },
  specialization: { label: "Specialization", months: "M4–M6", ring: "border-amber-400/40" },
  portfolio: { label: "Portfolio", months: "M7–M9", ring: "border-solana/40" },
  interview: { label: "Interview & Land", months: "M10–M12", ring: "border-emerald-400/40" },
};

export function PhaseCard({ phase, current }: { phase: Phase; current: boolean }) {
  const meta = META[phase];
  return (
    <Card className={`${meta.ring} ${current ? "ring-1 ring-rust" : ""}`}>
      <CardHeader>
        <CardTitle>{meta.label}</CardTitle>
        {current && <Badge className="border-rust/60 text-rust">CURRENT</Badge>}
      </CardHeader>
      <div className="font-mono text-xs text-white/60">{meta.months}</div>
    </Card>
  );
}
