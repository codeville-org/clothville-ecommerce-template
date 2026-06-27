import * as React from "react";
import { cn } from "@/lib/utils/cn";

const VARIANTS = {
  solid: "bg-foreground text-background",
  muted: "bg-muted text-muted-foreground",
  accent: "bg-accent text-accent-foreground",
  sale: "bg-destructive text-destructive-foreground",
  outline: "border border-border text-foreground",
} as const;

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: keyof typeof VARIANTS;
}

/** Small uppercase label for product flags (New, Sale, …) and metadata. */
export function Badge({ className, variant = "solid", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 text-[0.625rem] font-medium uppercase tracking-[0.12em]",
        VARIANTS[variant],
        className,
      )}
      {...props}
    />
  );
}
