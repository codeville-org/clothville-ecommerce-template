"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/store/cart";
import { useHydrated } from "@/lib/hooks/use-hydrated";
import { EmptyState } from "@/components/common/empty-state";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CartLineItem } from "./cart-line-item";
import { CartSummary } from "./cart-summary";
import { PromoCode } from "./promo-code";

function CartViewSkeleton() {
  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_22rem]">
      <div className="space-y-6 border-y border-border py-6">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="flex gap-4">
            <Skeleton className="aspect-[4/5] w-20" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-3 w-1/4" />
            </div>
          </div>
        ))}
      </div>
      <Skeleton className="h-72 w-full" />
    </div>
  );
}

/** Full shopping-bag page body. */
export function CartView() {
  const hydrated = useHydrated();
  const cart = useCart((s) => s.cart);
  const lines = cart?.lines ?? [];

  if (!hydrated) return <CartViewSkeleton />;

  if (lines.length === 0) {
    return (
      <EmptyState
        icon={ShoppingBag}
        title="Your bag is empty"
        description="Discover considered, slow-made pieces to begin your wardrobe."
        action={{ label: "Continue shopping", href: "/shop" }}
      />
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_22rem]">
      <ul className="divide-y divide-border border-y border-border">
        {lines.map((line) => (
          <li key={line.id} className="py-6">
            <CartLineItem line={line} />
          </li>
        ))}
      </ul>

      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="space-y-5 border border-border p-6">
          <h2 className="font-serif text-xl">Order Summary</h2>
          <PromoCode />
          {cart && <CartSummary cart={cart} />}
          <Button asChild className="w-full">
            <Link href="/checkout">Proceed to checkout</Link>
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            Try code <span className="font-medium text-foreground">LUXE10</span> for 10% off
          </p>
        </div>
      </aside>
    </div>
  );
}
