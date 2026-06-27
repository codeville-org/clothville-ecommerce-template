"use client";

import Link from "next/link";
import type { Product } from "@/lib/commerce";
import { useUI } from "@/lib/store/ui";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Media } from "@/components/common/media";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { Price } from "./price";
import { RatingStars } from "./rating-stars";
import { VariantSelector, useVariantSelection } from "./variant-selector";

function QuickViewBody({ product, onClose }: { product: Product; onClose: () => void }) {
  const { selected, select, variant } = useVariantSelection(product);
  const soldOut = variant ? !variant.available : false;

  return (
    <div className="grid sm:grid-cols-2">
      <div className="relative hidden aspect-[4/5] bg-muted sm:block">
        <Media image={product.images[0]} sizes="(min-width:640px) 24rem, 100vw" />
      </div>

      <div className="flex flex-col gap-4 p-6">
        <div>
          <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
            {product.categories[0]}
          </p>
          <DialogTitle className="mt-1">{product.title}</DialogTitle>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <Price
              price={variant?.price ?? product.price}
              compareAtPrice={variant?.compareAtPrice ?? product.compareAtPrice}
            />
            {typeof product.rating === "number" && (
              <RatingStars rating={product.rating} count={product.reviewCount} />
            )}
          </div>
        </div>

        <DialogDescription className="line-clamp-3">{product.description}</DialogDescription>

        <VariantSelector product={product} selected={selected} onSelect={select} />

        <div className="mt-auto space-y-2 pt-2">
          <AddToCartButton
            variantId={variant?.available ? variant.id : undefined}
            disabled={soldOut}
            onAdded={onClose}
            label={soldOut ? "Sold out" : "Add to bag"}
            className="w-full"
          />
          <Link
            href={`/products/${product.slug}`}
            onClick={onClose}
            className="block text-center text-xs uppercase tracking-[0.15em] text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            View full details
          </Link>
        </div>
      </div>
    </div>
  );
}

/** Global quick-view modal, driven by the UI store. Mounted once in Providers. */
export function QuickView() {
  const product = useUI((s) => s.quickViewProduct);
  const close = useUI((s) => s.closeQuickView);

  return (
    <Dialog open={Boolean(product)} onOpenChange={(next) => !next && close()}>
      {product && (
        <DialogContent className="max-w-3xl overflow-hidden p-0">
          <QuickViewBody product={product} onClose={close} />
        </DialogContent>
      )}
    </Dialog>
  );
}
