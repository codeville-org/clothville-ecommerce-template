"use client";

import { X } from "lucide-react";
import { useShopFilters } from "@/lib/shop/use-shop-filters";

interface Chip {
  key: string;
  label: string;
  onRemove: () => void;
}

/** Removable chips for the currently-applied filters, with a clear-all. */
export function ActiveFilters() {
  const { get, getList, toggleInList, setParam, setParams, clearAll } = useShopFilters();

  const chips: Chip[] = [];

  for (const value of getList("category")) {
    chips.push({ key: `cat-${value}`, label: value, onRemove: () => toggleInList("category", value) });
  }
  for (const value of getList("size")) {
    chips.push({ key: `size-${value}`, label: `Size ${value}`, onRemove: () => toggleInList("size", value) });
  }
  for (const value of getList("color")) {
    chips.push({ key: `color-${value}`, label: value, onRemove: () => toggleInList("color", value) });
  }

  const min = get("minPrice");
  const max = get("maxPrice");
  if (min || max) {
    chips.push({
      key: "price",
      label: `${min ? `$${min}` : "Min"} – ${max ? `$${max}` : "Max"}`,
      onRemove: () => setParams({ minPrice: null, maxPrice: null }),
    });
  }

  if (get("inStock") === "1") {
    chips.push({ key: "inStock", label: "In stock", onRemove: () => setParam("inStock", null) });
  }

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <button
          key={chip.key}
          type="button"
          onClick={chip.onRemove}
          className="inline-flex items-center gap-1.5 border border-border px-2.5 py-1 text-xs text-foreground/80 transition-colors hover:border-foreground hover:text-foreground"
        >
          {chip.label}
          <X size={12} strokeWidth={1.5} />
        </button>
      ))}
      <button
        type="button"
        onClick={clearAll}
        className="text-xs uppercase tracking-[0.1em] text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
      >
        Clear all
      </button>
    </div>
  );
}
