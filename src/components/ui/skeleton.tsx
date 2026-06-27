import * as React from "react";
import { cn } from "@/lib/utils/cn";

/**
 * Loading placeholder. The pulse animation is automatically stilled under
 * `prefers-reduced-motion` by the global base styles.
 */
export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div aria-hidden className={cn("animate-pulse bg-muted", className)} {...props} />;
}
