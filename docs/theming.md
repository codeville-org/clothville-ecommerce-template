# Theming & Customization

Everything visual is driven by **design tokens** so you can re-theme the entire
storefront from a few places — no hunting through components.

| What | Where |
| --- | --- |
| Colours, radii, fonts, motion | [`src/app/globals.css`](../src/app/globals.css) |
| Font families (loading) | [`src/app/layout.tsx`](../src/app/layout.tsx) |
| Brand name, nav, footer, content, flags | [`src/config/site.ts`](../src/config/site.ts) |

## Colours

Colours are CSS variables defined twice — once for light (`:root`) and once for
dark (`.dark`) — in `globals.css`. The `@theme inline` block binds them to
Tailwind utilities (`bg-background`, `text-accent`, `border-border`, …).

```css
:root {
  --background: #f8f6f1;   /* bone */
  --foreground: #1b1815;   /* near-black */
  --accent:     #9a7b4f;   /* muted brass — the single luxury accent */
  --primary:    #1b1815;   /* primary buttons */
  /* …muted, border, card, destructive, success… */
}

.dark {
  --background: #0e0c0a;
  --foreground: #ece7de;
  --accent:     #b8965e;
  /* … */
}
```

**To re-theme:** change these values. Every component updates automatically in
both light and dark. To try a different accent (e.g. deep wine `#6e2a33`), edit
`--accent` (and its dark variant) — that's it.

> Tokens are also exposed as utilities: `--container-editorial` → `max-w-editorial`,
> `--ease-luxe` → `ease-luxe`, `--radius-*`, etc.

## Fonts

Two Google Fonts (both OFL, self-hosted by `next/font`) are loaded in
`layout.tsx` and bound to `--font-serif` / `--font-sans`:

```ts
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const jost = Jost({ subsets: ["latin"], variable: "--font-jost" });
```

To swap fonts: import a different family from `next/font/google`, update the
two `variable` references, and (if renamed) the `--font-serif`/`--font-sans`
bindings in `globals.css`. Headings use `font-serif`, body uses `font-sans`.

## Dark mode

Class-based via `next-themes` (`attribute="class"`). The toggle is in the header
([`theme-toggle.tsx`](../src/components/layout/theme-toggle.tsx)). To disable
dark mode entirely, set `features.darkMode: false` in `site.ts` (the toggle
disappears) — light tokens remain the default.

## Brand & content (`src/config/site.ts`)

A single, typed config object controls non-visual branding:

- `name`, `shortName`, `logo.text`, `tagline`, `description`
- `nav` — header navigation incl. **mega-menu** columns and feature tiles
- `footer` — link columns + legal links
- `socials`, `contact`, `announcements`
- `seo` — title template, default title, twitter handle
- `features` — toggle `darkMode`, `quickView`, `wishlist`, `search`, `reviews`,
  `announcementBar`, `newsletter`

Change `logo.text` to your brand and the wordmark updates across header, footer
and OG image. To use an image logo instead of text, edit the `<Link>` in
[`site-header.tsx`](../src/components/layout/site-header.tsx) and the footer.

## Motion

Animations live as `--animate-*` tokens + `@keyframes` in `globals.css` and are
applied via Radix `data-state` utilities. All motion (including scroll reveals
and the announcement cross-fade) is automatically disabled under
`prefers-reduced-motion`.
