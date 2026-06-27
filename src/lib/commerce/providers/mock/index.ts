import type { CommerceProvider } from "@/lib/commerce/provider";
import type {
  AddLineInput,
  Address,
  AddressInput,
  Cart,
  CheckoutSession,
  Collection,
  Customer,
  Facets,
  LoginInput,
  Order,
  Paginated,
  Product,
  ProductQuery,
  ProfileUpdateInput,
  RegisterInput,
  Review,
} from "@/lib/commerce/types";

import { collectionByHandle, collections, productById, productBySlug, products, reviews } from "./data";
import { computeFacets, queryProducts, relatedProducts } from "./query";
import * as cart from "./cart";
import * as session from "./session";
import { genId } from "./storage";
import { delay } from "./latency";

/**
 * ─────────────────────────────────────────────────────────────────────────
 *  MOCK COMMERCE PROVIDER (default)
 *
 *  A complete, offline implementation of CommerceProvider backed by the local
 *  demo data. This is what powers the live preview with zero backend setup.
 *  Use it as the reference when writing your own provider — see
 *  src/lib/commerce/providers/README.md.
 * ─────────────────────────────────────────────────────────────────────────
 */

function productsInCollection(handle: string): Product[] {
  const collection = collectionByHandle.get(handle);
  if (!collection) return [];
  return collection.productIds
    .map((id) => productById.get(id))
    .filter((p): p is Product => Boolean(p));
}

export const mockProvider: CommerceProvider = {
  name: "mock",

  /* ── Catalog ───────────────────────────────────────────────────────── */
  async getProducts(query?: ProductQuery): Promise<Paginated<Product>> {
    await delay();
    return queryProducts(products, query);
  },

  async getProduct(slug: string): Promise<Product | null> {
    await delay();
    return productBySlug.get(slug) ?? null;
  },

  async getProductById(id: string): Promise<Product | null> {
    await delay();
    return productById.get(id) ?? null;
  },

  async getCollections(): Promise<Collection[]> {
    await delay();
    return collections;
  },

  async getCollection(handle: string): Promise<Collection | null> {
    await delay();
    return collectionByHandle.get(handle) ?? null;
  },

  async getCollectionProducts(handle: string, query?: ProductQuery): Promise<Paginated<Product>> {
    await delay();
    return queryProducts(productsInCollection(handle), query);
  },

  async searchProducts(term: string, query?: ProductQuery): Promise<Paginated<Product>> {
    await delay();
    return queryProducts(products, { ...query, search: term });
  },

  async getRelatedProducts(productId: string, limit = 4): Promise<Product[]> {
    await delay();
    const product = productById.get(productId);
    return product ? relatedProducts(products, product, limit) : [];
  },

  async getFacets(collectionHandle?: string): Promise<Facets> {
    await delay();
    return computeFacets(collectionHandle ? productsInCollection(collectionHandle) : products);
  },

  async getProductReviews(productId: string): Promise<Review[]> {
    await delay();
    return reviews.filter((r) => r.productId === productId);
  },

  /* ── Cart ──────────────────────────────────────────────────────────── */
  async createCart(): Promise<Cart> {
    return cart.createCart();
  },
  async getCart(cartId: string): Promise<Cart | null> {
    return cart.getCart(cartId);
  },
  async addLine(cartId: string, input: AddLineInput): Promise<Cart> {
    return cart.addLine(cartId, input);
  },
  async updateLine(cartId: string, lineId: string, quantity: number): Promise<Cart> {
    return cart.updateLine(cartId, lineId, quantity);
  },
  async removeLine(cartId: string, lineId: string): Promise<Cart> {
    return cart.removeLine(cartId, lineId);
  },
  async applyDiscount(cartId: string, code: string): Promise<Cart> {
    return cart.applyDiscount(cartId, code);
  },
  async removeDiscount(cartId: string): Promise<Cart> {
    return cart.removeDiscount(cartId);
  },

  /* ── Customer / auth ───────────────────────────────────────────────── */
  async login(input: LoginInput): Promise<Customer> {
    await delay();
    return session.login(input);
  },
  async register(input: RegisterInput): Promise<Customer> {
    await delay();
    return session.register(input);
  },
  async logout(): Promise<void> {
    session.logout();
  },
  async getCurrentCustomer(): Promise<Customer | null> {
    return session.getCurrentCustomer();
  },
  async requestPasswordReset(): Promise<void> {
    await delay();
    // No-op in the mock provider; a real provider sends a reset email.
  },
  async updateProfile(input: ProfileUpdateInput): Promise<Customer> {
    await delay();
    return session.updateProfile(input);
  },
  async getAddresses(): Promise<Address[]> {
    return session.getAddresses();
  },
  async addAddress(input: AddressInput): Promise<Address> {
    return session.addAddress(input);
  },
  async updateAddress(id: string, input: Partial<AddressInput>): Promise<Address> {
    return session.updateAddress(id, input);
  },
  async removeAddress(id: string): Promise<void> {
    session.removeAddress(id);
  },
  async getOrders(): Promise<Order[]> {
    await delay();
    return session.getOrders();
  },
  async getOrder(id: string): Promise<Order | null> {
    await delay();
    return session.getOrder(id);
  },

  /* ── Checkout ──────────────────────────────────────────────────────── */
  async createCheckoutSession(cartId: string): Promise<CheckoutSession> {
    await delay();
    return {
      id: genId("cs"),
      cartId,
      status: "open",
      url: "/checkout",
      createdAt: new Date().toISOString(),
    };
  },

  /* ── Marketing ─────────────────────────────────────────────────────── */
  async subscribeNewsletter(): Promise<void> {
    await delay();
    // No-op in the mock provider.
  },
  async submitContact(): Promise<void> {
    await delay();
    // No-op in the mock provider.
  },
};
