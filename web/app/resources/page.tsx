"use client";

import { useEffect, useState } from "react";
import { RESOURCES } from "@/lib/plan-data";
import { loadProgress, setResourceStatus } from "@/lib/progress";
import type { Resource, ResourcePriority, ResourceStatus, ResourceType } from "@/lib/types";
import { PageHeader } from "@/components/PageHeader";
import { StatCard } from "@/components/StatCard";
import { Card, CardLabel } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, BookOpen, GraduationCap, Award, Wrench, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const TYPE_ICON: Record<ResourceType, typeof BookOpen> = {
  book: BookOpen,
  course: GraduationCap,
  cert: Award,
  tool: Wrench,
  doc: FileText,
};

const PRIORITY_VARIANT: Record<ResourcePriority, "rust" | "default" | "warning"> = {
  must: "rust",
  "nice-to-have": "default",
  skip: "warning",
};

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
    <div className="space-y-12">
      <PageHeader
        eyebrow="library"
        title="Resources"
        subtitle="Books, courses, docs, certs. Click status to cycle todo → doing → done. Verified — no productivity porn."
      />

      <section className="grid grid-cols-2 gap-3 md:grid-cols-3">
        <StatCard label="Items (filtered)" value={filtered.length} />
        <StatCard label="Total budget" value={`$${totalCost}`} />
        <StatCard label="Spent" value={`$${spent}`} hint={`of $${totalCost}`} />
      </section>

      <section className="space-y-3">
        <div className="flex flex-wrap items-center gap-1.5">
          <CardLabel className="mr-2">type</CardLabel>
          {(["all", "book", "course", "cert", "tool", "doc"] as const).map((t) => (
            <FilterPill key={t} active={filterType === t} onClick={() => setFilterType(t)}>
              {t}
            </FilterPill>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <CardLabel className="mr-2">priority</CardLabel>
          {(["all", "must", "nice-to-have", "skip"] as const).map((p) => (
            <FilterPill key={p} active={filterPriority === p} onClick={() => setFilterPriority(p)}>
              {p}
            </FilterPill>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {filtered.map((r) => (
          <ResourceCard key={r.id} resource={r} status={statuses[r.id] ?? "todo"} onCycle={() => cycle(r.id)} />
        ))}
      </section>
    </div>
  );
}

function ResourceCard({
  resource,
  status,
  onCycle,
}: {
  resource: Resource;
  status: ResourceStatus;
  onCycle: () => void;
}) {
  const Icon = TYPE_ICON[resource.type];
  const statusColor =
    status === "done"
      ? "text-emerald-300 ring-emerald-500/20 bg-emerald-500/10"
      : status === "doing"
      ? "text-rust ring-rust/30 bg-rust/10"
      : "text-white/50 ring-white/15 bg-white/[0.04]";
  return (
    <Card hover className="!p-5">
      <div className="mb-3 flex items-start justify-between gap-3">
        <Icon className="h-4 w-4 shrink-0 text-white/40" />
        <Badge variant={PRIORITY_VARIANT[resource.priority]}>{resource.priority}</Badge>
      </div>
      <a
        href={resource.url}
        target="_blank"
        rel="noreferrer"
        className="group inline-flex items-start gap-1.5"
        title={resource.note}
      >
        <span className="text-[15px] font-medium leading-snug tracking-tight transition-colors group-hover:text-rust">
          {resource.name}
        </span>
        <ExternalLink className="mt-1 h-3 w-3 shrink-0 text-white/30 transition-colors group-hover:text-rust" />
      </a>
      {resource.note && (
        <p className="mt-1.5 text-xs leading-relaxed text-white/45">{resource.note}</p>
      )}
      <div className="mt-4 flex items-center justify-between">
        <span className="font-mono text-xs tabular-nums text-white/40">
          {resource.costUSD === 0 ? "Free" : `$${resource.costUSD}`}
        </span>
        <button
          onClick={onCycle}
          className={cn(
            "rounded-full px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide ring-1 ring-inset transition-all",
            statusColor
          )}
        >
          {status}
        </button>
      </div>
    </Card>
  );
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
        active
          ? "bg-white/[0.08] text-white ring-1 ring-inset ring-white/15"
          : "text-white/55 hover:bg-white/[0.04] hover:text-white"
      )}
    >
      {children}
    </button>
  );
}
