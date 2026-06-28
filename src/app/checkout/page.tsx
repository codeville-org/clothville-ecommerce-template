import type { Metadata } from "next";
import { Container } from "@/components/common/container";
import { CheckoutFlow } from "@/components/checkout/checkout-flow";

export const metadata: Metadata = {
  title: "Checkout",
  robots: { index: false },
};

export default function CheckoutPage() {
  return (
    <Container className="py-12">
      <CheckoutFlow />
    </Container>
  );
}
