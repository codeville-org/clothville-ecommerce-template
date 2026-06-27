import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/common/container";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { AnnouncementBar } from "./announcement-bar";
import { DesktopNav } from "./desktop-nav";
import { MobileNav } from "./mobile-nav";
import { HeaderActions } from "./header-actions";

/**
 * Sticky site header: announcement bar, three-column bar (nav · wordmark ·
 * actions) with a full-width mega-menu, and the cart drawer. The bar is the
 * positioning context for the desktop mega-menu panels, so it is `relative`.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40">
      {siteConfig.features.announcementBar && <AnnouncementBar />}

      <div className="relative border-b border-border bg-background/85 backdrop-blur-md">
        <Container className="flex h-16 items-center justify-between gap-4">
          <div className="flex flex-1 items-center gap-1">
            <MobileNav />
            <DesktopNav />
          </div>

          <Link
            href="/"
            aria-label={`${siteConfig.name} home`}
            className="shrink-0 font-serif text-xl tracking-[0.35em] text-foreground sm:text-2xl"
          >
            {siteConfig.logo.text}
          </Link>

          <div className="flex flex-1 justify-end">
            <HeaderActions />
          </div>
        </Container>
      </div>

      <CartDrawer />
    </header>
  );
}
