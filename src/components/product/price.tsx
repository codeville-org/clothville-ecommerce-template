import { discountPercent, formatMoney, type Money } from "@/lib/commerce";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils/cn";

/** Price with optional struck-through compare-at price and discount tag. */
export function Price({
  price,
  compareAtPrice,
  showDiscount = false,
  className,
}: {
  price: Money;
  compareAtPrice?: Money;
  showDiscount?: boolean;
  className?: string;
}) {
  const percent = discountPercent(price, compareAtPrice);
  const onSale = percent !== null;

  return (
    <span className={cn("inline-flex items-baseline gap-2", className)}>
      <span className={cn(onSale && "text-destructive")}>{formatMoney(price, siteConfig.locale)}</span>
      {onSale && compareAtPrice && (
        <span className="text-sm text-muted-foreground line-through">
          {formatMoney(compareAtPrice, siteConfig.locale)}
        </span>
      )}
      {showDiscount && onSale && (
        <span className="text-xs font-medium uppercase tracking-[0.1em] text-destructive">
          −{percent}%
        </span>
      )}
    </span>
  );
}
