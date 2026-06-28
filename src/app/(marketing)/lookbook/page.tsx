import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/common/container";
import { Reveal } from "@/components/common/reveal";
import { Media } from "@/components/common/media";

export const metadata: Metadata = {
  title: "Lookbook",
  description: "An editorial look at the season — styling, texture and silhouette.",
};

const LOOKS = [
  { tone: "camel", caption: "The Atelier Coat", href: "/collections/outerwear", tall: true },
  { tone: "ivory", caption: "Silk & Slip", href: "/collections/dresses", tall: false },
  { tone: "charcoal", caption: "Sharp Tailoring", href: "/collections/tailoring", tall: false },
  { tone: "sage", caption: "Knitwear, Softly", href: "/collections/knitwear", tall: true },
  { tone: "stone", caption: "Everyday Essentials", href: "/collections/essentials", tall: false },
  { tone: "wine", caption: "After Dark", href: "/collections/dresses", tall: true },
  { tone: "navy", caption: "Double-Breasted", href: "/collections/tailoring", tall: false },
  { tone: "black", caption: "The Edit", href: "/collections/featured", tall: false },
];

export default function LookbookPage() {
  return (
    <Container className="py-12">
      <header className="max-w-2xl">
        <p className="text-xs uppercase tracking-[0.35em] text-accent">Lookbook</p>
        <h1 className="mt-4 font-serif text-4xl sm:text-5xl">Season 2026</h1>
        <p className="mt-3 text-muted-foreground">
          A study in restraint — editorial pieces photographed for the way they move and live.
        </p>
      </header>

      <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        {LOOKS.map((look, i) => (
          <Reveal key={look.caption} delay={(i % 3) * 0.06}>
            <Link href={look.href} className="group block break-inside-avoid">
              <div
                className={`relative overflow-hidden bg-muted ${look.tall ? "aspect-[3/4]" : "aspect-[4/5]"}`}
              >
                <Media
                  image={{ url: `/demo/products/tone-${look.tone}.svg`, alt: look.caption }}
                  sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                  className="transition-transform duration-700 ease-luxe group-hover:scale-105"
                />
              </div>
              <p className="mt-2.5 text-xs uppercase tracking-[0.15em] text-muted-foreground transition-colors group-hover:text-foreground">
                {look.caption}
              </p>
            </Link>
          </Reveal>
        ))}
      </div>
    </Container>
  );
}
