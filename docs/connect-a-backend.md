# Connect a Backend

Clothville is **backend-agnostic**. The entire UI reads and writes data through a
single interface — `CommerceProvider` — so you can power it with any backend by
implementing that interface once. **No UI code changes.**

```
UI / pages ─▶ @/lib/commerce ─▶ config.ts ─▶ active CommerceProvider ─▶ your backend
```

The default provider is **`mock`** ([`src/lib/commerce/providers/mock/`](../src/lib/commerce/providers/mock/)),
a complete offline implementation over local demo data. It is the reference for
writing your own.

## The interface

[`src/lib/commerce/provider.ts`](../src/lib/commerce/provider.ts) defines every
method, grouped into **catalog**, **cart**, **customer/auth**, **checkout** and
**marketing**. Each returns the shared domain types from
[`types.ts`](../src/lib/commerce/types.ts). Money amounts are integers in **minor
units** (cents).

## Steps to add a provider

1. **Create** `src/lib/commerce/providers/<name>/index.ts` exporting an object
   that implements `CommerceProvider`.
2. **Map** your backend's responses onto the domain types — inside the provider,
   never in the UI.
3. **Register** it in [`config.ts`](../src/lib/commerce/config.ts):
   ```ts
   export type ProviderName = "mock" | "medusa";
   // …
   case "medusa": return medusaProvider;
   ```
4. **Activate** it: `NEXT_PUBLIC_COMMERCE_PROVIDER=medusa`.

Implement incrementally — start with `getProducts`/`getProduct`/`getCollections`
to get pages rendering, then cart, then auth/checkout. TypeScript flags any
method you haven't implemented yet.

> Keep any backend SDK import **inside** your provider folder. If an SDK is ever
> imported from a page or component, the seam is broken.

## Mapping examples

Short skeletons for Medusa, Supabase and a custom REST API live in
[`src/lib/commerce/providers/README.md`](../src/lib/commerce/providers/README.md).
The pattern is always the same: call your backend, then map its shapes onto the
domain types.

```ts
// providers/custom/index.ts
import type { CommerceProvider } from "@/lib/commerce/provider";

const api = (path: string) =>
  fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`).then((r) => r.json());

export const customProvider: CommerceProvider = {
  name: "custom",
  async getProduct(slug) {
    const data = await api(`/products/${slug}`);
    return data ? toDomainProduct(data) : null; // your mapper
  },
  // …implement the rest
};
```

## Cart, auth & checkout

- **Cart** — the client store ([`store/cart.ts`](../src/lib/store/cart.ts))
  delegates to the provider's cart methods, so a server-backed cart works without
  UI changes. It persists a cart id and re-reads the cart from the provider.
- **Auth** — the account UI ([`store/auth.ts`](../src/lib/store/auth.ts)) calls
  `login`/`register`/`getCurrentCustomer`/… Wire these to your real auth and the
  account pages light up. The mock accepts any credentials (localStorage session).
- **Checkout** — `createCheckoutSession(cartId)` is where a real
  payment/order step attaches (e.g. return a Stripe Checkout URL to redirect to).

## Caching

The mock provider returns local data synchronously. With a real backend you can
opt into Next.js Cache Components (`'use cache'` + `cacheLife`/`cacheTag`) inside
your provider methods, or stream dynamic data inside `<Suspense>`. Catalog pages
use `generateStaticParams` for static generation where possible.
