"use client";

import { useState } from "react";
import type { Image as CommerceImage } from "@/lib/commerce";
import { Media } from "@/components/common/media";
import { cn } from "@/lib/utils/cn";

/** PDP gallery: large main image with click-to-zoom and thumbnail rail. */
export function ImageGallery({ images }: { images: CommerceImage[] }) {
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const main = images[active] ?? images[0];

  if (!main) return <div className="aspect-[4/5] w-full bg-muted" />;

  return (
    <div className="flex flex-col-reverse gap-4 sm:flex-row">
      {images.length > 1 && (
        <div className="flex gap-3 sm:flex-col">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setActive(i);
                setZoomed(false);
              }}
              aria-label={`View image ${i + 1}`}
              aria-current={i === active}
              className={cn(
                "relative aspect-[4/5] w-16 shrink-0 overflow-hidden bg-muted transition sm:w-20",
                i === active ? "ring-1 ring-foreground" : "opacity-70 hover:opacity-100",
              )}
            >
              <Media image={img} sizes="80px" />
            </button>
          ))}
        </div>
      )}

      <div className="relative aspect-[4/5] flex-1 overflow-hidden bg-muted">
        <button
          type="button"
          onClick={() => setZoomed((z) => !z)}
          aria-label={zoomed ? "Zoom out" : "Zoom in"}
          className={cn("block h-full w-full", zoomed ? "cursor-zoom-out" : "cursor-zoom-in")}
        >
          <Media
            image={main}
            priority
            sizes="(min-width:1024px) 45vw, 100vw"
            className={cn("transition-transform duration-500 ease-luxe", zoomed && "scale-150")}
          />
        </button>
      </div>
    </div>
  );
}
