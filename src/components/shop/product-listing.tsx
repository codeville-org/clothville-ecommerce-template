import { SearchX } from "lucide-react";
import type { Facets, Paginated, Product } from "@/lib/commerce";
import { Container } from "@/components/common/container";
import { Breadcrumbs, type Crumb } from "@/components/common/breadcrumbs";
import { EmptyState } from "@/components/common/empty-state";
import { ProductGrid } from "@/components/product/product-grid";
import { FilterPanel } from "./filter-panel";
import { MobileFilterSheet } from "./mobile-filter-sheet";
import { SortSelect } from "./sort-select";
import { ActiveFilters } from "./active-filters";
import { Pagination } from "./pagination";

/**
 * Shared product-listing layout (PLP) for /shop and /collections/[handle]:
 * breadcrumbs, heading, desktop filter sidebar, toolbar (count + sort + mobile
 * filters), active-filter chips, the grid and pagination. Filter/sort/page
 * state is read from the URL by the client controls.
 */
export function ProductListing({
  breadcrumbs,
  title,
  description,
  result,
  facets,
}: {
  breadcrumbs: Crumb[];
  title: string;
  description?: string;
  result: Paginated<Product>;
  facets: Facets;
}) {
  return (
    <Container className="py-10">
      <Breadcrumbs items={breadcrumbs} />

      <header className="mt-6 max-w-2xl">
        <h1 className="font-serif text-4xl sm:text-5xl">{title}</h1>
        {description && <p className="mt-3 text-muted-foreground">{description}</p>}
      </header>

      <div className="mt-10 lg:grid lg:grid-cols-[15rem_1fr] lg:gap-12">
        <aside className="hidden lg:block">
          <FilterPanel facets={facets} />
        </aside>

        <div>
          <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
            <p className="text-sm text-muted-foreground">
              {result.total} {result.total === 1 ? "piece" : "pieces"}
            </p>
            <div className="flex items-center gap-2">
              <MobileFilterSheet facets={facets} />
              <SortSelect />
            </div>
          </div>

          <div className="mt-4 empty:mt-0">
            <ActiveFilters />
          </div>

          {result.items.length > 0 ? (
            <>
              <ProductGrid products={result.items} priorityCount={4} className="mt-8" />
              <div className="mt-14">
                <Pagination page={result.page} pageCount={result.pageCount} />
              </div>
            </>
          ) : (
            <EmptyState
              icon={SearchX}
              title="No pieces found"
              description="Try adjusting or clearing your filters to see more."
            />
          )}
        </div>
      </div>
    </Container>
  );
}
