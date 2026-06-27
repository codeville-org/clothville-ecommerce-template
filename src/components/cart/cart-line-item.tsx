"use client";

import Link from "next/link";
import { X } from "lucide-react";
import type { CartLine } from "@/lib/commerce";
import { formatMoney } from "@/lib/commerce";
import { siteConfig } from "@/config/site";
import { useCart } from "@/lib/store/cart";
import { Media } from "@/components/common/media";
import { QuantityStepper } from "@/components/common/quantity-stepper";

export function CartLineItem({
  line,
  onNavigate,
}: {
  line: CartLine;
  /** Called when a link is followed (e.g. to close the drawer). */
  onNavigate?: () => void;
}) {
  const updateItem = useCart((s) => s.updateItem);
  const removeItem = useCart((s) => s.removeItem);
  const href = `/products/${line.slug}`;

  return (
    <div className="flex gap-4">
      <Link
        href={href}
        onClick={onNavigate}
        className="relative aspect-[4/5] w-20 shrink-0 overflow-hidden bg-muted"
      >
        {line.image && <Media image={line.image} sizes="80px" />}
      </Link>

      <div className="flex flex-1 flex-col">
        <div className="flex justify-between gap-3">
          <div>
            <h4 className="text-sm font-medium leading-snug">
              <Link href={href} onClick={onNavigate} className="hover:text-accent">
                {line.title}
              </Link>
            </h4>
            <p className="mt-0.5 text-xs text-muted-foreground">{line.variantTitle}</p>
          </div>
          <button
            type="button"
            onClick={() => removeItem(line.id)}
            aria-label={`Remove ${line.title}`}
            className="inline-flex h-7 w-7 shrink-0 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
          >
            <X size={15} strokeWidth={1.5} />
          </button>
        </div>

        <div className="mt-auto flex items-center justify-between pt-3">
          <QuantityStepper value={line.quantity} onChange={(q) => updateItem(line.id, q)} />
          <span className="text-sm tabular-nums">{formatMoney(line.lineTotal, siteConfig.locale)}</span>
        </div>
      </div>
    </div>
  );
}
