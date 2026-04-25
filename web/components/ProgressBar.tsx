import { cn } from "@/lib/utils";

interface Props {
  value: number;
  className?: string;
  size?: "sm" | "md";
}

export function ProgressBar({ value, className, size = "sm" }: Props) {
  const clamped = Math.max(0, Math.min(100, value));
  const h = size === "sm" ? "h-1" : "h-1.5";
  return (
    <div className={cn("w-full overflow-hidden rounded-full bg-white/[0.06]", h, className)}>
      <div
        className="h-full rounded-full bg-gradient-to-r from-rust via-rust/90 to-solana transition-all duration-500 ease-out"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
