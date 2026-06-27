import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/common/container";
import { SocialIcon } from "@/components/icons/social-icons";
import { NewsletterForm } from "@/components/marketing/newsletter-form";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card text-card-foreground">
      {siteConfig.features.newsletter && (
        <div className="border-b border-border">
          <Container className="grid gap-6 py-14 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl">Join the atelier</h2>
              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                Be first to receive new collections, private previews and editorial stories.
              </p>
            </div>
            <div className="md:justify-self-end">
              <NewsletterForm />
            </div>
          </Container>
        </div>
      )}

      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
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

          {siteConfig.footer.columns.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <h2 className="font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {column.heading}
              </h2>
              <ul className="mt-4 space-y-2.5 text-sm">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-foreground/80 transition-colors hover:text-foreground">
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
                <Link href={link.href} className="transition-colors hover:text-foreground">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
