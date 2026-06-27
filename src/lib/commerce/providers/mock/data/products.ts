import type {
  Product,
  ProductBadge,
  ProductDetail,
  ProductVariant,
  SizeGuide,
} from "@/lib/commerce/types";
import { demoImage, type DemoImageRef } from "./images";

/**
 * ─────────────────────────────────────────────────────────────────────────
 *  DEMO PRODUCT CATALOG
 *
 *  Products are authored as compact SEEDS and expanded into full Product
 *  objects (colour × size variants) by buildProduct(). To add a product,
 *  append a seed below — no need to write variants by hand.
 *
 *  All IDs and timestamps are DETERMINISTIC (no Math.random) so the catalog
 *  renders identically on the server and client and is safe for static
 *  generation. Replace this file with your own data or, better, swap the
 *  provider entirely — see src/lib/commerce/providers/README.md.
 * ─────────────────────────────────────────────────────────────────────────
 */

const CURRENCY = "USD";

/** Shared colour swatches reused across seeds. */
const COLORS = {
  ivory: { name: "Ivory", hex: "#ECE7DE" },
  black: { name: "Black", hex: "#1B1815" },
  camel: { name: "Camel", hex: "#B08D57" },
  charcoal: { name: "Charcoal", hex: "#3A3A3A" },
  sage: { name: "Sage", hex: "#9CA88F" },
  wine: { name: "Wine", hex: "#6E2A33" },
  stone: { name: "Stone", hex: "#B9B2A6" },
  navy: { name: "Navy", hex: "#2B3A55" },
} as const;

const APPAREL_SIZES = ["XS", "S", "M", "L", "XL"];
const ONE_SIZE = ["One Size"];

/** Default accordion content appended to every product. */
const DEFAULT_DETAILS: ProductDetail[] = [
  {
    title: "Materials & Origin",
    content:
      "Crafted from responsibly sourced fibres in a family-run European atelier. Replace this copy with your own product specifications.",
  },
  {
    title: "Care",
    content:
      "Dry clean only. Store on a padded hanger away from direct sunlight to preserve colour and drape.",
  },
  {
    title: "Shipping & Returns",
    content:
      "Complimentary carbon-neutral shipping. Free returns within 30 days on unworn items with tags attached.",
  },
];

const APPAREL_SIZE_GUIDE: SizeGuide = {
  columns: ["Size", "Bust (in)", "Waist (in)", "Hip (in)"],
  rows: [
    { label: "XS", values: ["31–32", "24–25", "34–35"] },
    { label: "S", values: ["33–34", "26–27", "36–37"] },
    { label: "M", values: ["35–36", "28–29", "38–39"] },
    { label: "L", values: ["37–39", "30–32", "40–42"] },
    { label: "XL", values: ["40–42", "33–35", "43–45"] },
  ],
  note: "Measurements are body measurements, not garment dimensions. Between sizes? Size up for a relaxed fit.",
};

interface ProductSeed {
  slug: string;
  title: string;
  subtitle?: string;
  category: string;
  collections: string[];
  /** Price in minor units (cents). */
  price: number;
  /** Optional original price for sale display (minor units). */
  compareAtPrice?: number;
  colors: Array<{ name: string; hex: string }>;
  sizes: string[];
  description: string;
  tags: string[];
  images: DemoImageRef[];
  rating: number;
  reviewCount: number;
  badges?: ProductBadge[];
  featured?: boolean;
  newArrival?: boolean;
  bestSeller?: boolean;
  /** Variant titles ("Colour / Size") that are out of stock. */
  soldOut?: string[];
}

