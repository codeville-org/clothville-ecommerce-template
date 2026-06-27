import type {
  AddLineInput,
  Address,
  AddressInput,
  Cart,
  CheckoutSession,
  Collection,
  ContactInput,
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
} from "./types";

/**
 * ─────────────────────────────────────────────────────────────────────────
 *  CommerceProvider — THE backend contract.
 *
 *  This single interface is the seam between the UI and any backend. The app
 *  imports data only through "@/lib/commerce" (which delegates here); it never
 *  touches a backend SDK directly. To support a new backend (Medusa, Supabase,
 *  custom REST, …) implement this interface once and register it in config.ts.
 *
 *  Every method returns the shared domain types from "./types" — map your
 *  backend's shapes onto those inside the provider, not in the UI.
 *  See src/lib/commerce/providers/README.md for a step-by-step guide and
 *  Medusa / Supabase / custom-REST skeletons.
 * ─────────────────────────────────────────────────────────────────────────
 */
export interface CommerceProvider {
  /** Identifier for logging/diagnostics, e.g. "mock", "medusa". */
  readonly name: string;

  /* ── Catalog ───────────────────────────────────────────────────────── */
  getProducts(query?: ProductQuery): Promise<Paginated<Product>>;
  getProduct(slug: string): Promise<Product | null>;
  getProductById(id: string): Promise<Product | null>;
  getCollections(): Promise<Collection[]>;
  getCollection(handle: string): Promise<Collection | null>;
  getCollectionProducts(handle: string, query?: ProductQuery): Promise<Paginated<Product>>;
  searchProducts(term: string, query?: ProductQuery): Promise<Paginated<Product>>;
  getRelatedProducts(productId: string, limit?: number): Promise<Product[]>;
  /** Available filter options for a result set (optionally scoped to a collection). */
  getFacets(collectionHandle?: string): Promise<Facets>;
  getProductReviews(productId: string): Promise<Review[]>;

  /* ── Cart ──────────────────────────────────────────────────────────── */
  createCart(): Promise<Cart>;
  getCart(cartId: string): Promise<Cart | null>;
  addLine(cartId: string, input: AddLineInput): Promise<Cart>;
  updateLine(cartId: string, lineId: string, quantity: number): Promise<Cart>;
  removeLine(cartId: string, lineId: string): Promise<Cart>;
  applyDiscount(cartId: string, code: string): Promise<Cart>;
  removeDiscount(cartId: string): Promise<Cart>;

  /* ── Customer / auth (UI-level) ────────────────────────────────────── */
  login(input: LoginInput): Promise<Customer>;
  register(input: RegisterInput): Promise<Customer>;
  logout(): Promise<void>;
  getCurrentCustomer(): Promise<Customer | null>;
  requestPasswordReset(email: string): Promise<void>;
  updateProfile(input: ProfileUpdateInput): Promise<Customer>;
  getAddresses(): Promise<Address[]>;
  addAddress(input: AddressInput): Promise<Address>;
  updateAddress(id: string, input: Partial<AddressInput>): Promise<Address>;
  removeAddress(id: string): Promise<void>;
  getOrders(): Promise<Order[]>;
  getOrder(id: string): Promise<Order | null>;

  /* ── Checkout ──────────────────────────────────────────────────────── */
  /** Create a checkout session. A real provider attaches payment/order here. */
  createCheckoutSession(cartId: string): Promise<CheckoutSession>;

  /* ── Marketing ─────────────────────────────────────────────────────── */
  subscribeNewsletter(email: string): Promise<void>;
  submitContact(input: ContactInput): Promise<void>;
}
