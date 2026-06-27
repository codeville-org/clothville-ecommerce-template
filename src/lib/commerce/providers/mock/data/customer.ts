import type { Address, Customer, Order, OrderLine, OrderStatus } from "@/lib/commerce/types";
import { addMoney, money, multiplyMoney, zeroMoney } from "@/lib/commerce/format";
import { productBySlug } from "./products";

/**
 * A single demo customer with addresses and order history, so the Account
 * pages are fully populated offline. The mock provider treats this as the
 * "signed-in" user (any email/password is accepted at the UI level).
 */

const CURRENCY = "USD";

export const demoCustomer: Customer = {
  id: "cus_demo",
  email: "ava.laurent@example.com",
  firstName: "Ava",
  lastName: "Laurent",
  phone: "+1 (415) 555-0148",
  createdAt: "2025-09-12T10:00:00.000Z",
};

export const demoAddresses: Address[] = [
  {
    id: "addr_home",
    firstName: "Ava",
    lastName: "Laurent",
    line1: "128 Bywater Lane",
    line2: "Apt 4",
    city: "San Francisco",
    province: "CA",
    postalCode: "94110",
    country: "United States",
    countryCode: "US",
    phone: "+1 (415) 555-0148",
    isDefault: true,
  },
  {
    id: "addr_studio",
    firstName: "Ava",
    lastName: "Laurent",
    company: "Laurent Studio",
    line1: "55 Mercer Street",
    city: "New York",
    province: "NY",
    postalCode: "10013",
    country: "United States",
    countryCode: "US",
    phone: "+1 (212) 555-0193",
  },
];

interface OrderLineSeed {
  slug: string;
  variantIndex: number;
  quantity: number;
}

function buildLine(seed: OrderLineSeed): OrderLine {
  const product = productBySlug.get(seed.slug);
  if (!product) throw new Error(`Demo order references unknown product: ${seed.slug}`);
  const variant = product.variants[seed.variantIndex] ?? product.variants[0];
  const unitPrice = variant.price;
  return {
    id: `oline_${product.id}_${variant.id}`,
    productId: product.id,
    variantId: variant.id,
    title: product.title,
    variantTitle: variant.title,
    slug: product.slug,
    image: product.images[0],
    unitPrice,
    lineTotal: multiplyMoney(unitPrice, seed.quantity),
    quantity: seed.quantity,
  };
}

function buildOrder(
  id: string,
  number: string,
  createdAt: string,
  status: OrderStatus,
  lineSeeds: OrderLineSeed[],
): Order {
  const lines = lineSeeds.map(buildLine);
  const subtotal = lines.reduce((sum, l) => addMoney(sum, l.lineTotal), zeroMoney(CURRENCY));
  const shippingTotal = zeroMoney(CURRENCY);
  const taxTotal = money(subtotal.amount * 0.08, CURRENCY);
  const discountTotal = zeroMoney(CURRENCY);
  const total = addMoney(addMoney(subtotal, taxTotal), shippingTotal);
  return {
    id,
    number,
    createdAt,
    status,
    email: demoCustomer.email,
    lines,
    subtotal,
    shippingTotal,
    taxTotal,
    discountTotal,
    total,
    currencyCode: CURRENCY,
    shippingAddress: demoAddresses[0],
    billingAddress: demoAddresses[0],
  };
}

export const demoOrders: Order[] = [
  buildOrder("ord_1024", "CDV-1024", "2026-05-30T14:22:00.000Z", "delivered", [
    { slug: "atelier-wool-coat", variantIndex: 2, quantity: 1 },
    { slug: "cashmere-wrap-scarf", variantIndex: 0, quantity: 1 },
  ]),
  buildOrder("ord_1031", "CDV-1031", "2026-06-14T09:05:00.000Z", "shipped", [
    { slug: "cashmere-crewneck", variantIndex: 1, quantity: 2 },
  ]),
  buildOrder("ord_1038", "CDV-1038", "2026-06-23T18:40:00.000Z", "processing", [
    { slug: "ivory-silk-slip-dress", variantIndex: 0, quantity: 1 },
    { slug: "leather-tote-bag", variantIndex: 0, quantity: 1 },
  ]),
];
