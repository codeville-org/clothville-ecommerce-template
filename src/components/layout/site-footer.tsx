import Link from "next/link";
import { siteConfig } from "@/config/site";
import { SocialIcon } from "@/components/icons/social-icons";

/**
 * PHASE 1 PLACEHOLDER FOOTER.
 * Link columns + socials + legal, driven entirely by siteConfig. The styled
 * newsletter form and richer layout arrive in Phase 2.
 */
export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card text-card-foreground">
      <div className="mx-auto max-w-editorial px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          {/* Brand */}
          <div>
            <p className="font-serif text-2xl tracking-[0.3em]">{siteConfig.logo.text}</p>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">{siteConfig.tagline}</p>
            <div className="mt-6 flex gap-3">
              {siteConfig.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-border text-foreground/70 transition-colors hover:text-foreground"
                >
                  <SocialIcon name={social.icon} size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {siteConfig.footer.columns.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <h2 className="font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {column.heading}
              </h2>
              <ul className="mt-4 space-y-2.5 text-sm">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-foreground/80 hover:text-foreground">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {siteConfig.footer.legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-foreground">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
