<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Codeville — Luxury E-commerce Template

This is a **commercial, resellable Next.js storefront template** (premium /
luxury clothing) sold on marketplaces. Treat it as a **product**: quality,
polish, documentation and licence-cleanliness must meet what paying buyers and
marketplace reviewers expect — not a demo.

It is **frontend-first and backend-agnostic**. The frontend runs fully on
built-in mock data, and a buyer plugs in their own backend (Medusa, Supabase,
custom REST, …) by implementing **one adapter interface**. **Do not build a real
backend.**

## Stack

- Next.js 16 (App Router) · React 19 · TypeScript (strict)
- Tailwind CSS v4 (CSS-first `@theme` tokens; no `tailwind.config.js`)
- State: Zustand (persisted) · Animation: `motion` · Icons: `lucide-react`
- Toasts: `sonner` · Theme: `next-themes` · Primitives: `radix-ui` (the unified
  package — we build bespoke components on it; **never** shadcn/ui)

> Verify Next 16 / Tailwind v4 APIs against `node_modules/next/dist/docs/` before
> coding. Notably: `params`/`searchParams`, `cookies()`/`headers()` and
> `generateMetadata` are **async (Promises)**; `fetch` is not cached by default.

## Golden rules (do not break these)

1. **Data only through `@/lib/commerce`.** No page or component may import a
   backend SDK or a specific provider. All catalog/cart/customer/checkout data
   flows through the `CommerceProvider` seam. Cart/wishlist use the Zustand
   stores in `src/lib/store/`, which themselves delegate to the provider.
2. **Style only with design tokens.** All colour, type and key spacing come from
   the CSS variables in `src/app/globals.css` (`bg-background`, `text-accent`,
   `border-border`, `font-serif`, …). **No hardcoded hex or one-off colours** —
   re-theming must work from the tokens alone. Dark mode is class-based; ensure
   new UI looks correct in both themes.
3. **Bespoke components on Radix.** Build custom-styled primitives on
   `radix-ui`. The design must never read as a component-library default.
4. **TypeScript strict, zero `any`.** No unused code, no `console` noise, no
   build/lint warnings. Prefer the shared domain types in
   `src/lib/commerce/types.ts`.
5. **Accessibility + motion.** Semantic HTML, keyboard support, visible focus
   (token-based ring), ARIA where needed. Every animation must honour
   `prefers-reduced-motion`.
6. **Licence-clean only.** Only fonts/icons/assets that are legal to redistribute
   in a sold template (OFL fonts, ISC/MIT icons). Never bundle copyrighted
   imagery. Flag anything that needs a buyer licence. Record dependencies in
   `CREDITS.md`.
7. **Determinism for SSG.** Demo data and rendering must be deterministic (no
   `Math.random`/`Date.now` in render or seed data) so static generation is
   stable.

## Architecture map

- `src/lib/commerce/` — the backend seam.
  - `types.ts` domain models · `provider.ts` the `CommerceProvider` interface ·
    `config.ts` selects the active provider via `NEXT_PUBLIC_COMMERCE_PROVIDER` ·
    `index.ts` the public API the app imports · `format.ts` money helpers.
  - `providers/mock/` the default offline provider (`data/`, `query.ts`,
    `cart.ts`, `session.ts`, `storage.ts`). `providers/README.md` is the
    write-your-own-provider guide.
- `src/lib/store/` — `cart.ts`, `wishlist.ts`, `ui.ts` (Zustand).
- `src/config/site.ts` — brand, nav/mega-menu, footer, socials, announcements,
  SEO defaults, feature flags. The single place to re-brand content.
- `src/app/globals.css` — design tokens (light + dark) and base styles.
- `src/app/layout.tsx` — fonts (`next/font`), providers, header/footer shell.
- `src/components/` — `ui/` (bespoke primitives), `layout/`, `product/`, `cart/`,
  `shop/`, `checkout/`, `account/`, `marketing/`, `common/`, `seo/`.

## Where things go

- **New page** → `src/app/.../page.tsx` (Server Component by default; read data
  via `@/lib/commerce`; add `generateMetadata` for SEO and `generateStaticParams`
  for dynamic catalog routes). Remember `params`/`searchParams` are Promises.
- **New component** → the matching `src/components/<area>/`. Client component
  only when it needs interactivity/state; otherwise keep it a Server Component.
- **New provider method** → add to the `CommerceProvider` interface, implement in
  `providers/mock/`, then in real providers. TypeScript will flag gaps.
- **New demo product/collection** → edit the seed arrays in
  `providers/mock/data/`; variants and facets are derived automatically.
- **Re-theme** → colours/fonts in `globals.css` + `layout.tsx`; brand/content in
  `src/config/site.ts`.

## Commands

```bash
npm run dev     # local dev
npm run build   # production build — must pass clean
npm run lint    # ESLint — must pass clean
```

## Definition of done

Strict types (no `any`), lint + build clean, correct in light **and** dark,
keyboard-accessible, reduced-motion respected, data only via the commerce seam,
styled only with tokens, and documented where a customization point exists.
