import Link from "next/link";
import type { Collection } from "@/lib/commerce";
import { Media } from "@/components/common/media";
import { cn } from "@/lib/utils/cn";

/** Collection tile with cover image, gradient scrim and label. */
export function CollectionCard({
  collection,
  sizes = "(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw",
  className,
}: {
  collection: Collection;
  sizes?: string;
  className?: string;
}) {
  return (
    <Link
      href={`/collections/${collection.handle}`}
      className={cn("group relative block aspect-[3/4] overflow-hidden bg-muted", className)}
    >
      {collection.image && (
        <Media
          image={collection.image}
          sizes={sizes}
          className="transition-transform duration-700 ease-luxe group-hover:scale-105"
        />
      )}
      <div className="absolute inset-0 bg-linear-to-t from-foreground/55 via-foreground/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6 text-background">
        <h3 className="font-serif text-2xl">{collection.title}</h3>
        <p className="mt-1 text-xs uppercase tracking-[0.18em]">{collection.productIds.length} pieces</p>
      </div>
    </Link>
  );
}
