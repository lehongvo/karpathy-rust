import { Card } from "./ui/card";

const tracks = [
  { name: "Daily Code", cadence: "≥5 days/week", hours: "10–14h" },
  { name: "Weekly Blog/Tweet", cadence: "1 post/week", hours: "1–2h" },
  { name: "Monthly OSS PR", cadence: "≥1 PR/month", hours: "2–3h" },
  { name: "Quarterly Review", cadence: "Q1/Q2/Q3/Q4", hours: "4h/quarter" },
  { name: "Networking", cadence: "5 DM/week", hours: "1–2h" },
];

export function ParallelTracks() {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-5">
      {tracks.map((t) => (
        <Card key={t.name}>
          <div className="font-mono text-xs uppercase text-white/50">{t.cadence}</div>
          <div className="mt-1 font-semibold">{t.name}</div>
          <div className="mt-1 font-mono text-sm text-rust">{t.hours}</div>
        </Card>
      ))}
    </div>
  );
}
