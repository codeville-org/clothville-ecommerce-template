import Link from "next/link";
import { getCollections } from "@/lib/commerce";
import { siteConfig } from "@/config/site";

/**
 * PHASE 1 FOUNDATION HOME.
 * A minimal editorial landing that exercises the full data seam end-to-end
 * (collections are read through @/lib/commerce → mock provider) and shows the
 * design tokens + fonts in action. The rich home — hero imagery, product
 * grids, lookbook and newsletter — is built in Phase 3.
 */
export default async function HomePage() {
  const collections = await getCollections();
  const featured = collections.filter((c) => c.featured);

  return (
    <>
      <section className="mx-auto flex min-h-[70vh] max-w-editorial flex-col items-center justify-center px-6 py-24 text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-accent">New Season · 2026</p>
        <h1 className="mt-6 max-w-4xl text-balance font-serif text-5xl leading-[1.05] sm:text-6xl md:text-7xl">
          {siteConfig.tagline}
        </h1>
        <p className="mt-6 max-w-xl text-pretty text-muted-foreground">{siteConfig.description}</p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/shop"
            className="inline-flex h-12 items-center justify-center bg-primary px-8 text-xs uppercase tracking-[0.2em] text-primary-foreground transition-opacity hover:opacity-90"
          >
            Shop the collection
          </Link>
          <Link
            href="/lookbook"
            className="inline-flex h-12 items-center justify-center border border-border px-8 text-xs uppercase tracking-[0.2em] text-foreground transition-colors hover:bg-muted"
          >
            View the lookbook
          </Link>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-editorial px-6 py-16">
          <h2 className="font-serif text-2xl">Explore the house</h2>
          <ul className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-3 lg:grid-cols-4">
            {featured.map((collection) => (
              <li key={collection.id}>
                <Link
                  href={`/collections/${collection.handle}`}
                  className="flex aspect-[4/5] flex-col justify-end bg-card p-6 transition-colors hover:bg-muted"
                >
                  <span className="font-serif text-xl">{collection.title}</span>
                  <span className="mt-1 text-xs uppercase tracking-[0.15em] text-muted-foreground">
                    {collection.productIds.length} pieces
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
