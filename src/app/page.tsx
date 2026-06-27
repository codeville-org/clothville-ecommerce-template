import Link from "next/link";
import { getCollections, getProducts } from "@/lib/commerce";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/common/container";
import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { Media } from "@/components/common/media";
import { ProductGrid } from "@/components/product/product-grid";

/**
 * Home. Editorial hero, new-arrivals grid and featured collections — all read
 * through the commerce seam. (Lookbook teaser and parallax polish land in
 * Phase 3/4.)
 */
export default async function HomePage() {
  const [newArrivals, collections] = await Promise.all([
    getProducts({ sort: "newest", pageSize: 8 }),
    getCollections(),
  ]);
  const featured = collections.filter((c) => c.featured).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="border-b border-border">
        <Container className="flex min-h-[68vh] flex-col items-center justify-center py-24 text-center">
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
        </Container>
      </section>

      {/* New arrivals */}
      <section className="py-16 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Just In"
              title="New Arrivals"
              action={{ label: "View all", href: "/collections/new-arrivals" }}
            />
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            <ProductGrid products={newArrivals.items} priorityCount={4} />
          </Reveal>
        </Container>
      </section>

      {/* Featured collections */}
      <section className="border-t border-border py-16 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="The Edit" title="Featured Collections" />
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((collection, i) => (
              <Reveal key={collection.id} delay={i * 0.08}>
                <Link
                  href={`/collections/${collection.handle}`}
                  className="group relative block aspect-[3/4] overflow-hidden bg-muted"
                >
                  {collection.image && (
                    <Media
                      image={collection.image}
                      sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                      className="transition-transform duration-700 ease-luxe group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-foreground/55 via-foreground/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-background">
                    <h3 className="font-serif text-2xl">{collection.title}</h3>
                    <p className="mt-1 text-xs uppercase tracking-[0.18em]">Shop now</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
