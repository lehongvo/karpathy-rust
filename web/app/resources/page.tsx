"use client";

import { useEffect, useState } from "react";
import { RESOURCES } from "@/lib/plan-data";
import { loadProgress, setResourceStatus } from "@/lib/progress";
import type { ResourcePriority, ResourceStatus, ResourceType } from "@/lib/types";
import { Card, CardTitle, CardValue } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ResourcesPage() {
  const [statuses, setStatuses] = useState<Record<string, ResourceStatus>>({});
  const [filterType, setFilterType] = useState<ResourceType | "all">("all");
  const [filterPriority, setFilterPriority] = useState<ResourcePriority | "all">("all");

  useEffect(() => {
    setStatuses(loadProgress().resourcesStatus);
  }, []);

  const filtered = RESOURCES.filter(
    (r) =>
      (filterType === "all" || r.type === filterType) &&
      (filterPriority === "all" || r.priority === filterPriority)
  );
  const totalCost = filtered.reduce((acc, r) => acc + r.costUSD, 0);
  const spent = filtered
    .filter((r) => statuses[r.id] === "done")
    .reduce((acc, r) => acc + r.costUSD, 0);

  const cycle = (id: string) => {
    const order: ResourceStatus[] = ["todo", "doing", "done"];
    const cur = statuses[id] ?? "todo";
    const next = order[(order.indexOf(cur) + 1) % 3];
    setResourceStatus(id, next);
    setStatuses({ ...statuses, [id]: next });
  };

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold">resources</h1>
      </section>

      <section className="grid grid-cols-2 gap-4 md:grid-cols-3">
        <Card>
          <CardTitle>Total budget (filtered)</CardTitle>
          <CardValue>${totalCost}</CardValue>
        </Card>
        <Card>
          <CardTitle>Spent</CardTitle>
          <CardValue>${spent}</CardValue>
        </Card>
        <Card>
          <CardTitle>Items</CardTitle>
          <CardValue>{filtered.length}</CardValue>
        </Card>
      </section>

      <section className="flex flex-wrap gap-2 font-mono text-xs">
        {(["all", "book", "course", "cert", "tool", "doc"] as const).map((t) => (
          <button key={t} onClick={() => setFilterType(t)} className={pill(filterType === t)}>
            {t}
          </button>
        ))}
        <span className="mx-2 text-white/30">|</span>
        {(["all", "must", "nice-to-have", "skip"] as const).map((p) => (
          <button key={p} onClick={() => setFilterPriority(p)} className={pill(filterPriority === p)}>
            {p}
          </button>
        ))}
      </section>

      <section className="overflow-x-auto">
        <table className="w-full font-mono text-sm">
          <thead className="text-left text-white/50">
            <tr className="border-b border-white/10">
              <th className="py-2">name</th>
              <th>type</th>
              <th>priority</th>
              <th>cost</th>
              <th>status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id} className="border-b border-white/5">
                <td className="py-2">
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-rust"
                    title={r.note}
                  >
                    {r.name}
                  </a>
                </td>
                <td>{r.type}</td>
                <td>
                  <Badge>{r.priority}</Badge>
                </td>
                <td>${r.costUSD}</td>
                <td>
                  <button onClick={() => cycle(r.id)} className={pill(false)}>
                    {statuses[r.id] ?? "todo"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

const pill = (active: boolean) =>
  `rounded-md px-2.5 py-1 font-mono text-xs ${
    active ? "bg-rust text-white" : "border border-white/15 text-white/70 hover:bg-white/5"
  }`;
