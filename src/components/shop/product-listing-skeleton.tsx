import { Container } from "@/components/common/container";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductGridSkeleton } from "@/components/product/product-card-skeleton";

/** Loading skeleton mirroring the ProductListing layout. */
export function ProductListingSkeleton() {
  return (
    <Container className="py-10">
      <Skeleton className="h-3 w-40" />
      <Skeleton className="mt-6 h-10 w-64" />
      <div className="mt-10 lg:grid lg:grid-cols-[15rem_1fr] lg:gap-12">
        <div className="hidden space-y-6 lg:block">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-3 border-b border-border pb-6">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-2/3" />
            </div>
          ))}
        </div>
        <div>
          <div className="flex items-center justify-between border-b border-border pb-4">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-9 w-44" />
          </div>
          <div className="mt-8">
            <ProductGridSkeleton count={9} />
          </div>
        </div>
      </div>
    </Container>
  );
}
