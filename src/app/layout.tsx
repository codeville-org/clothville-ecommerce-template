import type { Metadata, Viewport } from "next";
import { Jost, Playfair_Display } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { Providers } from "@/components/providers";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/seo/json-ld";

/** Editorial display serif for headings. */
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

/** Clean geometric sans for body and UI. */
const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.seo.defaultTitle,
    template: siteConfig.seo.titleTemplate,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.description,
    url: siteConfig.url,
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.seo.twitterHandle,
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.description,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f6f1" },
    { media: "(prefers-color-scheme: dark)", color: "#0e0c0a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${playfair.variable} ${jost.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground antialiased">
        <Providers>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
          >
            Skip to content
          </a>
          <SiteHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
          <OrganizationJsonLd />
          <WebSiteJsonLd />
        </Providers>
      </body>
    </html>
  );
}
