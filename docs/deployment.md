# Deployment

The template is a standard Next.js 16 app and deploys anywhere Next.js runs.

## Before you deploy

1. Set **`NEXT_PUBLIC_SITE_URL`** to your production domain (used for metadata,
   canonical URLs, sitemap and JSON-LD).
2. Replace demo imagery with your own licensed images and add your image host to
   `images.remotePatterns` in [`next.config.ts`](../next.config.ts) — see
   [demo-data-and-images.md](demo-data-and-images.md).
3. Turn **off** the Unsplash demo set (`NEXT_PUBLIC_USE_UNSPLASH_DEMO=false` or
   unset) for production.
4. Review the **sample** policy copy in
   [`src/lib/content/policies.ts`](../src/lib/content/policies.ts) and replace it
   with your own legally-reviewed text.
5. Run `npm run build` and `npm run lint` — both must pass clean.

## Vercel (recommended)

1. Push the repo to GitHub/GitLab.
2. Import the project in Vercel.
3. Add your environment variables (at minimum `NEXT_PUBLIC_SITE_URL`).
4. Deploy — Vercel detects Next.js automatically.

## Self-hosted (Node)

```bash
npm run build
npm run start   # serves on PORT (default 3000)
```

Run behind a reverse proxy (Nginx/Caddy) and a process manager (PM2/systemd), or
use the official Docker approach from the Next.js docs.

## Environment variables in production

| Variable | Recommended |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | your real domain |
| `NEXT_PUBLIC_COMMERCE_PROVIDER` | your provider (or `mock` for a static demo) |
| `NEXT_PUBLIC_USE_UNSPLASH_DEMO` | `false` |
| `NEXT_PUBLIC_MOCK_LATENCY` | `0` |
| Backend credentials | per your provider |

## Notes

- With the **mock** provider the whole site can be statically hosted — it's a
  fully working offline demo, ideal for a marketplace preview.
- Catalog pages (PDP, policies) are statically generated; filterable pages
  (`/shop`, `/collections/[handle]`, `/search`) render dynamically.
- `sitemap.xml`, `robots.txt`, the OpenGraph image and favicon are generated
  automatically at build time.
