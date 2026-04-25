import type { Phase } from "@/lib/types";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

const META: Record<
  Phase,
  { label: string; months: string; accent: string; description: string }
> = {
  foundation: {
    label: "Foundation",
    months: "M1–M3",
    accent: "from-rust/40 via-rust/10 to-transparent",
    description: "Rust mastery, Anchor basics, first OSS PR",
  },
  specialization: {
    label: "Specialization",
    months: "M4–M6",
    accent: "from-amber-400/40 via-amber-400/10 to-transparent",
    description: "2 Solana programs devnet, niche pivot",
  },
  portfolio: {
    label: "Portfolio",
    months: "M7–M9",
    accent: "from-solana/40 via-solana/10 to-transparent",
    description: "Mainnet program, 5+ OSS PR, brand 1K",
  },
  interview: {
    label: "Interview & Land",
    months: "M10–M12",
    accent: "from-emerald-400/40 via-emerald-400/10 to-transparent",
    description: "Apply 5–10/week, offer ≥ $5K/mo",
  },
};

export function PhaseCard({ phase, current }: { phase: Phase; current: boolean }) {
  const meta = META[phase];
  return (
    <Card
      hover
      className={cn(
        "relative overflow-hidden !p-5",
        current && "ring-1 ring-rust/40"
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r",
          meta.accent
        )}
      />
      <div className="mb-2 flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/40">
          {meta.months}
        </span>
        {current && <Badge variant="rust">Now</Badge>}
      </div>
      <h3 className="mb-1.5 text-base font-semibold tracking-tight">{meta.label}</h3>
      <p className="text-xs leading-relaxed text-white/50">{meta.description}</p>
    </Card>
  );
}
