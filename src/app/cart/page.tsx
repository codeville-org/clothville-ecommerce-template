import type { Metadata } from "next";
import { Container } from "@/components/common/container";
import { CartView } from "@/components/cart/cart-view";

export const metadata: Metadata = {
  title: "Shopping Bag",
  robots: { index: false },
};

export default function CartPage() {
  return (
    <Container className="py-12">
      <h1 className="font-serif text-4xl sm:text-5xl">Shopping Bag</h1>
      <div className="mt-10">
        <CartView />
      </div>
    </Container>
  );
}
