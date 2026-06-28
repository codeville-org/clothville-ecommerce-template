import type { ProductQuery, SortKey } from "@/lib/commerce";

/**
 * Translation between the PLP's URL search params and a {@link ProductQuery}.
 *
 * URL shape (human-readable, SEO-friendly):
 *   ?category=Outerwear,Knitwear&size=M,L&color=Camel&minPrice=200&maxPrice=600
 *   &inStock=1&sort=price-asc&page=2
 *
 * Prices in the URL are in MAJOR units (dollars); they are converted to minor
 * units (cents) for the query, matching the catalog's Money amounts.
 */

export const PAGE_SIZE = 9;

export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "best-selling", label: "Best Selling" },
];

const SORT_VALUES = new Set<SortKey>(SORT_OPTIONS.map((o) => o.value));

export type RawSearchParams = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function toList(value: string | string[] | undefined): string[] | undefined {
  const raw = first(value);
  if (!raw) return undefined;
  const items = raw.split(",").map((s) => s.trim()).filter(Boolean);
  return items.length ? items : undefined;
}

function toNumber(value: string | string[] | undefined): number | undefined {
  const raw = first(value);
  if (raw === undefined || raw === "") return undefined;
  const n = Number(raw);
  return Number.isFinite(n) ? n : undefined;
}

/** Build a ProductQuery from raw URL search params. */
export function parseProductQuery(params: RawSearchParams): ProductQuery {
  const minDollars = toNumber(params.minPrice);
  const maxDollars = toNumber(params.maxPrice);
  const sort = first(params.sort) as SortKey | undefined;
  const page = toNumber(params.page);

  return {
    filters: {
      categories: toList(params.category),
      sizes: toList(params.size),
      colors: toList(params.color),
      minPrice: minDollars !== undefined ? Math.round(minDollars * 100) : undefined,
      maxPrice: maxDollars !== undefined ? Math.round(maxDollars * 100) : undefined,
      inStockOnly: first(params.inStock) === "1",
    },
    sort: sort && SORT_VALUES.has(sort) ? sort : "featured",
    page: page && page > 0 ? Math.floor(page) : 1,
    pageSize: PAGE_SIZE,
    search: first(params.q),
  };
}

/** Whether any catalog filter (not sort/page) is active. */
export function hasActiveFilters(params: RawSearchParams): boolean {
  return Boolean(
    toList(params.category) ||
      toList(params.size) ||
      toList(params.color) ||
      toNumber(params.minPrice) !== undefined ||
      toNumber(params.maxPrice) !== undefined ||
      first(params.inStock) === "1",
  );
}
