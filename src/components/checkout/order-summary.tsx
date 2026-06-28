import type { Cart } from "@/lib/commerce";
import { formatMoney } from "@/lib/commerce";
import { siteConfig } from "@/config/site";
import { Media } from "@/components/common/media";
import { CartSummary } from "@/components/cart/cart-summary";

/** Compact order summary for the checkout sidebar. */
export function OrderSummary({ cart }: { cart: Cart }) {
  return (
    <div className="space-y-6">
      <ul className="space-y-4">
        {cart.lines.map((line) => (
          <li key={line.id} className="flex gap-4">
            <div className="relative aspect-[4/5] w-16 shrink-0 overflow-hidden bg-muted">
              {line.image && <Media image={line.image} sizes="64px" />}
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-foreground px-1 text-[0.65rem] text-background">
                {line.quantity}
              </span>
            </div>
            <div className="flex flex-1 justify-between gap-2">
              <div>
                <p className="text-sm font-medium leading-snug">{line.title}</p>
                <p className="text-xs text-muted-foreground">{line.variantTitle}</p>
              </div>
              <span className="text-sm tabular-nums">
                {formatMoney(line.lineTotal, siteConfig.locale)}
              </span>
            </div>
          </li>
        ))}
      </ul>
      <CartSummary cart={cart} />
    </div>
  );
}
