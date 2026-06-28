import type { Metadata } from "next";
import { getFacets, getProducts } from "@/lib/commerce";
import { parseProductQuery, type RawSearchParams } from "@/lib/shop/search-params";
import { ProductListing } from "@/components/shop/product-listing";

export const metadata: Metadata = {
  title: "Shop All",
  description: "Browse the full Clothville collection — outerwear, knitwear, tailoring and more.",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<RawSearchParams>;
}) {
  const query = parseProductQuery(await searchParams);
  const [result, facets] = await Promise.all([getProducts(query), getFacets()]);

  return (
    <ProductListing
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Shop" }]}
      title="Shop All"
      description="The complete collection — considered, slow-made pieces for a lasting wardrobe."
      result={result}
      facets={facets}
    />
  );
}
