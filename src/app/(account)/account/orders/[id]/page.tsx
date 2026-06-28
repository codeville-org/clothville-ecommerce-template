import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { commerce } from "@/lib/commerce";
import { AccountShell } from "@/components/account/account-shell";
import { OrderDetail } from "@/components/account/order-detail";

export const metadata: Metadata = {
  title: "Order",
  robots: { index: false },
};

export default async function OrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = await commerce.getOrder(id);
  if (!order) notFound();

  return (
    <AccountShell title={`Order ${order.number}`}>
      <OrderDetail order={order} />
    </AccountShell>
  );
}
