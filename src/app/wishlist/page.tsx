import type { Metadata } from "next";
import { getProducts } from "@/lib/commerce";
import { Container } from "@/components/common/container";
import { WishlistView } from "@/components/wishlist/wishlist-view";

export const metadata: Metadata = {
  title: "Wishlist",
  robots: { index: false },
};

export default async function WishlistPage() {
  const { items } = await getProducts({ pageSize: 1000 });

  return (
    <Container className="py-12">
      <h1 className="font-serif text-4xl sm:text-5xl">Wishlist</h1>
      <div className="mt-10">
        <WishlistView products={items} />
      </div>
    </Container>
  );
}
