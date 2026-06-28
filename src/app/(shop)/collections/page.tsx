import type { Metadata } from "next";
import { getCollections } from "@/lib/commerce";
import { Container } from "@/components/common/container";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { CollectionCard } from "@/components/shop/collection-card";

export const metadata: Metadata = {
  title: "Collections",
  description: "Explore the Clothville collections — from outerwear to evening.",
};

export default async function CollectionsPage() {
  const collections = await getCollections();

  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Collections" }]} />
      <header className="mt-6 max-w-2xl">
        <h1 className="font-serif text-4xl sm:text-5xl">Collections</h1>
        <p className="mt-3 text-muted-foreground">
          Edits built around a season, a fabric, a mood — explore the house in full.
        </p>
      </header>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {collections.map((collection) => (
          <CollectionCard key={collection.id} collection={collection} />
        ))}
      </div>
    </Container>
  );
}
