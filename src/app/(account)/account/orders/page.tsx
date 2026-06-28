import type { Metadata } from "next";
import { commerce } from "@/lib/commerce";
import { AccountShell } from "@/components/account/account-shell";
import { OrdersList } from "@/components/account/orders-list";

export const metadata: Metadata = {
  title: "Orders",
  robots: { index: false },
};

export default async function OrdersPage() {
  const orders = await commerce.getOrders();

  return (
    <AccountShell title="Orders">
      <OrdersList orders={orders} />
    </AccountShell>
  );
}
