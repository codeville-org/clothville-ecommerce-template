/**
 * ─────────────────────────────────────────────────────────────────────────
 *  COMMERCE DOMAIN TYPES
 *  The shared vocabulary of the storefront. Every page and component speaks
 *  ONLY in these types, and every backend provider must map its own data
 *  onto them. Keep this file backend-neutral — no SDK-specific shapes here.
 *
 *  Money convention: amounts are integers in the currency's MINOR units
 *  (e.g. cents). $189.00 → { amount: 18900, currencyCode: "USD" }.
 *  Use formatMoney() / money helpers from "@/lib/commerce/format".
 * ─────────────────────────────────────────────────────────────────────────
 */

export interface Money {
  /** Integer amount in minor units (cents). */
  amount: number;
  /** ISO 4217 code, e.g. "USD", "EUR", "GBP". */
  currencyCode: string;
}

export interface Image {
  url: string;
  alt: string;
  width?: number;
  height?: number;
  /** Tiny base64/SVG data URI for next/image blur placeholder. */
  blurDataURL?: string;
}

/** A named, value-pair selection on a variant, e.g. { name: "Size", value: "M" }. */
export interface SelectedOption {
  name: string;
  value: string;
}

export interface ProductOptionValue {
  value: string;
  /** Hex swatch for colour options; undefined for non-colour options. */
  hex?: string;
}

export interface ProductOption {
  id: string;
  /** "Size", "Colour", "Material", … */
  name: string;
  values: ProductOptionValue[];
}

export interface ProductVariant {
  id: string;
  /** Human label, e.g. "Ivory / M". */
  title: string;
  sku?: string;
  selectedOptions: SelectedOption[];
  price: Money;
  /** Original price when on sale (struck through in UI). */
  compareAtPrice?: Money;
  available: boolean;
  inventoryQuantity?: number;
  image?: Image;
}

export type ProductBadge = "new" | "sale" | "limited" | "bestseller" | "sold-out";

/** Accordion row on the PDP (Materials, Care, Shipping & Returns, …). */
export interface ProductDetail {
  title: string;
  content: string;
}

export interface SizeGuide {
  columns: string[];
  rows: Array<{ label: string; values: string[] }>;
  note?: string;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  descriptionHtml?: string;
  images: Image[];
  options: ProductOption[];
  variants: ProductVariant[];
  /** Default / lowest variant price, for listings. */
  price: Money;
  compareAtPrice?: Money;
  currencyCode: string;
  tags: string[];
  collectionIds: string[];
  /** Taxonomy labels used by the PLP category filter. */
  categories: string[];
  rating?: number;
  reviewCount?: number;
  badges?: ProductBadge[];
  details?: ProductDetail[];
  sizeGuide?: SizeGuide;
  featured?: boolean;
  newArrival?: boolean;
  bestSeller?: boolean;
  /** ISO 8601 timestamp; drives "newest" sort. */
  createdAt: string;
}

export interface Collection {
  id: string;
  handle: string;
  title: string;
  description?: string;
  image?: Image;
  productIds: string[];
  featured?: boolean;
}

/* ── Cart ────────────────────────────────────────────────────────────── */

export interface CartLine {
  id: string;
  productId: string;
  variantId: string;
  title: string;
  variantTitle: string;
  slug: string;
  image?: Image;
  selectedOptions: SelectedOption[];
  unitPrice: Money;
  lineTotal: Money;
  quantity: number;
  available: boolean;
}

export interface Cart {
  id: string;
  lines: CartLine[];
  itemCount: number;
  currencyCode: string;
  subtotal: Money;
  discountTotal: Money;
  shippingTotal: Money;
  taxTotal: Money;
  total: Money;
  discountCode?: string;
}

/* ── Customer / account ──────────────────────────────────────────────── */

export interface Customer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  createdAt: string;
}

export interface Address {
  id: string;
  firstName: string;
  lastName: string;
  company?: string;
  line1: string;
  line2?: string;
  city: string;
  province?: string;
  postalCode: string;
  country: string;
  countryCode: string;
  phone?: string;
  isDefault?: boolean;
}

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

export interface OrderLine {
  id: string;
  productId: string;
  variantId: string;
  title: string;
  variantTitle: string;
  slug: string;
  image?: Image;
  unitPrice: Money;
  lineTotal: Money;
  quantity: number;
}

export interface Order {
  id: string;
  number: string;
  createdAt: string;
  status: OrderStatus;
  email: string;
  lines: OrderLine[];
  subtotal: Money;
  shippingTotal: Money;
  taxTotal: Money;
  discountTotal: Money;
  total: Money;
  currencyCode: string;
  shippingAddress?: Address;
  billingAddress?: Address;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  /** 1–5. */
  rating: number;
  title?: string;
  body: string;
  createdAt: string;
  verified?: boolean;
}

/* ── Querying, filtering, sorting ────────────────────────────────────── */

export interface ProductFilters {
  categories?: string[];
  sizes?: string[];
  colors?: string[];
  /** Minor units. */
  minPrice?: number;
  maxPrice?: number;
  tags?: string[];
  inStockOnly?: boolean;
}

export type SortKey =
  | "featured"
  | "newest"
  | "price-asc"
  | "price-desc"
  | "best-selling"
  | "title-asc"
  | "title-desc";

export interface ProductQuery {
  filters?: ProductFilters;
  sort?: SortKey;
  page?: number;
  pageSize?: number;
  search?: string;
}

export interface FacetValue {
  value: string;
  count: number;
}

export interface ColorFacetValue extends FacetValue {
  hex?: string;
}

/** Available filter options for a result set (drives the filter panel). */
export interface Facets {
  categories: FacetValue[];
  sizes: FacetValue[];
  colors: ColorFacetValue[];
  priceRange: { min: number; max: number };
}

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  pageCount: number;
  hasMore: boolean;
}

/* ── Checkout ────────────────────────────────────────────────────────── */

export interface CheckoutSession {
  id: string;
  cartId: string;
  status: "open" | "complete";
  /** Where a real provider would redirect (mock: internal confirmation route). */
  url?: string;
  createdAt: string;
}

/* ── Input payloads ──────────────────────────────────────────────────── */

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ProfileUpdateInput {
  firstName?: string;
  lastName?: string;
  phone?: string;
}

export type AddressInput = Omit<Address, "id">;

export interface AddLineInput {
  variantId: string;
  quantity: number;
}

export interface ContactInput {
  name: string;
  email: string;
  subject?: string;
  message: string;
}
