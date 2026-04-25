import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset",
  {
    variants: {
      variant: {
        default: "bg-white/[0.04] text-white/70 ring-white/10",
        success: "bg-emerald-500/10 text-emerald-300 ring-emerald-500/20",
        warning: "bg-amber-500/10 text-amber-300 ring-amber-500/20",
        info: "bg-blue-500/10 text-blue-300 ring-blue-500/20",
        rust: "bg-rust/10 text-rust ring-rust/25",
        solana: "bg-solana/10 text-solana ring-solana/25",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, className }))} {...props} />;
}
