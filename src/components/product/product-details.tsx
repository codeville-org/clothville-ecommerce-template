"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import type { Product } from "@/lib/commerce";
import { useWishlist } from "@/lib/store/wishlist";
import { useHydrated } from "@/lib/hooks/use-hydrated";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils/cn";
import { QuantityStepper } from "@/components/common/quantity-stepper";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Price } from "./price";
import { RatingStars } from "./rating-stars";
import { VariantSelector, useVariantSelection } from "./variant-selector";
import { SizeGuide } from "./size-guide";

/** The PDP buy-box: variant selection, quantity, add to cart, details. Sticky on desktop. */
export function ProductDetails({ product }: { product: Product }) {
  const { selected, select, variant } = useVariantSelection(product);
  const [quantity, setQuantity] = useState(1);
  const hydrated = useHydrated();
  const wished = useWishlist((s) => s.ids.includes(product.id));
  const toggleWish = useWishlist((s) => s.toggle);
  const isWished = hydrated && wished;

  const soldOut = variant ? !variant.available : product.variants.every((v) => !v.available);
  const hasSizeOption = product.options.some((o) => o.name === "Size");

  return (
    <div className="lg:sticky lg:top-28 lg:self-start">
      <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
        {product.categories[0]}
      </p>
      <h1 className="mt-2 font-serif text-3xl sm:text-4xl">{product.title}</h1>
      {product.subtitle && <p className="mt-1 text-muted-foreground">{product.subtitle}</p>}

      <div className="mt-4 flex flex-wrap items-center gap-4">
        <Price
          price={variant?.price ?? product.price}
          compareAtPrice={variant?.compareAtPrice ?? product.compareAtPrice}
          showDiscount
          className="text-lg"
        />
        {typeof product.rating === "number" && (
          <a href="#reviews" className="transition-opacity hover:opacity-80">
            <RatingStars rating={product.rating} count={product.reviewCount} />
          </a>
        )}
      </div>

      <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{product.description}</p>

      <div className="mt-7">
        {hasSizeOption && product.sizeGuide && (
          <div className="mb-3 flex justify-end">
            <SizeGuide
              guide={product.sizeGuide}
              trigger={
                <button
                  type="button"
                  className="text-xs uppercase tracking-[0.1em] text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                >
                  Size guide
                </button>
              }
            />
          </div>
        )}
        <VariantSelector product={product} selected={selected} onSelect={select} />
      </div>

      <div className="mt-7 flex items-center gap-3">
        <QuantityStepper value={quantity} onChange={setQuantity} max={10} />
        <AddToCartButton
          variantId={variant?.available ? variant.id : undefined}
          quantity={quantity}
          disabled={soldOut}
          label={soldOut ? "Sold out" : "Add to bag"}
          size="lg"
          className="flex-1"
        />
        {siteConfig.features.wishlist && (
          <button
            type="button"
            onClick={() => toggleWish(product.id)}
            aria-pressed={isWished}
            aria-label={isWished ? "Remove from wishlist" : "Add to wishlist"}
            className="inline-flex h-12 w-12 shrink-0 items-center justify-center border border-border transition-colors hover:bg-muted"
          >
            <Heart size={18} strokeWidth={1.5} className={cn(isWished && "fill-accent text-accent")} />
          </button>
        )}
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        Complimentary shipping & returns · Crafted to last
      </p>

      {product.details && product.details.length > 0 && (
        <Accordion type="single" collapsible className="mt-8">
          {product.details.map((detail, i) => (
            <AccordionItem key={detail.title} value={`detail-${i}`}>
              <AccordionTrigger>{detail.title}</AccordionTrigger>
              <AccordionContent>{detail.content}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
}
