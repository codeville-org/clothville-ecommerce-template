import type { Collection } from "@/lib/commerce/types";
import { products } from "./products";

/**
 * Demo collections. Membership is derived from each product's `collectionIds`,
 * so adding a product to a collection only requires editing its seed in
 * products.ts. Collection cover images reuse the first member product's image
 * (no extra assets to manage).
 */

interface CollectionMeta {
  handle: string;
  title: string;
  description: string;
  featured?: boolean;
}

const COLLECTION_META: CollectionMeta[] = [
  {
    handle: "new-arrivals",
    title: "New Arrivals",
    description: "The latest additions to the house — fresh cuts, new palettes.",
    featured: true,
  },
  {
    handle: "outerwear",
    title: "Outerwear",
    description: "Coats and jackets built to outlast the season and the trend.",
    featured: true,
  },
  {
    handle: "knitwear",
    title: "Knitwear",
    description: "Cashmere, merino and lambswool, knitted for everyday luxury.",
    featured: true,
  },
  {
    handle: "tailoring",
    title: "Tailoring",
    description: "Considered suiting and separates with an easy, modern line.",
  },
  {
    handle: "dresses",
    title: "Dresses",
    description: "From silk slips to floor-length gowns for every occasion.",
    featured: true,
  },
  {
    handle: "accessories",
    title: "Accessories",
    description: "The finishing touches — leather, cashmere and quiet hardware.",
  },
  {
    handle: "essentials",
    title: "Essentials",
    description: "The foundation pieces a considered wardrobe is built upon.",
  },
  {
    handle: "featured",
    title: "Editor's Edit",
    description: "A curated selection, chosen by our studio.",
  },
];

function buildCollection(meta: CollectionMeta): Collection {
  const id = `col_${meta.handle}`;
  const members = products.filter((p) => p.collectionIds.includes(id));
  return {
    id,
    handle: meta.handle,
    title: meta.title,
    description: meta.description,
    image: members[0]?.images[0],
    productIds: members.map((p) => p.id),
    featured: meta.featured,
  };
}

export const collections: Collection[] = COLLECTION_META.map(buildCollection);

export const collectionByHandle = new Map(collections.map((c) => [c.handle, c]));
