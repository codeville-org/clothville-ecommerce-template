import { Star } from "lucide-react";
import { cn } from "@/lib/utils/cn";

function StarRow({ size }: { size: number }) {
  return (
    <span className="flex gap-0.5">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} size={size} strokeWidth={0} fill="currentColor" />
      ))}
    </span>
  );
}

/**
 * Fractional star rating. Renders a muted base row with an accent-coloured
 * overlay clipped to the rating percentage (supports half stars).
 */
export function RatingStars({
  rating,
  count,
  size = 13,
  showCount = true,
  className,
}: {
  rating: number;
  count?: number;
  size?: number;
  showCount?: boolean;
  className?: string;
}) {
  const percent = Math.max(0, Math.min(100, (rating / 5) * 100));

  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <span className="relative inline-flex" aria-hidden="true">
        <span className="text-muted-foreground/30">
          <StarRow size={size} />
        </span>
        <span
          className="absolute inset-0 flex overflow-hidden text-accent"
          style={{ width: `${percent}%` }}
        >
          <StarRow size={size} />
        </span>
      </span>
      {showCount && typeof count === "number" && (
        <span className="text-xs text-muted-foreground">({count})</span>
      )}
      <span className="sr-only">{rating} out of 5 stars</span>
    </span>
  );
}
