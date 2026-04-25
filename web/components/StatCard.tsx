import type { LucideIcon } from "lucide-react";
import { Card, CardLabel, CardValue } from "./ui/card";
import { cn } from "@/lib/utils";

interface Props {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  delta?: string;
  hint?: string;
  className?: string;
}

export function StatCard({ label, value, icon: Icon, delta, hint, className }: Props) {
  return (
    <Card className={cn("p-5", className)}>
      <div className="mb-3 flex items-center justify-between">
        <CardLabel>{label}</CardLabel>
        {Icon && <Icon className="h-4 w-4 text-white/30" />}
      </div>
      <CardValue className="text-2xl">{value}</CardValue>
      {(delta || hint) && (
        <div className="mt-1.5 font-mono text-[11px] text-white/40">
          {delta && <span className="text-emerald-400">{delta}</span>}
          {delta && hint && <span className="mx-1">·</span>}
          {hint}
        </div>
      )}
    </Card>
  );
}
