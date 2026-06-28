import { getProductReviews } from "@/lib/commerce";
import { siteConfig } from "@/config/site";
import { RatingStars } from "./rating-stars";

const dateFormatter = new Intl.DateTimeFormat(siteConfig.locale, {
  year: "numeric",
  month: "long",
  day: "numeric",
});

/** Customer reviews with an aggregate summary. Hidden if the feature is off or empty. */
export async function ProductReviews({ productId }: { productId: string }) {
  if (!siteConfig.features.reviews) return null;

  const reviews = await getProductReviews(productId);
  if (reviews.length === 0) return null;

  const average = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  return (
    <section className="mt-16 border-t border-border pt-16">
      <div className="grid gap-10 lg:grid-cols-[18rem_1fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="font-serif text-3xl">Reviews</h2>
          <div className="mt-4 flex items-center gap-3">
            <span className="font-serif text-4xl">{average.toFixed(1)}</span>
            <div>
              <RatingStars rating={average} showCount={false} />
              <p className="mt-1 text-xs text-muted-foreground">
                Based on {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
              </p>
            </div>
          </div>
        </div>

        <ul className="space-y-8">
          {reviews.map((review) => (
            <li key={review.id} className="border-b border-border pb-8 last:border-0">
              <div className="flex items-center justify-between gap-4">
                <RatingStars rating={review.rating} showCount={false} />
                <time className="text-xs text-muted-foreground" dateTime={review.createdAt}>
                  {dateFormatter.format(new Date(review.createdAt))}
                </time>
              </div>
              {review.title && <h3 className="mt-3 text-sm font-medium">{review.title}</h3>}
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{review.body}</p>
              <p className="mt-3 text-xs uppercase tracking-[0.1em] text-foreground/70">
                {review.author}
                {review.verified && <span className="ml-2 text-accent">· Verified buyer</span>}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
