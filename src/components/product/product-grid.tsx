import type { Product } from "@/lib/commerce";
import { cn } from "@/lib/utils/cn";
import { ProductCard } from "./product-card";

/** Responsive product grid (2 → 3 → 4 columns). */
export function ProductGrid({
  products,
  priorityCount = 0,
  className,
}: {
  products: Product[];
  /** Number of leading cards to mark priority for LCP. */
  priorityCount?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-3 xl:grid-cols-4",
        className,
      )}
    >
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} priority={i < priorityCount} />
      ))}
    </div>
  );
}
