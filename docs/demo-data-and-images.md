# Demo Data & Images

## Demo data

All demo content lives in
[`src/lib/commerce/providers/mock/data/`](../src/lib/commerce/providers/mock/data/):

| File | Contains |
| --- | --- |
| `products.ts` | Product seeds → expanded into full products (colour × size variants) |
| `collections.ts` | Collections (membership derived from each product's seed) |
| `reviews.ts` | Generated reviews per product |
| `customer.ts` | Demo customer, addresses and order history |
| `images.ts` | Image resolver (local placeholders vs Unsplash) |

### Add or edit a product

Append a **seed** to the `SEEDS` array in `products.ts` — variants, options and
facets are derived automatically:

```ts
{
  slug: "silk-blouse",
  title: "Silk Blouse",
  category: "Shirts",
  collections: ["new-arrivals", "essentials"],
  price: 24000,            // minor units (cents) → $240.00
  colors: [COLORS.ivory, COLORS.black],
  sizes: APPAREL_SIZES,
  description: "…",
  tags: ["silk", "shirt"],
  images: [{ local: "blouse-ivory-1", unsplash: "<photo-id>", alt: "Silk blouse" }],
  rating: 4.6,
  reviewCount: 20,
  newArrival: true,
}
```

> Keep demo data **deterministic** (no `Math.random`/`Date.now`) so static
> generation stays stable.

For anything beyond demo content, **replace the provider** rather than editing
seeds — see [connect-a-backend.md](connect-a-backend.md).

## Images

The template ships **license-clean placeholder SVGs** in
[`public/demo/products/`](../public/demo/products/) (`tone-*.svg`), selected
automatically by each product's colour. **No copyrighted imagery is bundled.**

### Option A — Unsplash demo set (preview only)

Set `NEXT_PUBLIC_USE_UNSPLASH_DEMO=true` to pull editorial fashion photography
from Unsplash via the `unsplash` photo ids in each seed. This is great for
screenshots and live previews.

> ⚠️ Unsplash photos are **demo-only**. Replace them with your own licensed
> imagery before going live. The example photo ids are starting points — swap in
> ids you've chosen.

### Option B — your own production images (recommended for launch)

1. Host your images (S3, Cloudinary, your CMS, …) or place them in `public/`.
2. Allow the host in [`next.config.ts`](../next.config.ts):
   ```ts
   images: { remotePatterns: [{ protocol: "https", hostname: "your-cdn.com" }] }
   ```
3. Point your product data at the real URLs — either in the seeds' `images`, or
   (better) from your backend provider, returning `Image` objects:
   ```ts
   { url: "https://your-cdn.com/blouse.jpg", alt: "Silk blouse", width: 1200, height: 1500 }
   ```

The [`Media`](../src/components/common/media.tsx) component handles `next/image`
optimization, blur placeholders and aspect ratios for you.
