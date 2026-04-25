import type { DecisionEntry } from "@/lib/types";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

export function DecisionGate({ entry }: { entry: DecisionEntry }) {
  return (
    <Card>
      <div className="mb-2 flex items-center justify-between">
        <Badge>{entry.date}</Badge>
        {entry.outcome && (
          <Badge className="border-emerald-400/40 text-emerald-300">{entry.outcome}</Badge>
        )}
      </div>
      <p className="mb-2 text-sm text-white/70">{entry.context}</p>
      <p className="font-mono text-sm">→ {entry.choice}</p>
    </Card>
  );
}
