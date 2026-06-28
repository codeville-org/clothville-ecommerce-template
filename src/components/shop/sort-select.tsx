"use client";

import { useShopFilters } from "@/lib/shop/use-shop-filters";
import { SORT_OPTIONS } from "@/lib/shop/search-params";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/** Sort control backed by the `sort` URL param. */
export function SortSelect() {
  const { get, setParam } = useShopFilters();
  const value = get("sort") || "featured";

  return (
    <Select value={value} onValueChange={(v) => setParam("sort", v === "featured" ? null : v)}>
      <SelectTrigger className="min-w-[11rem]" aria-label="Sort products">
        <span className="text-muted-foreground">Sort</span>
        <SelectValue />
      </SelectTrigger>
      <SelectContent align="end">
        {SORT_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
