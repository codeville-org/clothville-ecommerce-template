import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getCollection,
  getCollectionProducts,
  getCollections,
  getFacets,
} from "@/lib/commerce";
import { parseProductQuery, type RawSearchParams } from "@/lib/shop/search-params";
import { ProductListing } from "@/components/shop/product-listing";

export async function generateStaticParams() {
  const collections = await getCollections();
  return collections.map((c) => ({ handle: c.handle }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const collection = await getCollection(handle);
  if (!collection) return {};
  return {
    title: collection.title,
    description: collection.description,
  };
}

export default async function CollectionPage({
  params,
  searchParams,
}: {
  params: Promise<{ handle: string }>;
  searchParams: Promise<RawSearchParams>;
}) {
  const [{ handle }, sp] = await Promise.all([params, searchParams]);
  const collection = await getCollection(handle);
  if (!collection) notFound();

  const query = parseProductQuery(sp);
  const [result, facets] = await Promise.all([
    getCollectionProducts(handle, query),
    getFacets(handle),
  ]);

  return (
    <ProductListing
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Collections", href: "/collections" },
        { label: collection.title },
      ]}
      title={collection.title}
      description={collection.description}
      result={result}
      facets={facets}
    />
  );
}
