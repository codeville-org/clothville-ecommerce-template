import NextImage from "next/image";
import type { Image as CommerceImage } from "@/lib/commerce";
import { cn } from "@/lib/utils/cn";

/**
 * Thin wrapper over next/image for domain {@link CommerceImage} values.
 * Fills its (positioned) parent, applies the blur placeholder, and skips the
 * optimizer for the bundled SVG demo placeholders. Wrap it in a relative,
 * aspect-ratio container.
 *
 * @example
 * <div className="relative aspect-[4/5] overflow-hidden">
 *   <Media image={product.images[0]} sizes="(max-width:768px) 50vw, 25vw" />
 * </div>
 */
export function Media({
  image,
  sizes,
  priority,
  className,
}: {
  image: CommerceImage;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  const isSvg = image.url.endsWith(".svg");
  return (
    <NextImage
      src={image.url}
      alt={image.alt}
      fill
      sizes={sizes}
      priority={priority}
      unoptimized={isSvg}
      placeholder={image.blurDataURL ? "blur" : "empty"}
      blurDataURL={image.blurDataURL}
      className={cn("object-cover", className)}
    />
  );
}
