import { getRelatedProducts } from "@/lib/commerce";
import { SectionHeading } from "@/components/common/section-heading";
import { ProductGrid } from "./product-grid";

/** "You may also like" — products related to the current one. */
export async function RelatedProducts({ productId }: { productId: string }) {
  const related = await getRelatedProducts(productId, 4);
  if (related.length === 0) return null;

  return (
    <section className="mt-16 border-t border-border pt-16">
      <SectionHeading title="You May Also Like" />
      <ProductGrid products={related} className="mt-10" />
    </section>
  );
}
