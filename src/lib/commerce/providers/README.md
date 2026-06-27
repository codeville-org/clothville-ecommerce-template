# Connecting your backend — the Commerce Provider guide

This template is **backend-agnostic**. Every page and component reads data
through one interface — `CommerceProvider` (`src/lib/commerce/provider.ts`) —
so you can power the storefront with **any** backend by implementing that
interface once. No UI changes required.

```
UI / pages ──▶ @/lib/commerce ──▶ config.ts ──▶ active CommerceProvider ──▶ your backend
```

The default provider is **`mock`** (`providers/mock/`): a complete, offline
implementation backed by local demo data. It powers the live preview and is the
reference for writing your own.

---

## Steps to add a provider

1. **Create a folder** `src/lib/commerce/providers/<name>/` with an `index.ts`
   that exports an object implementing `CommerceProvider`.
2. **Map your backend's shapes onto the domain types** in
   `src/lib/commerce/types.ts` — inside the provider, never in the UI. Amounts
   are integers in minor units (cents).
3. **Register it** in `src/lib/commerce/config.ts`:
   ```ts
   export type ProviderName = "mock" | "medusa";
   // ...
   case "medusa": return medusaProvider;
   ```
4. **Activate it** by setting the env var:
   ```bash
   NEXT_PUBLIC_COMMERCE_PROVIDER=medusa
   ```

That's the whole swap. Implement incrementally — start with catalog reads
(`getProducts`, `getProduct`, `getCollections`) to get pages rendering, then
cart, then auth/checkout.

> **Tip:** keep any backend SDK import **inside** your provider folder. If a
> backend SDK is ever imported from a component or page, the seam is broken.

---

## Skeleton: Medusa.js

```ts
// providers/medusa/index.ts
import type { CommerceProvider } from "@/lib/commerce/provider";
import Medusa from "@medusajs/js-sdk";

const sdk = new Medusa({ baseUrl: process.env.NEXT_PUBLIC_MEDUSA_URL! });

export const medusaProvider: CommerceProvider = {
  name: "medusa",
  async getProducts(query) {
    const { products, count } = await sdk.store.product.list({
      limit: query?.pageSize ?? 12,
      offset: ((query?.page ?? 1) - 1) * (query?.pageSize ?? 12),
    });
    return toPaginated(products.map(toDomainProduct), count, query); // your mappers
  },
  async getProduct(slug) {
    const { products } = await sdk.store.product.list({ handle: slug, limit: 1 });
    return products[0] ? toDomainProduct(products[0]) : null;
  },
  // …implement the rest, mapping Medusa carts/customers/orders onto the domain types
};
```

## Skeleton: Supabase

```ts
// providers/supabase/index.ts
import type { CommerceProvider } from "@/lib/commerce/provider";
import { createClient } from "@supabase/supabase-js";

const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export const supabaseProvider: CommerceProvider = {
  name: "supabase",
  async getProduct(slug) {
    const { data } = await db.from("products").select("*, variants(*)").eq("slug", slug).single();
    return data ? toDomainProduct(data) : null;
  },
  // …map rows → domain types; use Supabase Auth for login/register/getCurrentCustomer
};
```

## Skeleton: custom REST API

```ts
// providers/custom/index.ts
import type { CommerceProvider } from "@/lib/commerce/provider";

const api = (path: string, init?: RequestInit) =>
  fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, init).then((r) => r.json());

export const customProvider: CommerceProvider = {
  name: "custom",
  async getProducts(query) {
    const data = await api(`/products?page=${query?.page ?? 1}`);
    return data; // ensure the response already matches Paginated<Product>, or map it
  },
  // …
};
```

---

## Notes

- **Caching:** the mock provider returns local data synchronously. With a real
  backend you can opt into Next.js Cache Components (`'use cache'` + `cacheLife`)
  inside your provider methods, or render dynamic data inside `<Suspense>`.
- **Cart sync:** the client cart store (`src/lib/store/cart.ts`) delegates to
  `commerce` cart methods, so a server-backed cart works without UI changes.
- **Auth:** the account UI calls `login` / `register` / `getCurrentCustomer`
  etc. Wire these to your real auth and the Account pages light up.
- Check every method against `CommerceProvider` — TypeScript will tell you what
  is still missing.
