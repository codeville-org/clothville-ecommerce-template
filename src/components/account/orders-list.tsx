import Link from "next/link";
import { Package } from "lucide-react";
import type { Order, OrderStatus } from "@/lib/commerce";
import { formatMoney } from "@/lib/commerce";
import { siteConfig } from "@/config/site";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import { EmptyState } from "@/components/common/empty-state";

export const ORDER_STATUS: Record<OrderStatus, { label: string; variant: BadgeProps["variant"] }> = {
  pending: { label: "Pending", variant: "muted" },
  processing: { label: "Processing", variant: "muted" },
  shipped: { label: "Shipped", variant: "accent" },
  delivered: { label: "Delivered", variant: "solid" },
  cancelled: { label: "Cancelled", variant: "outline" },
  refunded: { label: "Refunded", variant: "outline" },
};

const dateFormatter = new Intl.DateTimeFormat(siteConfig.locale, {
  year: "numeric",
  month: "short",
  day: "numeric",
});

export function OrdersList({ orders }: { orders: Order[] }) {
  if (orders.length === 0) {
    return (
      <EmptyState
        icon={Package}
        title="No orders yet"
        description="When you place an order it will appear here."
        action={{ label: "Start shopping", href: "/shop" }}
      />
    );
  }

  return (
    <ul className="divide-y divide-border border-y border-border">
      {orders.map((order) => (
        <li key={order.id} className="flex flex-wrap items-center justify-between gap-4 py-5">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-medium">{order.number}</span>
              <Badge variant={ORDER_STATUS[order.status].variant}>
                {ORDER_STATUS[order.status].label}
              </Badge>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {dateFormatter.format(new Date(order.createdAt))} · {order.lines.length}{" "}
              {order.lines.length === 1 ? "item" : "items"}
            </p>
          </div>
          <div className="flex items-center gap-5">
            <span className="text-sm tabular-nums">{formatMoney(order.total, siteConfig.locale)}</span>
            <Link
              href={`/account/orders/${order.id}`}
              className="text-xs uppercase tracking-[0.1em] underline-offset-4 hover:underline"
            >
              View
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}
