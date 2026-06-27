"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { formatMoney } from "@/lib/commerce";
import { siteConfig } from "@/config/site";
import { useUI } from "@/lib/store/ui";
import { useCart } from "@/lib/store/cart";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { CartLineItem } from "./cart-line-item";

/** Slide-in cart, opened from the header cart button via the UI store. */
export function CartDrawer() {
  const open = useUI((s) => s.cartDrawerOpen);
  const closeCart = useUI((s) => s.closeCartDrawer);
  const cart = useCart((s) => s.cart);

  const lines = cart?.lines ?? [];
  const count = cart?.itemCount ?? 0;

  return (
    <Sheet
      open={open}
      onOpenChange={(next) => {
        if (!next) closeCart();
      }}
    >
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Your Bag{count > 0 ? ` (${count})` : ""}</SheetTitle>
        </SheetHeader>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 px-6 text-center">
            <ShoppingBag size={30} strokeWidth={1} className="text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Your bag is currently empty.</p>
            <SheetClose asChild>
              <Button asChild variant="outline">
                <Link href="/shop">Continue shopping</Link>
              </Button>
            </SheetClose>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-6 overflow-y-auto px-6 py-5">
              {lines.map((line) => (
                <CartLineItem key={line.id} line={line} onNavigate={closeCart} />
              ))}
            </div>
            <SheetFooter className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium tabular-nums">
                  {cart ? formatMoney(cart.subtotal, siteConfig.locale) : ""}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Shipping & taxes calculated at checkout.
              </p>
              <div className="grid gap-2">
                <SheetClose asChild>
                  <Button asChild className="w-full">
                    <Link href="/checkout">Checkout</Link>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/cart">View bag</Link>
                  </Button>
                </SheetClose>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
