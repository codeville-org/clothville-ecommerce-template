"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import type { Product, ProductBadge } from "@/lib/commerce";
import { useWishlist } from "@/lib/store/wishlist";
import { useUI } from "@/lib/store/ui";
import { useHydrated } from "@/lib/hooks/use-hydrated";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils/cn";
import { Media } from "@/components/common/media";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Price } from "./price";
import { RatingStars } from "./rating-stars";

const DEFAULT_SIZES = "(min-width:1280px) 22vw, (min-width:1024px) 25vw, (min-width:640px) 45vw, 90vw";

/** Pick a single primary flag for the card, in priority order. */
function primaryBadge(
  product: Product,
): { label: string; variant: BadgeProps["variant"] } | null {
  const soldOut = product.variants.every((v) => !v.available);
  if (soldOut) return { label: "Sold out", variant: "outline" };
  const has = (b: ProductBadge) => product.badges?.includes(b);
  if (has("sale")) return { label: "Sale", variant: "sale" };
  if (has("new")) return { label: "New", variant: "accent" };
  if (has("limited")) return { label: "Limited", variant: "solid" };
  if (has("bestseller")) return { label: "Bestseller", variant: "muted" };
  return null;
}

export function ProductCard({
  product,
  priority = false,
  sizes = DEFAULT_SIZES,
}: {
  product: Product;
  priority?: boolean;
  sizes?: string;
}) {
  const hydrated = useHydrated();
  const wishedRaw = useWishlist((s) => s.ids.includes(product.id));
  const toggleWish = useWishlist((s) => s.toggle);
  const openQuickView = useUI((s) => s.openQuickView);
  const isWished = hydrated && wishedRaw;

  const badge = primaryBadge(product);
  const secondImage = product.images[1];
  const href = `/products/${product.slug}`;

  return (
    <article className="group">
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <Media
          image={product.images[0]}
          sizes={sizes}
          priority={priority}
          className="transition-transform duration-700 ease-luxe group-hover:scale-105"
        />
        {secondImage && (
          <Media
            image={secondImage}
            sizes={sizes}
            className="pointer-events-none opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        )}

        <Link href={href} className="absolute inset-0 z-10" aria-label={product.title} />

        {badge && (
          <div className="pointer-events-none absolute left-3 top-3 z-20">
            <Badge variant={badge.variant}>{badge.label}</Badge>
          </div>
        )}

        {siteConfig.features.wishlist && (
          <button
            type="button"
            onClick={() => toggleWish(product.id)}
            aria-pressed={isWished}
            aria-label={isWished ? "Remove from wishlist" : "Add to wishlist"}
            className="absolute right-3 top-3 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/70 text-foreground backdrop-blur transition-colors hover:bg-background"
          >
            <Heart
              size={16}
              strokeWidth={1.5}
              className={cn(isWished && "fill-accent text-accent")}
            />
          </button>
        )}

        {siteConfig.features.quickView && (
          <div className="absolute inset-x-3 bottom-3 z-20 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 max-md:hidden">
            <Button
              variant="secondary"
              size="sm"
              className="w-full bg-background/90 backdrop-blur hover:bg-background"
              onClick={() => openQuickView(product)}
            >
              Quick view
            </Button>
          </div>
        )}
      </div>

      <div className="mt-3.5">
        <p className="text-[0.7rem] uppercase tracking-[0.15em] text-muted-foreground">
          {product.categories[0]}
        </p>
        <h3 className="mt-1 text-sm font-medium">
          <Link href={href} className="transition-colors hover:text-accent">
            {product.title}
          </Link>
        </h3>
        <div className="mt-1.5 flex items-center justify-between gap-2">
          <Price price={product.price} compareAtPrice={product.compareAtPrice} className="text-sm" />
          {typeof product.rating === "number" && (
            <RatingStars rating={product.rating} showCount={false} />
          )}
        </div>
      </div>
    </article>
  );
}
