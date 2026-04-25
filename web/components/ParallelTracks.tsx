import { Code2, Edit3, GitPullRequest, RefreshCw, Users } from "lucide-react";
import { Card, CardLabel } from "./ui/card";

const tracks = [
  { name: "Daily Code", cadence: "≥5 days/week", hours: "10–14h", icon: Code2 },
  { name: "Weekly Blog", cadence: "1 post/week", hours: "1–2h", icon: Edit3 },
  { name: "Monthly OSS PR", cadence: "≥1 PR/month", hours: "2–3h", icon: GitPullRequest },
  { name: "Quarterly Review", cadence: "Q1–Q4", hours: "4h/quarter", icon: RefreshCw },
  { name: "Networking", cadence: "5 DMs/week", hours: "1–2h", icon: Users },
];

export function ParallelTracks() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {tracks.map((t) => {
        const Icon = t.icon;
        return (
          <Card key={t.name} hover className="!p-4">
            <Icon className="mb-3 h-4 w-4 text-white/40" />
            <CardLabel>{t.cadence}</CardLabel>
            <div className="mt-1 text-sm font-semibold tracking-tight">{t.name}</div>
            <div className="mt-1 font-mono text-xs tabular-nums text-rust">{t.hours}</div>
          </Card>
        );
      })}
    </div>
  );
}
