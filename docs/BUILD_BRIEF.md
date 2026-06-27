# Claude Code Starting Prompt — Codeville Luxury E-commerce Template

> Paste everything below the line into Claude Code from inside the project root
> (`codeville-ecommerce-template/`). It assumes the project is already initialized
> with Next.js 16 (App Router) + TypeScript + Tailwind v4 + ESLint + `src/` dir.

---

## Role & Mission

You are building a **commercial, resellable Next.js e-commerce frontend template** that I intend to sell on marketplaces like CodeCanyon and Gumroad. Quality, polish, documentation, and code cleanliness must be at the level marketplace reviewers and paying buyers expect. This is a **product**, not a demo.

The niche is a **premium / luxury clothing store**: editorial aesthetic, high-contrast typography, refined color, tasteful motion, flawless responsiveness, and a premium user experience throughout.

**This is a FRONTEND-FIRST template.** The single most important architectural goal is that the frontend is **fully functional with built-in mock data** but **backend-agnostic** — a buyer must be able to plug in their own backend (Medusa.js, Supabase, a custom Node/Express API, etc.) with minimal effort and without touching UI code. Do **not** build a real backend. Build a clean integration seam instead.

## Existing stack (respect this, do not change without asking)

- Next.js `16.2.9`, App Router, React `19.2.x`
- TypeScript (strict mode — enable it if not already)
- Tailwind CSS v4 (CSS-first config via `@theme`, no legacy `tailwind.config.js` unless needed)
- ESLint + `eslint-config-next`
- `src/` directory, import alias `@/*`
- Package manager: npm

> Next.js 16 and Tailwind v4 have newer APIs than older tutorials. Before using framework features, verify the current API against the official Next.js 16 and Tailwind v4 docs rather than relying on older patterns (e.g. async params/searchParams, the `metadata` API, `next/font`, Tailwind `@theme` tokens).

## Recommended libraries (use unless you have a clearly better reason — explain if so)

- **Motion** (`motion` / Framer Motion) for animation — must respect `prefers-reduced-motion`
- **Zustand** for client cart + wishlist state, persisted to `localStorage`, designed to optionally sync through the commerce provider
- **lucide-react** for icons (ISC license — license-clean)
- **next/font** with Google Fonts (OFL-licensed — safe to redistribute)
- A lightweight toast/notification primitive (e.g. `sonner`) — confirm license is permissive
- **Accessible interactive primitives:** build custom-styled components directly on **Radix UI primitives** (`@radix-ui/react-*`) for dialogs, drawers/sheets, dropdown & navigation menus, popover, accordion, tabs, tooltip, checkbox/radio, etc. **Do NOT use shadcn/ui** — the design must be bespoke and must not read as a recognizable component-library default. Style every primitive entirely with our own design tokens.
- Keep dependencies minimal and well-justified; every added package is a maintenance + licensing liability for buyers.

---

## CRITICAL: Backend-agnostic architecture

Design a **commerce provider (adapter) pattern**. All UI and pages consume data exclusively through this layer — never directly from any backend SDK.

```
src/lib/commerce/
  types.ts            # Domain models: Product, Variant, Option, Image, Collection,
                      #   Cart, CartLine, Customer, Address, Order, etc. (typed, no `any`)
  provider.ts         # The CommerceProvider interface every backend must implement
  config.ts           # Selects the active provider based on env / config
  index.ts            # Public API the app imports (getProducts, getProduct, getCart, …)
  providers/
    mock/             # DEFAULT provider — pure static/JSON data, fully working offline
      index.ts
      data/           # demo products, collections, etc.
    README.md         # "How to write your own provider" guide for buyers
```

Requirements for this layer:
- Define a single `CommerceProvider` TypeScript interface covering: catalog (list/get products, collections, search, filters, related), cart (create, get, add/update/remove line, apply discount), customer/auth (UI-level: login, register, profile, addresses, orders), and checkout session creation. Methods return the shared domain types only.
- Ship a complete **`mock` provider** so the template runs end-to-end with zero backend setup. This is what powers the live preview.
- The app picks the provider via config/env so swapping backends is a one-line change.
- All data access in pages/components goes through `@/lib/commerce` — **no UI file ever imports a backend SDK directly.**
- Document the seam thoroughly (see Documentation section). Include short stub/skeleton examples in the provider README showing roughly how a Medusa, Supabase, and custom-REST provider would map onto the interface, without fully implementing them.

Cart/wishlist: client-side Zustand stores, persisted, with an optimistic UI and a clear hook (`useCart`, `useWishlist`) that delegates persistence to the active provider when present.

---

## Design direction (luxury clothing)

Make it feel like a high-end fashion house, not a generic store. Avoid templated defaults.

