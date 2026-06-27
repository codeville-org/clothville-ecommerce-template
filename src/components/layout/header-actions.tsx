"use client";

import Link from "next/link";
import { Heart, Search, ShoppingBag, User } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useCart } from "@/lib/store/cart";
import { useWishlist } from "@/lib/store/wishlist";
import { useUI } from "@/lib/store/ui";
import { useHydrated } from "@/lib/hooks/use-hydrated";
import { cn } from "@/lib/utils/cn";
import { ThemeToggle } from "./theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ICON_BTN =
  "relative inline-flex h-9 w-9 items-center justify-center rounded-sm text-foreground/80 transition-colors hover:text-foreground";

function CountBadge({ n }: { n: number }) {
  return (
    <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[0.6rem] font-medium leading-none text-accent-foreground">
      {n}
    </span>
  );
}

function AccountMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button" aria-label="Account" className={cn(ICON_BTN, "hidden sm:inline-flex")}>
          <User size={18} strokeWidth={1.5} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <Link href="/account">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/account/orders">Orders</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/account/addresses">Addresses</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/login">Sign in</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/** Header right-side actions: search, account, wishlist, cart, theme. */
export function HeaderActions() {
  const hydrated = useHydrated();
  const cartCount = useCart((s) => s.cart?.itemCount ?? 0);
  const wishCount = useWishlist((s) => s.ids.length);
  const openCart = useUI((s) => s.openCartDrawer);

  return (
    <div className="flex items-center gap-0.5">
      {siteConfig.features.search && (
        <Link href="/search" aria-label="Search" className={ICON_BTN}>
          <Search size={18} strokeWidth={1.5} />
        </Link>
      )}

      <AccountMenu />

      {siteConfig.features.wishlist && (
        <Link href="/wishlist" aria-label="Wishlist" className={cn(ICON_BTN, "hidden sm:inline-flex")}>
          <Heart size={18} strokeWidth={1.5} />
          {hydrated && wishCount > 0 && <CountBadge n={wishCount} />}
        </Link>
      )}

      <button
        type="button"
        onClick={openCart}
        aria-label={hydrated && cartCount > 0 ? `Bag, ${cartCount} items` : "Bag"}
        className={ICON_BTN}
      >
        <ShoppingBag size={18} strokeWidth={1.5} />
        {hydrated && cartCount > 0 && <CountBadge n={cartCount} />}
      </button>

      {siteConfig.features.darkMode && <ThemeToggle className="hidden sm:inline-flex" />}
    </div>
  );
}
