import type { Money } from "./types";

/**
 * Money helpers. Amounts are integers in MINOR units (cents); these helpers
 * keep all arithmetic in minor units and only convert to major units for
 * display via {@link formatMoney}.
 */

/** Construct a Money value. */
export function money(amount: number, currencyCode: string): Money {
  return { amount: Math.round(amount), currencyCode };
}

/** A zero-value Money in the given currency. */
export function zeroMoney(currencyCode: string): Money {
  return { amount: 0, currencyCode };
}

/** Sum two Money values of the same currency. */
export function addMoney(a: Money, b: Money): Money {
  return { amount: a.amount + b.amount, currencyCode: a.currencyCode };
}

/** Multiply a Money value by a quantity. */
export function multiplyMoney(value: Money, factor: number): Money {
  return { amount: Math.round(value.amount * factor), currencyCode: value.currencyCode };
}

/**
 * Format Money for display, e.g. { amount: 18900, currencyCode: "USD" } →
 * "$189.00". Uses Intl, so it respects the locale's currency conventions.
 */
export function formatMoney(value: Money, locale = "en-US"): string {
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: value.currencyCode,
  });
  // Convert minor → major units using the currency's own fraction digits.
  const fractionDigits = formatter.resolvedOptions().maximumFractionDigits ?? 2;
  return formatter.format(value.amount / 10 ** fractionDigits);
}

/** Percentage saved when a compareAtPrice is present, rounded to an integer. */
export function discountPercent(price: Money, compareAtPrice?: Money): number | null {
  if (!compareAtPrice || compareAtPrice.amount <= price.amount) return null;
  return Math.round(((compareAtPrice.amount - price.amount) / compareAtPrice.amount) * 100);
}
