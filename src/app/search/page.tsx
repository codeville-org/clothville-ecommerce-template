import type { Metadata } from "next";
import { SearchX } from "lucide-react";
import { searchProducts } from "@/lib/commerce";
import { Container } from "@/components/common/container";
import { SearchBar } from "@/components/search/search-bar";
import { ProductGrid } from "@/components/product/product-grid";
import { EmptyState } from "@/components/common/empty-state";

export const metadata: Metadata = {
  title: "Search",
  robots: { index: false },
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = (q ?? "").trim();
  const result = query ? await searchProducts(query, { pageSize: 24 }) : null;

  return (
    <Container className="py-12">
      <h1 className="font-serif text-4xl sm:text-5xl">Search</h1>
      <div className="mt-6 max-w-xl">
        <SearchBar initialQuery={query} />
      </div>

      {result && (
        <div className="mt-10">
          <p className="text-sm text-muted-foreground">
            {result.total} {result.total === 1 ? "result" : "results"} for “{query}”
          </p>
          {result.items.length > 0 ? (
            <ProductGrid products={result.items} className="mt-8" />
          ) : (
            <EmptyState
              icon={SearchX}
              title="No results"
              description={`We couldn't find anything for “${query}”. Try another term.`}
              action={{ label: "Browse all", href: "/shop" }}
            />
          )}
        </div>
      )}
    </Container>
  );
}
