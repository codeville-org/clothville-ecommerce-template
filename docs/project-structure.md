# Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout: fonts, providers, header/footer, SEO
│   ├── page.tsx                  # Home
│   ├── globals.css               # Design tokens (light + dark) + base styles
│   ├── loading.tsx · error.tsx · not-found.tsx
│   ├── sitemap.ts · robots.ts · opengraph-image.tsx · icon.tsx
│   ├── (shop)/                   # Route group (no URL segment)
│   │   ├── shop/                 # /shop — all-products listing
│   │   ├── collections/          # /collections, /collections/[handle]
│   │   └── products/[slug]/      # /products/[slug] — PDP (SSG)
│   ├── (account)/                # /login, /register, /forgot-password, /account/*
│   ├── (marketing)/              # /about, /lookbook, /contact, /faq, /policies/[slug]
│   ├── cart/ · checkout/ · search/ · wishlist/
│
├── components/
│   ├── ui/                       # Bespoke primitives built on radix-ui
│   ├── layout/                   # Header, mega-menu, mobile nav, footer, theme toggle
│   ├── product/                  # Card, grid, gallery, variant selector, quick view…
│   ├── cart/                     # Cart drawer, line item, summary, add-to-cart
│   ├── shop/                     # Filter panel, sort, pagination, listing
│   ├── checkout/                 # Multi-step flow, order summary
│   ├── account/                  # Auth forms, profile, orders, addresses
│   ├── marketing/                # Newsletter, contact form
│   ├── seo/                      # JSON-LD helpers
│   ├── common/                   # Container, reveal, breadcrumbs, media, field…
│   ├── icons/                    # Original social glyphs
│   └── providers.tsx             # Theme + toaster + quick-view + store init
│
├── config/
│   └── site.ts                   # Brand, nav/mega-menu, footer, socials, SEO, flags
│
└── lib/
    ├── commerce/                 # THE BACKEND SEAM
    │   ├── types.ts              # Domain models (Product, Cart, Order, …)
    │   ├── provider.ts           # CommerceProvider interface
    │   ├── config.ts             # Selects active provider via env
    │   ├── index.ts              # Public API the app imports
    │   ├── format.ts             # Money helpers
    │   └── providers/
    │       ├── mock/             # Default offline provider + demo data
    │       └── README.md         # Write-your-own-provider guide
    ├── store/                    # Zustand: cart, wishlist, ui, auth
    ├── content/                  # policies.ts, faq.ts
    ├── shop/                     # URL ↔ ProductQuery helpers
    ├── hooks/ · utils/
public/demo/products/             # License-clean placeholder imagery
docs/                             # This documentation
```

## Conventions

- **Server Components by default.** A file is a Client Component only when it
  needs interactivity/state (marked `"use client"`).
- **Data only via `@/lib/commerce`.** No page or component imports a backend SDK.
- **Styling only via design tokens** (`bg-background`, `text-accent`, …) — never
  hardcoded colours.
- **Route groups** `(shop)`, `(account)`, `(marketing)` organize routes without
  affecting URLs.

## Where to add things

| Task | Location |
| --- | --- |
| New page | `src/app/.../page.tsx` (read data via `@/lib/commerce`) |
| New component | matching `src/components/<area>/` |
| New provider method | add to `provider.ts`, implement in `providers/mock/` |
| New demo product | seed array in `providers/mock/data/products.ts` |
| Re-brand | `src/config/site.ts` + `src/app/globals.css` |
