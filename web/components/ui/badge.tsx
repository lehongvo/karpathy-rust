import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-white/15 px-2.5 py-0.5 font-mono text-xs",
        className
      )}
    >
      {children}
    </span>
  );
}
