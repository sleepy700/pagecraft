import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function StarRating({
  value,
  size = 14,
  className,
}: {
  value: number;
  size?: number;
  className?: string;
}) {
  const pct = Math.max(0, Math.min(100, (value / 5) * 100));
  return (
    <span className={cn("relative inline-flex shrink-0", className)} aria-label={`${value.toFixed(1)} out of 5 stars`}>
      <span className="flex gap-[2px] text-ink/20">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={size} className="fill-current" strokeWidth={0} />
        ))}
      </span>
      <span
        className="absolute inset-0 flex gap-[2px] overflow-hidden text-gold"
        style={{ width: `${pct}%` }}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={size} className="shrink-0 fill-current" strokeWidth={0} />
        ))}
      </span>
    </span>
  );
}
