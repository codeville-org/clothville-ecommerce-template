# Getting Started

## Requirements

- **Node.js 20.9+** (18.18+ also works)
- npm, pnpm, yarn or bun — examples below use npm

## Install & run

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. The storefront runs fully on bundled mock data —
no backend or API keys required.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build (must pass clean) |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint (must pass clean) |

## Environment variables

All variables are **optional** — the defaults run the template on mock data with
local placeholder imagery. Copy the example file to customize:

```bash
cp .env.example .env.local
```

| Variable | Default | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_COMMERCE_PROVIDER` | `mock` | Active backend adapter |
| `NEXT_PUBLIC_SITE_URL` | `https://clothville.example.com` | Absolute URL for metadata, sitemap, JSON-LD |
| `NEXT_PUBLIC_USE_UNSPLASH_DEMO` | `false` | Use Unsplash demo photos instead of local placeholders |
| `NEXT_PUBLIC_MOCK_LATENCY` | `0` | Simulated latency (ms) to preview loading skeletons |

> Set `NEXT_PUBLIC_SITE_URL` to your real domain before deploying so SEO URLs are
> correct.

## First customizations

1. **Brand & content** → [`src/config/site.ts`](../src/config/site.ts)
2. **Colours & fonts** → [docs/theming.md](theming.md)
3. **Demo products & images** → [docs/demo-data-and-images.md](demo-data-and-images.md)
4. **Connect your backend** → [docs/connect-a-backend.md](connect-a-backend.md)

## Try the demo flows

- Filter the **Shop** (`/shop`) by size, colour, price; change sort
- Open a **product**, pick a size, **Add to bag** → the cart drawer opens
- Run **checkout** (`/checkout`) to the confirmation screen (no payment is taken)
- **Sign in** (`/login`) with any email/password, then view Orders & Addresses
- Apply promo code **`LUXE10`** in the cart for 10% off
- Toggle **dark mode** from the header
