"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Heart, Menu, Search, User } from "lucide-react";
import { siteConfig, type NavItem } from "@/config/site";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils/cn";

function MobileNavGroup({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const links = item.columns?.flatMap((c) => c.links) ?? [];

  return (
    <li className="border-b border-border">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-4 text-sm uppercase tracking-[0.12em]"
      >
        {item.label}
        <ChevronDown
          size={16}
          strokeWidth={1.5}
          className={cn("transition-transform", open && "rotate-180")}
        />
      </button>
      {open && (
        <ul className="space-y-1 pb-4 pl-1">
          {links.map((link) => (
            <li key={link.href}>
              <SheetClose asChild>
                <Link
                  href={link.href}
                  className="block py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </SheetClose>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

const QUICK_LINKS = [
  { label: "Search", href: "/search", icon: Search },
  { label: "Account", href: "/account", icon: User },
  { label: "Wishlist", href: "/wishlist", icon: Heart },
];

/** Mobile navigation drawer with its own hamburger trigger (md:hidden). */
export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className="inline-flex h-9 w-9 items-center justify-center rounded-sm text-foreground/80 transition-colors hover:text-foreground md:hidden"
        >
          <Menu size={20} strokeWidth={1.5} />
        </button>
      </SheetTrigger>

      <SheetContent side="left" className="w-full max-w-xs">
        <SheetHeader>
          <SheetTitle className="text-base tracking-[0.3em]">{siteConfig.logo.text}</SheetTitle>
        </SheetHeader>

        <nav className="flex-1 overflow-y-auto px-6 py-2">
          <ul>
            {siteConfig.nav.map((item) =>
              item.columns ? (
                <MobileNavGroup key={item.label} item={item} />
              ) : (
                <li key={item.label} className="border-b border-border">
                  <SheetClose asChild>
                    <Link
                      href={item.href}
                      className="block py-4 text-sm uppercase tracking-[0.12em]"
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                </li>
              ),
            )}
          </ul>

          <ul className="mt-6 space-y-1">
            {QUICK_LINKS.map(({ label, href, icon: Icon }) => (
              <li key={href}>
                <SheetClose asChild>
                  <Link
                    href={href}
                    className="flex items-center gap-3 py-2 text-sm text-foreground/80 transition-colors hover:text-foreground"
                  >
                    <Icon size={17} strokeWidth={1.5} />
                    {label}
                  </Link>
                </SheetClose>
              </li>
            ))}
          </ul>
        </nav>

        {siteConfig.features.darkMode && (
          <div className="flex items-center justify-between border-t border-border px-6 py-4">
            <span className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Theme</span>
            <ThemeToggle />
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
