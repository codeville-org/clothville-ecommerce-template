import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import type { Money, Order } from "@/lib/commerce";
import { formatMoney } from "@/lib/commerce";
import { siteConfig } from "@/config/site";
import { Media } from "@/components/common/media";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ORDER_STATUS } from "./orders-list";

const dateFormatter = new Intl.DateTimeFormat(siteConfig.locale, {
  year: "numeric",
  month: "long",
  day: "numeric",
});

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={strong ? "flex justify-between text-base font-medium" : "flex justify-between"}>
      <span className={strong ? "" : "text-muted-foreground"}>{label}</span>
      <span className="tabular-nums">{value}</span>
    </div>
  );
}

export function OrderDetail({ order }: { order: Order }) {
  const fm = (m: Money) => formatMoney(m, siteConfig.locale);

  return (
    <div>
      <Link
        href="/account/orders"
        className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.1em] text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft size={14} strokeWidth={1.5} /> All orders
      </Link>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <h2 className="font-serif text-2xl">{order.number}</h2>
        <Badge variant={ORDER_STATUS[order.status].variant}>{ORDER_STATUS[order.status].label}</Badge>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">
        Placed {dateFormatter.format(new Date(order.createdAt))}
      </p>

      <ul className="mt-8 divide-y divide-border border-y border-border">
        {order.lines.map((line) => (
          <li key={line.id} className="flex gap-4 py-5">
            <Link
              href={`/products/${line.slug}`}
              className="relative aspect-[4/5] w-16 shrink-0 overflow-hidden bg-muted"
            >
              {line.image && <Media image={line.image} sizes="64px" />}
            </Link>
            <div className="flex flex-1 justify-between gap-3">
              <div>
                <p className="text-sm font-medium">{line.title}</p>
                <p className="text-xs text-muted-foreground">{line.variantTitle}</p>
                <p className="mt-1 text-xs text-muted-foreground">Qty {line.quantity}</p>
              </div>
              <span className="text-sm tabular-nums">{fm(line.lineTotal)}</span>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8 grid gap-8 sm:grid-cols-2">
        <div className="space-y-2 text-sm">
          <Row label="Subtotal" value={fm(order.subtotal)} />
          {order.discountTotal.amount < 0 && <Row label="Discount" value={fm(order.discountTotal)} />}
          <Row
            label="Shipping"
            value={order.shippingTotal.amount === 0 ? "Complimentary" : fm(order.shippingTotal)}
          />
          <Row label="Tax" value={fm(order.taxTotal)} />
          <Separator className="my-1.5" />
          <Row label="Total" value={fm(order.total)} strong />
        </div>

        {order.shippingAddress && (
          <div className="text-sm">
            <h3 className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Shipping to</h3>
            <address className="mt-2 not-italic leading-relaxed text-foreground/80">
              {order.shippingAddress.firstName} {order.shippingAddress.lastName}
              <br />
              {order.shippingAddress.line1}
              {order.shippingAddress.line2 ? `, ${order.shippingAddress.line2}` : ""}
              <br />
              {order.shippingAddress.city}, {order.shippingAddress.province}{" "}
              {order.shippingAddress.postalCode}
              <br />
              {order.shippingAddress.country}
            </address>
          </div>
        )}
      </div>
    </div>
  );
}
