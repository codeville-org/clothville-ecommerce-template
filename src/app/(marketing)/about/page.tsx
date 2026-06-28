import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/common/container";
import { Reveal } from "@/components/common/reveal";
import { Media } from "@/components/common/media";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About",
  description: `The story behind ${siteConfig.name} — considered, slow-made luxury clothing.`,
};

const VALUES = [
  {
    title: "Considered design",
    body: "Every piece begins with a sketch and ends only when the line, the drape and the detail feel inevitable.",
  },
  {
    title: "Responsible craft",
    body: "We partner with family-run ateliers and mills who share our standards for quality and care.",
  },
  {
    title: "Built to last",
    body: "We make fewer, better things — designed to be worn for years, not seasons.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-border">
        <Container className="py-20 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-accent">Our Story</p>
          <h1 className="mx-auto mt-6 max-w-3xl text-balance font-serif text-4xl sm:text-6xl">
            Clothing made to outlast the season
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-muted-foreground">{siteConfig.description}</p>
        </Container>
      </section>

      <Container className="py-16 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden bg-muted">
              <Media
                image={{ url: "/demo/products/tone-camel.svg", alt: "Inside the atelier" }}
                sizes="(min-width:1024px) 45vw, 100vw"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-5 text-muted-foreground">
              <h2 className="font-serif text-3xl text-foreground">The house</h2>
              <p>
                {siteConfig.name} was founded on a simple belief: that luxury should be quiet,
                considered and enduring. We design a focused wardrobe of pieces meant to be lived in
                and loved for years.
              </p>
              <p>
                Our collections are made in small runs by skilled hands, using natural fibres chosen
                for the way they age — softening, never wearing out. This is fashion measured in
                decades, not seasons.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>

      <section className="border-t border-border">
        <Container className="py-16">
          <div className="grid gap-10 sm:grid-cols-3">
            {VALUES.map((value, i) => (
              <Reveal key={value.title} delay={i * 0.08}>
                <div>
                  <h3 className="font-serif text-xl">{value.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{value.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border">
        <Container className="py-16 text-center">
          <h2 className="font-serif text-3xl">Explore the collection</h2>
          <Button asChild className="mt-7">
            <Link href="/shop">Shop now</Link>
          </Button>
        </Container>
      </section>
    </>
  );
}
