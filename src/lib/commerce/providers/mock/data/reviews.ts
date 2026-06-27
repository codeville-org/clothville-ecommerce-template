import type { Review } from "@/lib/commerce/types";
import { products } from "./products";

/**
 * Demo reviews, generated deterministically from a small template pool so the
 * PDP review UI is populated without hand-authoring hundreds of entries.
 */

interface ReviewTemplate {
  author: string;
  rating: number;
  title: string;
  body: string;
}

const POOL: ReviewTemplate[] = [
  {
    author: "Amara L.",
    rating: 5,
    title: "Exceptional quality",
    body: "The craftsmanship is evident the moment you unbox it. Worth every penny — it has become the most-worn piece in my wardrobe.",
  },
  {
    author: "Julien R.",
    rating: 5,
    title: "Beautifully made",
    body: "Impeccable finishing and a cut that flatters. Sizing was true to the guide. I'll be back for more.",
  },
  {
    author: "Sofia M.",
    rating: 4,
    title: "Lovely, runs slightly large",
    body: "Gorgeous fabric and colour. I sized down and the fit was perfect. Shipping was quick and beautifully packaged.",
  },
  {
    author: "Daniel K.",
    rating: 5,
    title: "A modern classic",
    body: "Understated and elegant — exactly the quiet luxury I was hoping for. Photographs do not do the texture justice.",
  },
  {
    author: "Priya N.",
    rating: 4,
    title: "Investment piece",
    body: "Pricey but justified by the materials and make. Looks far more expensive than it is. Very happy.",
  },
  {
    author: "Elena V.",
    rating: 5,
    title: "Obsessed",
    body: "Drapes like a dream and the colour is even richer in person. I have already recommended it to friends.",
  },
];

function buildReviews(): Review[] {
  const all: Review[] = [];
  products.forEach((product, pIndex) => {
    const count = 2 + (pIndex % 3); // 2–4 reviews per product, deterministic
    for (let i = 0; i < count; i++) {
      const template = POOL[(pIndex + i) % POOL.length];
      all.push({
        id: `rev_${product.id}_${i}`,
        productId: product.id,
        author: template.author,
        rating: template.rating,
        title: template.title,
        body: template.body,
        createdAt: new Date(Date.UTC(2026, 4, 28) - (pIndex * 3 + i) * 86_400_000).toISOString(),
        verified: i % 2 === 0,
      });
    }
  });
  return all;
}

export const reviews: Review[] = buildReviews();
