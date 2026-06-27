/**
 * ─────────────────────────────────────────────────────────────────────────
 *  PUBLIC COMMERCE API
 *
 *  This is the ONLY commerce module the rest of the app imports. Pages and
 *  components call these functions; they never import a backend SDK or a
 *  specific provider directly. Everything is delegated to the active provider
 *  chosen in config.ts.
 * ─────────────────────────────────────────────────────────────────────────
 */
import { commerce } from "./config";
import type { ProductQuery } from "./types";

export { commerce };
export type { CommerceProvider } from "./provider";
export type { ProviderName } from "./config";
export type * from "./types";
export * from "./format";

/* ── Catalog convenience wrappers (used directly in Server Components) ──── */

export const getProducts = (query?: ProductQuery) => commerce.getProducts(query);
export const getProduct = (slug: string) => commerce.getProduct(slug);
export const getProductById = (id: string) => commerce.getProductById(id);
export const getCollections = () => commerce.getCollections();
export const getCollection = (handle: string) => commerce.getCollection(handle);
export const getCollectionProducts = (handle: string, query?: ProductQuery) =>
  commerce.getCollectionProducts(handle, query);
export const searchProducts = (term: string, query?: ProductQuery) =>
  commerce.searchProducts(term, query);
export const getRelatedProducts = (productId: string, limit?: number) =>
  commerce.getRelatedProducts(productId, limit);
export const getFacets = (collectionHandle?: string) => commerce.getFacets(collectionHandle);
export const getProductReviews = (productId: string) => commerce.getProductReviews(productId);
