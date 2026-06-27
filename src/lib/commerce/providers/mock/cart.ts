import type { AddLineInput, Cart, CartLine, Product, ProductVariant } from "@/lib/commerce/types";
import { addMoney, money, multiplyMoney, zeroMoney } from "@/lib/commerce/format";
import { products } from "./data";
import { genId, readJSON, writeJSON, mockStorage } from "./storage";

const CURRENCY = "USD";
const TAX_RATE = 0.08;
const cartKey = (cartId: string) => `cdv_cart_${cartId}`;

/** variantId → its product + variant, for fast line construction. */
const VARIANT_INDEX = new Map<string, { product: Product; variant: ProductVariant }>();
for (const product of products) {
  for (const variant of product.variants) {
    VARIANT_INDEX.set(variant.id, { product, variant });
  }
}

/** Demo promo codes. A real provider validates these server-side. */
const PROMO_CODES: Record<string, { label: string; percent: number }> = {
  LUXE10: { label: "LUXE10", percent: 10 },
  WELCOME15: { label: "WELCOME15", percent: 15 },
};

function emptyCart(id: string): Cart {
  return {
    id,
    lines: [],
    itemCount: 0,
    currencyCode: CURRENCY,
    subtotal: zeroMoney(CURRENCY),
    discountTotal: zeroMoney(CURRENCY),
    shippingTotal: zeroMoney(CURRENCY),
    taxTotal: zeroMoney(CURRENCY),
    total: zeroMoney(CURRENCY),
  };
}

function buildLine(product: Product, variant: ProductVariant, quantity: number): CartLine {
  return {
    id: `line_${variant.id}`,
    productId: product.id,
    variantId: variant.id,
    title: product.title,
    variantTitle: variant.title,
    slug: product.slug,
    image: variant.image ?? product.images[0],
    selectedOptions: variant.selectedOptions,
    unitPrice: variant.price,
    lineTotal: multiplyMoney(variant.price, quantity),
    quantity,
    available: variant.available,
  };
}

/** Recompute all derived totals from the cart's lines and discount code. */
function recompute(cart: Cart): Cart {
  const lines = cart.lines.map((line) => ({
    ...line,
    lineTotal: multiplyMoney(line.unitPrice, line.quantity),
  }));
  const itemCount = lines.reduce((n, l) => n + l.quantity, 0);
  const subtotal = lines.reduce((sum, l) => addMoney(sum, l.lineTotal), zeroMoney(CURRENCY));

  const promo = cart.discountCode ? PROMO_CODES[cart.discountCode] : undefined;
  const discountTotal = promo
    ? money(-(subtotal.amount * promo.percent) / 100, CURRENCY)
    : zeroMoney(CURRENCY);

  const shippingTotal = zeroMoney(CURRENCY); // complimentary
  const taxable = subtotal.amount + discountTotal.amount;
  const taxTotal = money(taxable * TAX_RATE, CURRENCY);
  const total = money(taxable + taxTotal.amount + shippingTotal.amount, CURRENCY);

  return {
    ...cart,
    lines,
    itemCount,
    subtotal,
    discountTotal,
    shippingTotal,
    taxTotal,
    total,
  };
}

function persist(cart: Cart): Cart {
  writeJSON(cartKey(cart.id), cart);
  return cart;
}

export function createCart(): Cart {
  const cart = emptyCart(genId("cart"));
  return persist(cart);
}

export function getCart(cartId: string): Cart | null {
  return readJSON<Cart | null>(cartKey(cartId), null);
}

export function addLine(cartId: string, input: AddLineInput): Cart {
  const cart = getCart(cartId) ?? emptyCart(cartId);
  const entry = VARIANT_INDEX.get(input.variantId);
  if (!entry) throw new Error(`Unknown variant: ${input.variantId}`);

  const existing = cart.lines.find((l) => l.variantId === input.variantId);
  if (existing) {
    existing.quantity += input.quantity;
  } else {
    cart.lines.push(buildLine(entry.product, entry.variant, input.quantity));
  }
  return persist(recompute(cart));
}

export function updateLine(cartId: string, lineId: string, quantity: number): Cart {
  const cart = getCart(cartId) ?? emptyCart(cartId);
  if (quantity <= 0) {
    cart.lines = cart.lines.filter((l) => l.id !== lineId);
  } else {
    const line = cart.lines.find((l) => l.id === lineId);
    if (line) line.quantity = quantity;
  }
  return persist(recompute(cart));
}

export function removeLine(cartId: string, lineId: string): Cart {
  const cart = getCart(cartId) ?? emptyCart(cartId);
  cart.lines = cart.lines.filter((l) => l.id !== lineId);
  return persist(recompute(cart));
}

export function applyDiscount(cartId: string, code: string): Cart {
  const cart = getCart(cartId) ?? emptyCart(cartId);
  const normalized = code.trim().toUpperCase();
  if (!PROMO_CODES[normalized]) {
    throw new Error(`Invalid promo code: ${code}`);
  }
  cart.discountCode = normalized;
  return persist(recompute(cart));
}

export function removeDiscount(cartId: string): Cart {
  const cart = getCart(cartId) ?? emptyCart(cartId);
  delete cart.discountCode;
  return persist(recompute(cart));
}

export function clearCart(cartId: string): void {
  mockStorage.remove(cartKey(cartId));
}
