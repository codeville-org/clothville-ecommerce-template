"use client";

import { Heart } from "lucide-react";
import type { Product } from "@/lib/commerce";
import { useWishlist } from "@/lib/store/wishlist";
import { useHydrated } from "@/lib/hooks/use-hydrated";
import { ProductGrid } from "@/components/product/product-grid";
import { ProductGridSkeleton } from "@/components/product/product-card-skeleton";
import { EmptyState } from "@/components/common/empty-state";

/** Renders the wishlist by filtering the catalog against the saved ids. */
export function WishlistView({ products }: { products: Product[] }) {
  const hydrated = useHydrated();
  const ids = useWishlist((s) => s.ids);

  if (!hydrated) return <ProductGridSkeleton count={4} />;

  const items = products.filter((p) => ids.includes(p.id));

  if (items.length === 0) {
    return (
      <EmptyState
        icon={Heart}
        title="Your wishlist is empty"
        description="Save the pieces you love to keep them close and find them here later."
        action={{ label: "Explore the collection", href: "/shop" }}
      />
    );
  }

  return <ProductGrid products={items} />;
}