function slugify(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

/** Expand a seed into a full Product with colour × size variants. */
function buildProduct(seed: ProductSeed, index: number): Product {
  const id = `prod_${seed.slug}`;
  const hasSizes = !(seed.sizes.length === 1 && seed.sizes[0] === "One Size");
  const images = seed.images.map((ref) => demoImage(ref, 1200, 1500));

  const variants: ProductVariant[] = [];
  for (const color of seed.colors) {
    for (const size of seed.sizes) {
      const title = hasSizes ? `${color.name} / ${size}` : color.name;
      const selectedOptions = hasSizes
        ? [
            { name: "Colour", value: color.name },
            { name: "Size", value: size },
          ]
        : [{ name: "Colour", value: color.name }];
      variants.push({
        id: `${id}-${slugify(color.name)}-${slugify(size)}`,
        title,
        sku: `CLV-${seed.slug.slice(0, 6).toUpperCase()}-${slugify(color.name).slice(0, 3).toUpperCase()}-${slugify(size).toUpperCase()}`,
        selectedOptions,
        price: { amount: seed.price, currencyCode: CURRENCY },
        compareAtPrice: seed.compareAtPrice
          ? { amount: seed.compareAtPrice, currencyCode: CURRENCY }
          : undefined,
        available: !seed.soldOut?.includes(title),
        inventoryQuantity: seed.soldOut?.includes(title) ? 0 : 12,
      });
    }
  }

  const options = [
    {
      id: `${id}-opt-colour`,
      name: "Colour",
      values: seed.colors.map((c) => ({ value: c.name, hex: c.hex })),
    },
    ...(hasSizes
      ? [
          {
            id: `${id}-opt-size`,
            name: "Size",
            values: seed.sizes.map((s) => ({ value: s })),
          },
        ]
      : []),
  ];

  // Deterministic descending dates so "newest" sort is stable.
  const created = new Date(Date.UTC(2026, 5, 24) - index * 86_400_000).toISOString();

  return {
    id,
    slug: seed.slug,
    title: seed.title,
    subtitle: seed.subtitle,
    description: seed.description,
    images,
    options,
    variants,
    price: { amount: seed.price, currencyCode: CURRENCY },
    compareAtPrice: seed.compareAtPrice
      ? { amount: seed.compareAtPrice, currencyCode: CURRENCY }
      : undefined,
    currencyCode: CURRENCY,
    tags: seed.tags,
    collectionIds: seed.collections.map((handle) => `col_${handle}`),
    categories: [seed.category],
    rating: seed.rating,
    reviewCount: seed.reviewCount,
    badges: seed.badges,
    details: DEFAULT_DETAILS,
    sizeGuide: hasSizes ? APPAREL_SIZE_GUIDE : undefined,
    featured: seed.featured,
    newArrival: seed.newArrival,
    bestSeller: seed.bestSeller,
    createdAt: created,
  };
}

const SEEDS: ProductSeed[] = [
  {
    slug: "atelier-wool-coat",
    title: "The Atelier Wool Coat",
    subtitle: "Double-faced virgin wool",
    category: "Outerwear",
    collections: ["outerwear", "featured"],
    price: 89000,
    colors: [COLORS.camel, COLORS.charcoal],
    sizes: APPAREL_SIZES,
    description:
      "A sculptural long-line coat cut from double-faced virgin wool, finished with a concealed placket and a softly structured shoulder. The piece that anchors a winter wardrobe.",
    tags: ["wool", "coat", "winter", "tailored"],
    images: [
      { local: "coat-camel-1", unsplash: "1539533113208-f6df8cc8b543", alt: "Model wearing a camel wool coat" },
      { local: "coat-camel-2", unsplash: "1548624313-0396c75e4b1a", alt: "Detail of wool coat lapel" },
    ],
    rating: 4.8,
    reviewCount: 64,
    badges: ["bestseller"],
    featured: true,
    bestSeller: true,
  },
  {
    slug: "ivory-silk-slip-dress",
    title: "Ivory Silk Slip Dress",
    subtitle: "Bias-cut sandwashed silk",
    category: "Dresses",
    collections: ["dresses", "new-arrivals", "featured"],
    price: 42000,
    colors: [COLORS.ivory, COLORS.black],
    sizes: APPAREL_SIZES,
    description:
      "A bias-cut slip in sandwashed silk that skims the body and catches the light. Adjustable straps and a cowl back make it as suited to evening as to layering.",
    tags: ["silk", "dress", "evening", "occasion"],
    images: [
      { local: "slip-ivory-1", unsplash: "1595777457583-95e059d581b8", alt: "Ivory silk slip dress" },
      { local: "slip-ivory-2", unsplash: "1566174053879-31528523f8ae", alt: "Back detail of slip dress" },
    ],
    rating: 4.7,
    reviewCount: 41,
    badges: ["new"],
    featured: true,
    newArrival: true,
  },
  {
    slug: "cashmere-crewneck",
    title: "Cashmere Crewneck",
    subtitle: "Grade-A Mongolian cashmere",
    category: "Knitwear",
    collections: ["knitwear", "featured"],
    price: 31000,
    colors: [COLORS.ivory, COLORS.sage, COLORS.charcoal],
    sizes: APPAREL_SIZES,
    description:
      "An everyday luxury: a relaxed crewneck knitted from grade-A Mongolian cashmere with ribbed trims and a clean, rounded neckline.",
    tags: ["cashmere", "knit", "everyday"],
    images: [
      { local: "crew-ivory-1", unsplash: "1576566588028-4147f3842f27", alt: "Ivory cashmere crewneck" },
      { local: "crew-ivory-2", unsplash: "1591047139829-d91aecb6caea", alt: "Knit detail" },
    ],
    rating: 4.9,
    reviewCount: 112,
    badges: ["bestseller"],
    bestSeller: true,
  },
  {
    slug: "tailored-wool-trousers",
    title: "Tailored Wool Trousers",
    subtitle: "High-rise, straight leg",
    category: "Tailoring",
    collections: ["tailoring"],
    price: 29000,
    colors: [COLORS.black, COLORS.charcoal],
    sizes: APPAREL_SIZES,
    description:
      "A high-rise trouser with a pressed crease and a clean straight leg, cut from a fluid Italian wool blend that holds its line all day.",
    tags: ["wool", "trousers", "tailoring", "workwear"],
    images: [
      { local: "trouser-black-1", unsplash: "1594633312681-425c7b97ccd1", alt: "Tailored wool trousers" },
      { local: "trouser-black-2", unsplash: "1473966968600-fa801b869a1a", alt: "Trouser hem detail" },
    ],
    rating: 4.6,
    reviewCount: 38,
  },
  {
    slug: "oversized-trench-coat",
    title: "Oversized Trench Coat",
    subtitle: "Water-resistant cotton gabardine",
    category: "Outerwear",
    collections: ["outerwear", "new-arrivals"],
    price: 76000,
    compareAtPrice: 95000,
    colors: [COLORS.stone, COLORS.black],
    sizes: APPAREL_SIZES,
    description:
      "A reimagined trench in water-resistant cotton gabardine with a dropped shoulder, storm flap and a removable belt. Relaxed, architectural, season-spanning.",
    tags: ["trench", "coat", "outerwear", "sale"],
    images: [
      { local: "trench-stone-1", unsplash: "1591047139829-d91aecb6caea", alt: "Oversized trench coat" },
      { local: "trench-stone-2", unsplash: "1539533113208-f6df8cc8b543", alt: "Trench belt detail" },
    ],
    rating: 4.5,
    reviewCount: 29,
    badges: ["sale", "new"],
    newArrival: true,
  },
  {
    slug: "merino-turtleneck",
    title: "Merino Roll-Neck",
    subtitle: "Extra-fine merino wool",
    category: "Knitwear",
    collections: ["knitwear"],
    price: 24000,
    colors: [COLORS.black, COLORS.ivory, COLORS.wine],
    sizes: APPAREL_SIZES,
    description:
      "A second-skin roll-neck in extra-fine merino that layers without bulk. A quiet staple in a considered palette.",
    tags: ["merino", "knit", "roll-neck", "layering"],
    images: [
      { local: "rollneck-black-1", unsplash: "1608748010899-18f300247112", alt: "Merino roll-neck" },
      { local: "rollneck-black-2", unsplash: "1576566588028-4147f3842f27", alt: "Roll-neck collar detail" },
    ],
    rating: 4.7,
    reviewCount: 57,
  },
  {
    slug: "pleated-midi-skirt",
    title: "Pleated Midi Skirt",
    subtitle: "Knife-pleated twill",
    category: "Tailoring",
    collections: ["tailoring", "new-arrivals"],
    price: 26000,
    colors: [COLORS.charcoal, COLORS.camel],
    sizes: APPAREL_SIZES,
    description:
      "Sharp knife pleats in a fluid twill that moves with you. Sits high on the waist and falls to a refined mid-calf length.",
    tags: ["skirt", "pleated", "midi"],
    images: [
      { local: "skirt-charcoal-1", unsplash: "1583496661160-fb5886a0aaaa", alt: "Pleated midi skirt" },
      { local: "skirt-charcoal-2", unsplash: "1594633312681-425c7b97ccd1", alt: "Skirt pleat detail" },
    ],
    rating: 4.4,
    reviewCount: 22,
    badges: ["new"],
    newArrival: true,
  },
  {
    slug: "double-breasted-blazer",
    title: "Double-Breasted Blazer",
    subtitle: "Structured Italian wool",
    category: "Tailoring",
    collections: ["tailoring", "featured"],
    price: 54000,
    colors: [COLORS.navy, COLORS.black],
    sizes: APPAREL_SIZES,
    description:
      "A confident double-breasted blazer with peak lapels and a nipped waist, half-canvassed for structure that softens to the body over time.",
    tags: ["blazer", "tailoring", "wool", "jacket"],
    images: [
      { local: "blazer-navy-1", unsplash: "1507003211169-0a1dd7228f2d", alt: "Double-breasted blazer" },
      { local: "blazer-navy-2", unsplash: "1521577352947-9bb58764b69a", alt: "Blazer lapel detail" },
    ],
    rating: 4.8,
    reviewCount: 49,
    featured: true,
  },
  {
    slug: "linen-shirt",
    title: "Relaxed Linen Shirt",
    subtitle: "Garment-washed European linen",
    category: "Shirts",
    collections: ["essentials", "new-arrivals"],
    price: 18000,
    colors: [COLORS.ivory, COLORS.sage],
    sizes: APPAREL_SIZES,
    description:
      "A relaxed shirt in garment-washed European linen with a lived-in softness from the first wear. Mother-of-pearl buttons; a gently dropped shoulder.",
    tags: ["linen", "shirt", "summer", "essential"],
    images: [
      { local: "shirt-ivory-1", unsplash: "1598033129183-c4f50c736f10", alt: "Relaxed linen shirt" },
      { local: "shirt-ivory-2", unsplash: "1564584217132-2271feaeb3c5", alt: "Linen shirt cuff detail" },
    ],
    rating: 4.5,
    reviewCount: 33,
    badges: ["new"],
    newArrival: true,
  },
  {
    slug: "cashmere-wrap-scarf",
    title: "Cashmere Wrap Scarf",
    subtitle: "Brushed double-ply cashmere",
    category: "Accessories",
    collections: ["accessories"],
    price: 19000,
    colors: [COLORS.camel, COLORS.charcoal, COLORS.ivory],
    sizes: ONE_SIZE,
    description:
      "An oversized wrap in brushed double-ply cashmere, generous enough to double as a travel throw. Finished with hand-knotted fringe.",
    tags: ["cashmere", "scarf", "accessory", "gift"],
    images: [
      { local: "scarf-camel-1", unsplash: "1457545195570-67f207084966", alt: "Cashmere wrap scarf" },
      { local: "scarf-camel-2", unsplash: "1519681393784-d120267933ba", alt: "Scarf fringe detail" },
    ],
    rating: 4.9,
    reviewCount: 88,
    badges: ["bestseller"],
    bestSeller: true,
  },
  {
    slug: "silk-evening-gown",
    title: "Silk Evening Gown",
    subtitle: "Floor-length crêpe de chine",
    category: "Dresses",
    collections: ["dresses"],
    price: 98000,
    colors: [COLORS.black, COLORS.wine],
    sizes: APPAREL_SIZES,
    description:
      "A floor-sweeping column gown in heavyweight silk crêpe de chine, draped at the shoulder and open at the back. Made in a limited run.",
    tags: ["silk", "gown", "evening", "occasion", "limited"],
    images: [
      { local: "gown-black-1", unsplash: "1566174053879-31528523f8ae", alt: "Silk evening gown" },
      { local: "gown-black-2", unsplash: "1595777457583-95e059d581b8", alt: "Gown back detail" },
    ],
    rating: 5.0,
    reviewCount: 17,
    badges: ["limited"],
    soldOut: ["Black / XS"],
  },
  {
    slug: "ribbed-knit-cardigan",
    title: "Ribbed Knit Cardigan",
    subtitle: "Chunky lambswool rib",
    category: "Knitwear",
    collections: ["knitwear"],
    price: 33000,
    colors: [COLORS.stone, COLORS.black],
    sizes: APPAREL_SIZES,
    description:
      "A generous, hip-length cardigan in a chunky lambswool rib with horn buttons and patch pockets. Made to be lived in.",
    tags: ["knit", "cardigan", "lambswool", "cosy"],
    images: [
      { local: "cardigan-stone-1", unsplash: "1583744946564-b52ac1c389c8", alt: "Ribbed knit cardigan" },
      { local: "cardigan-stone-2", unsplash: "1591047139829-d91aecb6caea", alt: "Cardigan button detail" },
    ],
    rating: 4.6,
    reviewCount: 44,
  },
  {
    slug: "leather-tote-bag",
    title: "Structured Leather Tote",
    subtitle: "Full-grain vegetable-tanned leather",
    category: "Accessories",
    collections: ["accessories", "featured"],
    price: 62000,
    colors: [COLORS.black, COLORS.camel],
    sizes: ONE_SIZE,
    description:
      "A structured north-south tote in full-grain vegetable-tanned leather that patinas beautifully. Suede-lined, with a removable zip pouch.",
    tags: ["leather", "bag", "tote", "accessory"],
    images: [
      { local: "tote-black-1", unsplash: "1584917865442-de89df76afd3", alt: "Structured leather tote" },
      { local: "tote-black-2", unsplash: "1548036328-c9fa89d128fa", alt: "Tote handle detail" },
    ],
    rating: 4.8,
    reviewCount: 71,
    badges: ["bestseller"],
    featured: true,
    bestSeller: true,
  },
  {
    slug: "cropped-wool-jacket",
    title: "Cropped Wool Jacket",
    subtitle: "Boxy boiled-wool",
    category: "Outerwear",
    collections: ["outerwear"],
    price: 48000,
    compareAtPrice: 60000,
    colors: [COLORS.ivory, COLORS.charcoal],
    sizes: APPAREL_SIZES,
    description:
      "A boxy, cropped jacket in dense boiled wool with a collarless neckline and gold-tone hook closures. Equally at home over tailoring or denim.",
    tags: ["wool", "jacket", "cropped", "sale"],
    images: [
      { local: "jacket-ivory-1", unsplash: "1490481651871-ab68de25d43d", alt: "Cropped wool jacket" },
      { local: "jacket-ivory-2", unsplash: "1551488831-00ddcb6c6bd3", alt: "Jacket closure detail" },
    ],
    rating: 4.5,
    reviewCount: 26,
    badges: ["sale"],
  },
];

/** The fully-expanded demo catalog. */
export const products: Product[] = SEEDS.map(buildProduct);

/** Quick lookup helpers used by the mock provider. */
export const productBySlug = new Map(products.map((p) => [p.slug, p]));
export const productById = new Map(products.map((p) => [p.id, p]));
