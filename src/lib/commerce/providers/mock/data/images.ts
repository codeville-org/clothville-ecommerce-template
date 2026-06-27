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
  /** File name under /public/demo/products (without extension) for local mode. */
  local: string;
  /** Unsplash photo id (the part after `photo-`) for remote demo mode. */
  unsplash?: string;
  alt: string;
}

/**
 * Resolve a demo image reference into a domain {@link Image}, choosing the
 * local placeholder or the Unsplash URL based on the env flag.
 */
export function demoImage(ref: DemoImageRef, width = 1200, height = 1500): Image {
  const url =
    USE_UNSPLASH && ref.unsplash
      ? `https://images.unsplash.com/photo-${ref.unsplash}?auto=format&fit=crop&w=${width}&h=${height}&q=80`
      : `/demo/products/${ref.local}.svg`;

  return { url, alt: ref.alt, width, height, blurDataURL: BLUR_DATA_URL };
}
