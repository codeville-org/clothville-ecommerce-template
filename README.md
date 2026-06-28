# Clothville — Luxury E-commerce Template

A premium, **frontend-first and backend-agnostic** storefront template for
fashion & luxury clothing brands, built with **Next.js 16**, **React 19**,
**TypeScript** and **Tailwind CSS v4**.

It runs end-to-end out of the box on bundled mock data — no backend, no API keys —
and connects to any real backend (Medusa, Supabase, custom REST, …) by
implementing **one adapter interface**. No UI changes required.

- **Editorial, bespoke design** — not a recognizable component-library default
- **Light & dark themes**, fully token-driven (re-theme from one file)
- **Complete storefront**: home, shop/PLP with filtering, PDP, cart, multi-step
  checkout (UI), wishlist, search, account, editorial & policy pages
- **Marketplace-grade**: strict TypeScript (zero `any`), accessible, SEO + JSON-LD,
  `next/image` everywhere, clean `build` & `lint`
- **License-clean**: only redistributable fonts/icons; no copyrighted imagery

> 📚 Full guides live in [`docs/`](docs/). Start with
> [docs/getting-started.md](docs/getting-started.md).

---

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router) · React 19 |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 (CSS-first `@theme` tokens — no config file) |
| State | Zustand (persisted) |
| Primitives | `radix-ui` (bespoke components built on top) |
| Animation | `motion` (honours `prefers-reduced-motion`) |
| Icons | `lucide-react` |
| Toasts | `sonner` · Theme: `next-themes` |
| Fonts | Playfair Display + Jost via `next/font` (OFL) |

## Requirements

- **Node.js 20.9+** (or 18.18+)
- npm (or your preferred package manager)

## Quick start

```bash
npm install
cp .env.example .env.local   # optional — sensible defaults work as-is
npm run dev                  # http://localhost:3000
```

Build & verify for production:

```bash
npm run build   # must pass clean
npm run lint    # must pass clean
npm run start   # serve the production build
```

## What's inside

```
src/
  app/                 App Router pages & routes (+ sitemap, robots, OG image)
  components/          ui/ (primitives) · layout/ · product/ · cart/ · shop/
                       checkout/ · account/ · marketing/ · common/ · seo/
  config/site.ts       Brand, navigation, footer, SEO, feature flags
  lib/
    commerce/          The backend seam (types, provider interface, mock provider)
    store/             Zustand stores (cart, wishlist, ui, auth)
    content/           Editorial content (policies, FAQ)
    shop/ · utils/ · hooks/
public/demo/           License-clean placeholder imagery
docs/                  Buyer documentation
```

See [docs/project-structure.md](docs/project-structure.md) for the full map.

## Three things to know

**1. All data flows through `@/lib/commerce`.** Pages and components never import
a backend SDK. To use a real backend, implement the `CommerceProvider` interface
once and register it — see [docs/connect-a-backend.md](docs/connect-a-backend.md).

**2. Re-theme from design tokens.** Every colour, font and key spacing value is a
CSS variable in [`src/app/globals.css`](src/app/globals.css). Brand name, nav,
footer and content live in [`src/config/site.ts`](src/config/site.ts). See
[docs/theming.md](docs/theming.md).

**3. Demo data & imagery are swappable.** Products live in
`src/lib/commerce/providers/mock/data/`; imagery is documented in
[docs/demo-data-and-images.md](docs/demo-data-and-images.md).

## Documentation

- [Getting started](docs/getting-started.md)
- [Project structure](docs/project-structure.md)
- [Theming & customization](docs/theming.md)
- [Connect a backend](docs/connect-a-backend.md)
- [Demo data & images](docs/demo-data-and-images.md)
- [Deployment](docs/deployment.md)
- [Changelog](docs/changelog.md)

## License

This is a commercial template. Your purchase grants the rights described in
[`LICENSE`](LICENSE). Third-party open-source dependencies and assets are
disclosed in [`CREDITS.md`](CREDITS.md) — all are redistributable.
