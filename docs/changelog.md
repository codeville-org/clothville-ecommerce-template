# Changelog

All notable changes to this template are documented here. This project follows
[Semantic Versioning](https://semver.org/).

## 1.0.0 — Initial release

First public release.

### Storefront
- Home with editorial hero, new arrivals and featured collections
- Shop / collection listings with URL-driven filtering (category, size, colour,
  price), sorting, active-filter chips and pagination
- Product detail pages (SSG) with image gallery + zoom, variant selection, size
  guide, reviews, related products and product JSON-LD
- Cart drawer and full cart page with promo codes
- Multi-step checkout (UI) with order confirmation
- Wishlist, search, and a full account area (sign in/up, profile, orders,
  addresses)
- Editorial pages (about, lookbook, contact, FAQ) and policy pages
- Loading / error / not-found states

### Architecture
- Backend-agnostic `CommerceProvider` seam with a complete offline mock provider
- Zustand stores for cart, wishlist, UI and auth
- Central site config and CSS-token design system (light + dark)

### Quality
- Strict TypeScript (zero `any`), clean `build` and `lint`
- Accessible (keyboard, focus, ARIA, reduced-motion)
- SEO: per-route metadata, OpenGraph/Twitter, JSON-LD, sitemap, robots, generated
  OG image
- Bespoke components on `radix-ui`; `next/image` and `next/font` throughout
- License-clean dependencies and assets
