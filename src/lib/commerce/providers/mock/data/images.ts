import type { Image } from "@/lib/commerce/types";

/**
 * ─────────────────────────────────────────────────────────────────────────
 *  DEMO IMAGE RESOLVER (hybrid strategy)
 *
 *  By default the template ships LICENSE-CLEAN local placeholders committed
 *  under /public/demo (safe to redistribute in a sold template).
 *
 *  Set NEXT_PUBLIC_USE_UNSPLASH_DEMO="true" to instead pull editorial fashion
 *  photography from Unsplash (remote, nothing bundled) for a richer preview.
 *  Unsplash images are DEMO ONLY — buyers must supply their own licensed
 *  production imagery. See docs/demo-data-and-images.md.
 * ─────────────────────────────────────────────────────────────────────────
 */

const USE_UNSPLASH = process.env.NEXT_PUBLIC_USE_UNSPLASH_DEMO === "true";

/** Neutral bone-toned blur placeholder shared by all demo images. */
export const BLUR_DATA_URL =
  "data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='8'%20height='10'%3E%3Crect%20width='8'%20height='10'%20fill='%23e9e4da'/%3E%3C/svg%3E";

export interface DemoImageRef {
  /**
   * Local reference of the form `<style>-<colour>-<n>`, e.g. "coat-camel-1".
   * The colour segment selects one of the bundled tone placeholders.
   */
  local: string;
  /** Unsplash photo id (the part after `photo-`) for remote demo mode. */
  unsplash?: string;
  alt: string;
}

/** Tones for which a /public/demo/products/tone-*.svg placeholder exists. */
const TONES = new Set(["ivory", "stone", "camel", "charcoal", "black", "navy", "sage", "wine"]);

/** Pick the tone placeholder whose colour matches the ref (fallback: stone). */
function localPlaceholder(local: string): string {
  const colour = local.split("-")[1] ?? "";
  return `/demo/products/tone-${TONES.has(colour) ? colour : "stone"}.svg`;
}

/**
 * Resolve a demo image reference into a domain {@link Image}, choosing the
 * local placeholder or the Unsplash URL based on the env flag.
 */
export function demoImage(ref: DemoImageRef, width = 1200, height = 1500): Image {
  const url =
    USE_UNSPLASH && ref.unsplash
      ? `https://images.unsplash.com/photo-${ref.unsplash}?auto=format&fit=crop&w=${width}&h=${height}&q=80`
      : localPlaceholder(ref.local);

  return { url, alt: ref.alt, width, height, blurDataURL: BLUR_DATA_URL };
}
