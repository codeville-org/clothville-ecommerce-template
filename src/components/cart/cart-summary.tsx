import type { Cart, Money } from "@/lib/commerce";
import { formatMoney } from "@/lib/commerce";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils/cn";
import { Separator } from "@/components/ui/separator";

function Row({
  label,
  value,
  accent,
  muted,
  strong,
}: {
  label: string;
  value: string;
  accent?: boolean;
  muted?: boolean;
  strong?: boolean;
}) {
  return (
    <div className={cn("flex items-center justify-between", strong && "text-base")}>
      <dt className={cn(muted && "text-muted-foreground")}>{label}</dt>
      <dd
        className={cn(
          "tabular-nums",
          accent && "text-destructive",
          strong && "font-medium",
        )}
      >
        {value}
      </dd>
    </div>
  );
}

/** Order totals breakdown. Presentational — pass a Cart from any source. */
export function CartSummary({ cart, className }: { cart: Cart; className?: string }) {
  const fm = (m: Money) => formatMoney(m, siteConfig.locale);
  const hasDiscount = cart.discountTotal.amount < 0;

  return (
    <dl className={cn("space-y-2.5 text-sm", className)}>
      <Row label="Subtotal" value={fm(cart.subtotal)} />
      {hasDiscount && (
        <Row
          label={cart.discountCode ? `Discount · ${cart.discountCode}` : "Discount"}
          value={fm(cart.discountTotal)}
          accent
        />
      )}
      <Row
        label="Shipping"
        value={cart.shippingTotal.amount === 0 ? "Complimentary" : fm(cart.shippingTotal)}
        muted
      />
      <Row label="Estimated tax" value={fm(cart.taxTotal)} muted />
      <Separator className="my-1.5" />
      <Row label="Total" value={fm(cart.total)} strong />
    </dl>
  );
}
