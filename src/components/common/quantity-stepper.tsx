"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils/cn";

/** Accessible − / + quantity control. */
export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  className,
}: {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  className?: string;
}) {
  const dec = () => onChange(Math.max(min, value - 1));
  const inc = () => onChange(Math.min(max, value + 1));

  return (
    <div className={cn("inline-flex items-center border border-border", className)}>
      <button
        type="button"
        onClick={dec}
        disabled={value <= min}
        aria-label="Decrease quantity"
        className="flex h-10 w-10 items-center justify-center text-foreground/70 transition-colors hover:text-foreground disabled:opacity-40 disabled:hover:text-foreground/70"
      >
        <Minus size={14} strokeWidth={1.5} />
      </button>
      <span aria-live="polite" className="w-9 text-center text-sm tabular-nums">
        {value}
      </span>
      <button
        type="button"
        onClick={inc}
        disabled={value >= max}
        aria-label="Increase quantity"
        className="flex h-10 w-10 items-center justify-center text-foreground/70 transition-colors hover:text-foreground disabled:opacity-40 disabled:hover:text-foreground/70"
      >
        <Plus size={14} strokeWidth={1.5} />
      </button>
    </div>
  );
}
