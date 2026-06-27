import type {
  ColorFacetValue,
  Facets,
  FacetValue,
  Paginated,
  Product,
  ProductFilters,
  ProductQuery,
  SortKey,
} from "@/lib/commerce/types";

const DEFAULT_PAGE_SIZE = 12;

function optionValues(product: Product, name: string): string[] {
  return product.options.find((o) => o.name === name)?.values.map((v) => v.value) ?? [];
}

function productSizes(product: Product): string[] {
  return optionValues(product, "Size");
}

function productColors(product: Product): string[] {
  return optionValues(product, "Colour");
}

function inStock(product: Product): boolean {
  return product.variants.some((v) => v.available);
}

function matchesFilters(product: Product, filters: ProductFilters): boolean {
  if (filters.categories?.length && !filters.categories.some((c) => product.categories.includes(c))) {
    return false;
  }
  if (filters.sizes?.length) {
    const sizes = productSizes(product);
    if (!filters.sizes.some((s) => sizes.includes(s))) return false;
  }
  if (filters.colors?.length) {
    const colors = productColors(product);
    if (!filters.colors.some((c) => colors.includes(c))) return false;
  }
  if (filters.tags?.length && !filters.tags.some((t) => product.tags.includes(t))) {
    return false;
  }
  if (typeof filters.minPrice === "number" && product.price.amount < filters.minPrice) return false;
  if (typeof filters.maxPrice === "number" && product.price.amount > filters.maxPrice) return false;
  if (filters.inStockOnly && !inStock(product)) return false;
  return true;
}

function matchesSearch(product: Product, term: string): boolean {
  const haystack = [product.title, product.subtitle, product.description, ...product.tags, ...product.categories]
    .join(" ")
    .toLowerCase();
  return term
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => haystack.includes(word));
}

function compare(a: Product, b: Product, sort: SortKey): number {
  switch (sort) {
    case "newest":
      return b.createdAt.localeCompare(a.createdAt);
    case "price-asc":
      return a.price.amount - b.price.amount;
    case "price-desc":
      return b.price.amount - a.price.amount;
    case "title-asc":
      return a.title.localeCompare(b.title);
    case "title-desc":
      return b.title.localeCompare(a.title);
    case "best-selling":
      return Number(b.bestSeller ?? false) - Number(a.bestSeller ?? false) ||
        (b.reviewCount ?? 0) - (a.reviewCount ?? 0);
    case "featured":
    default:
      return Number(b.featured ?? false) - Number(a.featured ?? false) ||
        (b.reviewCount ?? 0) - (a.reviewCount ?? 0);
  }
}

function paginate<T>(items: T[], page: number, pageSize: number): Paginated<T> {
  const total = items.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page), pageCount);
  const start = (safePage - 1) * pageSize;
  return {
    items: items.slice(start, start + pageSize),
    total,
    page: safePage,
    pageSize,
    pageCount,
    hasMore: safePage < pageCount,
  };
}

/** Apply search → filters → sort → pagination to a product list. */
export function queryProducts(source: Product[], query: ProductQuery = {}): Paginated<Product> {
  let list = source;
  if (query.search) list = list.filter((p) => matchesSearch(p, query.search!));
  if (query.filters) list = list.filter((p) => matchesFilters(p, query.filters!));
  list = [...list].sort((a, b) => compare(a, b, query.sort ?? "featured"));
  return paginate(list, query.page ?? 1, query.pageSize ?? DEFAULT_PAGE_SIZE);
}

/** Build the available filter facets (with counts) for a product list. */
export function computeFacets(source: Product[]): Facets {
  const categories = new Map<string, number>();
  const sizes = new Map<string, number>();
  const colors = new Map<string, { count: number; hex?: string }>();
  let min = Infinity;
  let max = -Infinity;

  for (const product of source) {
    for (const c of product.categories) categories.set(c, (categories.get(c) ?? 0) + 1);
    for (const s of productSizes(product)) sizes.set(s, (sizes.get(s) ?? 0) + 1);
    for (const option of product.options.filter((o) => o.name === "Colour")) {
      for (const v of option.values) {
        const prev = colors.get(v.value);
        colors.set(v.value, { count: (prev?.count ?? 0) + 1, hex: v.hex ?? prev?.hex });
      }
    }
    min = Math.min(min, product.price.amount);
    max = Math.max(max, product.price.amount);
  }

  const toFacets = (m: Map<string, number>): FacetValue[] =>
    [...m.entries()].map(([value, count]) => ({ value, count })).sort((a, b) => a.value.localeCompare(b.value));

  const colorFacets: ColorFacetValue[] = [...colors.entries()]
    .map(([value, { count, hex }]) => ({ value, count, hex }))
    .sort((a, b) => a.value.localeCompare(b.value));

  return {
    categories: toFacets(categories),
    sizes: toFacets(sizes),
    colors: colorFacets,
    priceRange: {
      min: Number.isFinite(min) ? min : 0,
      max: Number.isFinite(max) ? max : 0,
    },
  };
}

/** Products sharing a category or collection with the given product. */
export function relatedProducts(source: Product[], product: Product, limit: number): Product[] {
  return source
    .filter((p) => p.id !== product.id)
    .map((p) => ({
      product: p,
      score:
        p.categories.filter((c) => product.categories.includes(c)).length * 2 +
        p.collectionIds.filter((c) => product.collectionIds.includes(c)).length,
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || (b.product.reviewCount ?? 0) - (a.product.reviewCount ?? 0))
    .slice(0, limit)
    .map((entry) => entry.product);
}
