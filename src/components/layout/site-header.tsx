import Link from "next/link";
import { Heart, Menu, Search, ShoppingBag, User } from "lucide-react";
import { siteConfig } from "@/config/site";
import { ThemeToggle } from "./theme-toggle";

/**
 * PHASE 1 PLACEHOLDER HEADER.
 * A clean three-column editorial bar (nav · logo · actions). The full version
 * with mega-menu, mobile drawer and a live cart badge arrives in Phase 2.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40">
      {siteConfig.features.announcementBar && (
        <div className="bg-foreground px-4 py-2 text-center text-[0.7rem] uppercase tracking-[0.2em] text-background">
          {siteConfig.announcements[0]}
        </div>
      )}

      <div className="border-b border-border bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-editorial items-center justify-between gap-6 px-4 sm:px-6">
          {/* Left: primary nav (desktop) / menu (mobile) */}
          <nav className="hidden flex-1 items-center gap-7 text-xs uppercase tracking-[0.15em] md:flex">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-foreground/80 transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            aria-label="Open menu"
            className="inline-flex h-9 w-9 items-center justify-center rounded-sm text-foreground/80 hover:text-foreground md:hidden"
          >
            <Menu size={20} strokeWidth={1.5} />
          </button>

          {/* Center: wordmark */}
          <Link
            href="/"
            className="font-serif text-xl tracking-[0.35em] text-foreground sm:text-2xl"
            aria-label={`${siteConfig.name} home`}
          >
            {siteConfig.logo.text}
          </Link>

          {/* Right: actions */}
          <div className="flex flex-1 items-center justify-end gap-0.5">
            <Link
              href="/search"
              aria-label="Search"
              className="inline-flex h-9 w-9 items-center justify-center rounded-sm text-foreground/80 hover:text-foreground"
            >
              <Search size={18} strokeWidth={1.5} />
            </Link>
            <Link
              href="/account"
              aria-label="Account"
              className="hidden h-9 w-9 items-center justify-center rounded-sm text-foreground/80 hover:text-foreground sm:inline-flex"
            >
              <User size={18} strokeWidth={1.5} />
            </Link>
            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="inline-flex h-9 w-9 items-center justify-center rounded-sm text-foreground/80 hover:text-foreground"
            >
              <Heart size={18} strokeWidth={1.5} />
            </Link>
            <Link
              href="/cart"
              aria-label="Cart"
              className="inline-flex h-9 w-9 items-center justify-center rounded-sm text-foreground/80 hover:text-foreground"
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
            </Link>
            {siteConfig.features.darkMode && <ThemeToggle />}
          </div>
        </div>
      </div>
    </header>
  );
}
