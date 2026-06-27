/**
 * ─────────────────────────────────────────────────────────────────────────
 *  SITE CONFIG — the single place to re-brand the storefront.
 *
 *  Change the brand name, navigation, footer, contact details, social links,
 *  announcement bar, SEO defaults and feature flags here. Colours and fonts
 *  live in src/app/globals.css (design tokens) and src/app/layout.tsx (fonts).
 *
 *  This file is data-only (no React imports) so it can be used on the server
 *  and in metadata. Icon fields are string keys mapped to components in the UI.
 * ─────────────────────────────────────────────────────────────────────────
 */

export interface NavLink {
  label: string;
  href: string;
}

export interface MegaMenuColumn {
  heading: string;
  links: NavLink[];
}

export interface NavItem extends NavLink {
  /** When present, this nav item renders a mega-menu instead of a plain link. */
  columns?: MegaMenuColumn[];
  /** Optional promotional tile shown alongside the mega-menu columns. */
  feature?: { label: string; caption?: string; href: string };
}

export interface FooterColumn {
  heading: string;
  links: NavLink[];
}

export interface SocialLink {
  label: string;
  href: string;
  /** Icon key, mapped to a lucide-react icon in the footer component. */
  icon: "instagram" | "facebook" | "twitter" | "youtube" | "pinterest";
}

export const siteConfig = {
  name: "CODEVILLE",
  shortName: "Codeville",
  tagline: "Considered luxury, quietly made.",
  description:
    "Codeville is a premium fashion house offering editorial, slow-made clothing — coats, knitwear, tailoring and silk, crafted to last beyond the season.",
  /** Used for absolute URLs in metadata, sitemap and structured data. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://codeville.example.com",
  locale: "en-US",
  currency: "USD",

  /** Text logo by default; swap for an <Image> in the Logo component if desired. */
  logo: { text: "CODEVILLE" },

  contact: {
    email: "atelier@codeville.example.com",
    phone: "+1 (212) 555-0100",
    address: "55 Mercer Street, New York, NY 10013",
  },

  socials: [
    { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
    { label: "Pinterest", href: "https://pinterest.com", icon: "pinterest" },
    { label: "Facebook", href: "https://facebook.com", icon: "facebook" },
    { label: "YouTube", href: "https://youtube.com", icon: "youtube" },
  ] satisfies SocialLink[],

  /** Rotating messages in the top announcement bar. */
  announcements: [
    "Complimentary carbon-neutral shipping on every order",
    "New Season — The Winter Atelier is now live",
    "Sign up for 15% off your first order — code WELCOME15",
  ],

  /** Toggle major surfaces on/off without touching code elsewhere. */
  features: {
    darkMode: true,
    quickView: true,
    wishlist: true,
    search: true,
    reviews: true,
    announcementBar: true,
    newsletter: true,
  },

  /** Primary navigation (header). Items with `columns` render a mega-menu. */
  nav: [
    { label: "New In", href: "/collections/new-arrivals" },
    {
      label: "Clothing",
      href: "/shop",
      columns: [
        {
          heading: "Shop by Category",
          links: [
            { label: "Outerwear", href: "/collections/outerwear" },
            { label: "Knitwear", href: "/collections/knitwear" },
            { label: "Tailoring", href: "/collections/tailoring" },
            { label: "Dresses", href: "/collections/dresses" },
          ],
        },
        {
          heading: "Edits",
          links: [
            { label: "New Arrivals", href: "/collections/new-arrivals" },
            { label: "Editor's Edit", href: "/collections/featured" },
            { label: "Essentials", href: "/collections/essentials" },
            { label: "View All", href: "/shop" },
          ],
        },
      ],
      feature: {
        label: "The Winter Atelier",
        caption: "Coats & cashmere for the season",
        href: "/collections/outerwear",
      },
    },
    { label: "Accessories", href: "/collections/accessories" },
    {
      label: "World",
      href: "/about",
      columns: [
        {
          heading: "The House",
          links: [
            { label: "About", href: "/about" },
            { label: "Lookbook", href: "/lookbook" },
            { label: "Contact", href: "/contact" },
          ],
        },
        {
          heading: "Help",
          links: [
            { label: "FAQ", href: "/faq" },
            { label: "Shipping", href: "/policies/shipping" },
            { label: "Returns", href: "/policies/returns" },
          ],
        },
      ],
    },
  ] satisfies NavItem[],

  /** Footer link columns. */
  footer: {
    columns: [
      {
        heading: "Shop",
        links: [
          { label: "New Arrivals", href: "/collections/new-arrivals" },
          { label: "Outerwear", href: "/collections/outerwear" },
          { label: "Knitwear", href: "/collections/knitwear" },
          { label: "Dresses", href: "/collections/dresses" },
          { label: "Accessories", href: "/collections/accessories" },
        ],
      },
      {
        heading: "Help",
        links: [
          { label: "Contact", href: "/contact" },
          { label: "FAQ", href: "/faq" },
          { label: "Shipping", href: "/policies/shipping" },
          { label: "Returns", href: "/policies/returns" },
        ],
      },
      {
        heading: "The House",
        links: [
          { label: "About", href: "/about" },
          { label: "Lookbook", href: "/lookbook" },
          { label: "Account", href: "/account" },
          { label: "Wishlist", href: "/wishlist" },
        ],
      },
    ] satisfies FooterColumn[],
    legalLinks: [
      { label: "Privacy Policy", href: "/policies/privacy" },
      { label: "Terms of Service", href: "/policies/terms" },
      { label: "Cookie Policy", href: "/policies/cookies" },
    ] satisfies NavLink[],
  },

  seo: {
    titleTemplate: "%s — CODEVILLE",
    defaultTitle: "CODEVILLE — Considered Luxury Clothing",
    ogImage: "/og-default.jpg",
    twitterHandle: "@codeville",
  },
} as const;

export type SiteConfig = typeof siteConfig;
