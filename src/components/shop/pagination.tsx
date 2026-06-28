"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useShopFilters } from "@/lib/shop/use-shop-filters";
import { cn } from "@/lib/utils/cn";

/** Compact page range with first/last and ellipses around the current page. */
function pageRange(current: number, count: number): (number | "…")[] {
  const delta = 1;
  const pages: number[] = [];
  for (let i = 1; i <= count; i++) {
    if (i === 1 || i === count || (i >= current - delta && i <= current + delta)) pages.push(i);
  }
  const out: (number | "…")[] = [];
  let prev: number | undefined;
  for (const p of pages) {
    if (prev) {
      if (p - prev === 2) out.push(prev + 1);
      else if (p - prev > 2) out.push("…");
    }
    out.push(p);
    prev = p;
  }
  return out;
}

export function Pagination({ page, pageCount }: { page: number; pageCount: number }) {
  const { setParam } = useShopFilters();
  if (pageCount <= 1) return null;

  const go = (p: number) => setParam("page", p <= 1 ? null : String(p), { resetPage: false });

  const base =
    "inline-flex h-9 min-w-9 items-center justify-center px-2 text-sm transition-colors disabled:opacity-40";

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-1">
      <button
        type="button"
        aria-label="Previous page"
        onClick={() => go(page - 1)}
        disabled={page <= 1}
        className={cn(base, "hover:text-accent")}
      >
        <ChevronLeft size={16} strokeWidth={1.5} />
      </button>

      {pageRange(page, pageCount).map((p, i) =>
        p === "…" ? (
          <span key={`gap-${i}`} className="px-1 text-sm text-muted-foreground">
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            aria-current={p === page ? "page" : undefined}
            onClick={() => go(p)}
            className={cn(
              base,
              p === page ? "border-b border-foreground font-medium text-foreground" : "text-foreground/70 hover:text-foreground",
            )}
          >
            {p}
          </button>
        ),
      )}

      <button
        type="button"
        aria-label="Next page"
        onClick={() => go(page + 1)}
        disabled={page >= pageCount}
        className={cn(base, "hover:text-accent")}
      >
        <ChevronRight size={16} strokeWidth={1.5} />
      </button>
    </nav>
  );
}
