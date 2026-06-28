# Third-Party Credits & Licenses

Clothville is built on open-source software that is free to use and redistribute
in a commercial product. Every bundled dependency and asset is listed below with
its license. None require attribution in your live site, but all are disclosed
here as marketplaces (e.g. CodeCanyon) require.

## Runtime dependencies

| Package | Version | License |
| --- | --- | --- |
| [next](https://github.com/vercel/next.js) | 16.2.9 | MIT |
| [react](https://github.com/facebook/react) | 19.2.4 | MIT |
| [react-dom](https://github.com/facebook/react) | 19.2.4 | MIT |
| [tailwindcss](https://github.com/tailwindlabs/tailwindcss) | 4.3.1 | MIT |
| [@tailwindcss/postcss](https://github.com/tailwindlabs/tailwindcss) | 4.3.1 | MIT |
| [radix-ui](https://github.com/radix-ui/primitives) | 1.6.0 | MIT |
| [motion](https://github.com/motiondivision/motion) | 12.42.0 | MIT |
| [zustand](https://github.com/pmndrs/zustand) | 5.0.14 | MIT |
| [lucide-react](https://github.com/lucide-icons/lucide) | 1.21.0 | ISC |
| [sonner](https://github.com/emilkowalski/sonner) | 2.0.7 | MIT |
| [next-themes](https://github.com/pacocoursey/next-themes) | 0.4.6 | MIT |
| [clsx](https://github.com/lukeed/clsx) | 2.1.1 | MIT |
| [tailwind-merge](https://github.com/dcastil/tailwind-merge) | 3.6.0 | MIT |

## Development dependencies

| Package | Version | License |
| --- | --- | --- |
| [typescript](https://github.com/microsoft/TypeScript) | 5.9.3 | Apache-2.0 |
| [eslint](https://github.com/eslint/eslint) | 9.39.4 | MIT |
| [eslint-config-next](https://github.com/vercel/next.js) | 16.2.9 | MIT |
| [@types/node, @types/react, @types/react-dom](https://github.com/DefinitelyTyped/DefinitelyTyped) | — | MIT |

## Fonts

Loaded via `next/font/google` and served self-hosted at build time. Both are
licensed under the **SIL Open Font License 1.1** and are free to use and
redistribute commercially.

- **Playfair Display** — display serif (headings) — OFL 1.1
- **Jost** — geometric sans (body/UI) — OFL 1.1

## Icons

- **lucide-react** (ISC) — UI icons. Brand/social glyphs in
  `src/components/icons/social-icons.tsx` are **original simplified drawings**
  (not third-party assets), since lucide removed brand icons for trademark
  reasons.

## Imagery

- **No copyrighted images are bundled.** The default demo imagery is a set of
  self-made, license-clean placeholder SVGs in `public/demo/products/`.
- An optional Unsplash demo set can be enabled via
  `NEXT_PUBLIC_USE_UNSPLASH_DEMO=true`. Unsplash photos are **demo-only**;
  replace them with your own licensed imagery before going live. See
  [docs/demo-data-and-images.md](docs/demo-data-and-images.md).

---

License texts for the above are available in each package's folder under
`node_modules/<package>/LICENSE`. The OFL font licenses are bundled by
`next/font` from Google Fonts.