- **Typography:** pair a high-contrast display serif (e.g. Playfair Display, Cormorant Garamond, or Libre Baskerville) for headings/editorial with a clean, modern sans (e.g. Jost, DM Sans, or Inter) for body/UI. Generous spacing, refined hierarchy, large editorial headings. Use only OFL/redistributable fonts via `next/font`.
- **Color:** restrained editorial neutral base — bone/off-white, soft charcoal, near-black — with a single tasteful accent (e.g. muted gold or deep wine). **All colors must be design tokens** (CSS variables / Tailwind `@theme`) so buyers re-theme the entire site from one place. Ship at least a light theme; structure tokens so dark mode is feasible.
- **Motion:** subtle and premium — scroll-reveal fades/slides, image hover zoom, smooth drawer/modal transitions, optional parallax hero, marquee for announcements. Never gimmicky. Always honor `prefers-reduced-motion`.
- **Imagery:** treat images as hero elements (large, editorial, aspect-ratio controlled via `next/image`). Use clearly-labeled placeholder/demo imagery and document that buyers must supply their own production images. Do **not** bundle any copyrighted/licensed images that can't be legally redistributed in a sold template — flag anything that needs a license.
- **Responsiveness:** mobile-first, flawless across breakpoints, with thoughtful mobile interactions (bottom-sheet filters, cart drawer, sticky add-to-cart on PDP).

---

## Scope — pages & features (complete clothing storefront)

**Pages (App Router):**
- Home — hero, featured collections, new arrivals, editorial/brand-story sections, lookbook teaser, newsletter
- Shop / Collection listing (PLP) — product grid, filtering (size, color, price, category), sorting, pagination or load-more, quick-view
- Product detail (PDP) — image gallery with zoom, variant selection (size + color), size guide, stock/availability, add to cart + wishlist, accordion details, related products, reviews UI
- Cart — both a slide-in drawer and a full cart page
- Checkout — multi-step UI (information → shipping → payment), order summary, promo code field — **UI only**, with clear provider hooks where a real payment/order step would attach
- Wishlist
- Search — results page + (optionally) a command-palette/quick search
- Account — login / register / forgot-password UI, profile, addresses, order history (driven by provider)
- Editorial/marketing — Lookbook, About, Contact, FAQ, Policies (shipping/returns/privacy/terms)
- 404 / error / loading states

**Shared components:** announcement bar, header with mega-menu, mobile nav drawer, footer, product card, filter panel/sidebar, sort control, cart drawer, quick-view modal, image gallery, variant/size selector, breadcrumbs, rating stars, newsletter form, toasts, and reusable skeleton loaders.

---

## Quality bar (marketplace-grade — non-negotiable)

- **TypeScript strict, zero `any`**, no unused code, no console errors/warnings.
- **Accessibility:** semantic HTML, keyboard navigation, visible focus states, ARIA where needed, sufficient contrast.
- **SEO:** Next `metadata` API per route, OpenGraph/Twitter tags, JSON-LD `Product` structured data on PDPs, sitemap, robots.
- **Performance:** `next/image` everywhere, lazy loading, code-splitting, target Lighthouse 90+ across the board.
- **Theming/config:** one obvious place to change brand name, logo, colors, fonts, and content. A central site config object + design tokens.
- **Clean structure:** modular, reusable, sensibly-named components with brief JSDoc/comments explaining intent and customization points.
- **License-clean:** only fonts/icons/assets that are legal to redistribute in a sold product. Flag anything requiring a buyer license. Include a `LICENSE`/usage note placeholder.
- Provide `.env.example`, sensible defaults, and ensure `npm run build` + `npm run lint` pass cleanly.

## Documentation (heavily weighted by marketplace reviewers)

Produce a thorough `README.md` plus a `docs/` folder covering: features, requirements, install/run, **project structure**, **theming & customization** (colors, fonts, branding, content config), **how to connect a backend** (the commerce provider guide with Medusa/Supabase/custom-REST mapping examples), how to replace demo data and images, deployment notes, and a changelog. Write for a buyer who is competent but unfamiliar with the codebase.

Also include a `CREDITS.md` (or a "Third-party licenses" section in the docs) listing every bundled open-source dependency and asset with its license — e.g. Radix UI (MIT), lucide-react (ISC), Google Fonts used (OFL), Motion, etc. Marketplaces like CodeCanyon require this disclosure, and it reassures buyers the template is legally clean to resell/use.

---

## How I want you to work

1. **Start with a plan, not code.** First propose: the full architecture, the `CommerceProvider` interface signature, the domain type list, the complete file/folder tree, the page list, and a phased build order. Wait for my approval before generating implementation files.
2. Then build in **reviewable phases**, e.g.:
   - Phase 1 — Foundation: design tokens/theme, fonts, global layout, `commerce` types + provider interface + mock provider + demo data, site config.
   - Phase 2 — Core UI components (header, footer, product card, cart drawer, etc.).
   - Phase 3 — Pages (Home → PLP → PDP → Cart → Checkout → Account → editorial).
   - Phase 4 — Polish: animations, a11y pass, SEO/structured data, loading/error states, skeletons.
   - Phase 5 — Documentation, `.env.example`, final lint/build verification.
3. Keep me in the loop at phase boundaries; don't dump the entire project in one shot.
4. Prioritize correctness and reusability over cleverness. If something is ambiguous, ask one focused question rather than guessing.
5. **Do not build a real backend.** Only the mock provider and the clean integration seam.

Begin with the plan (Step 1).
