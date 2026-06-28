"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/common/container";
import { cn } from "@/lib/utils/cn";

const LINK = "text-xs uppercase tracking-[0.15em] text-foreground/80 transition-colors hover:text-foreground";

/**
 * Desktop primary nav with full-width mega-menu panels. Panels are positioned
 * against the (relative) header bar, opening on hover/focus and closing on
 * mouse-leave, Escape, or navigation. Hidden below the md breakpoint.
 */
export function DesktopNav() {
  const [openLabel, setOpenLabel] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const open = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenLabel(label);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenLabel(null), 120);
  };
  const close = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenLabel(null);
  };

  return (
    <nav
      aria-label="Primary"
      className="hidden md:block"
      onMouseLeave={scheduleClose}
      onKeyDown={(e) => {
        if (e.key === "Escape") close();
      }}
    >
      <ul className="flex items-center gap-7">
        {siteConfig.nav.map((item) => (
          <li
            key={item.label}
            onMouseEnter={() => (item.columns ? open(item.label) : setOpenLabel(null))}
          >
            {item.columns ? (
              <button
                type="button"
                className={cn(LINK, "inline-flex items-center gap-1", openLabel === item.label && "text-foreground")}
                aria-expanded={openLabel === item.label}
                onFocus={() => open(item.label)}
                onClick={() => setOpenLabel((l) => (l === item.label ? null : item.label))}
              >
                {item.label}
                <ChevronDown
                  size={13}
                  strokeWidth={1.5}
                  className={cn("transition-transform", openLabel === item.label && "rotate-180")}
                />
              </button>
            ) : (
              <Link href={item.href} className={LINK} onClick={close}>
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>

      {siteConfig.nav
        .filter((item) => item.columns)
        .map((item) => (
          <div
            key={item.label}
            hidden={openLabel !== item.label}
            onMouseEnter={() => open(item.label)}
            className="absolute inset-x-0 top-full border-b border-border bg-background shadow-xl motion-safe:animate-fade-in"
          >
            <Container className="flex gap-12 py-10">
              {item.columns?.map((column) => (
                <div key={column.heading} className="min-w-40">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {column.heading}
                  </p>
                  <ul className="mt-4 space-y-2.5">
                    {column.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={close}
                          className="text-sm text-foreground/80 transition-colors hover:text-accent"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {item.feature && (
                <Link
                  href={item.feature.href}
                  onClick={close}
                  className="ml-auto flex min-h-44 w-72 flex-col justify-end bg-muted p-6 transition-colors hover:bg-secondary"
                >
                  <span className="font-serif text-xl">{item.feature.label}</span>
                  {item.feature.caption && (
                    <span className="mt-1 text-xs text-muted-foreground">{item.feature.caption}</span>
                  )}
                  <span className="mt-3 inline-flex items-center gap-1 text-xs uppercase tracking-[0.15em]">
                    Discover <ArrowRight size={13} strokeWidth={1.5} />
                  </span>
                </Link>
              )}
            </Container>
          </div>
        ))}
    </nav>
  );
}
