import * as React from "react";

interface Props {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  eyebrow?: string;
}

export function PageHeader({ title, subtitle, actions, eyebrow }: Props) {
  return (
    <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && (
          <p className="mb-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-white/40">
            {eyebrow}
          </p>
        )}
        <h1 className="text-3xl font-semibold tracking-tight text-white">{title}</h1>
        {subtitle && <p className="mt-2 max-w-xl text-sm text-white/55">{subtitle}</p>}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </div>
  );
}
