import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, getProducts } from "@/lib/commerce";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/common/container";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { ImageGallery } from "@/components/product/image-gallery";
import { ProductDetails } from "@/components/product/product-details";
import { ProductReviews } from "@/components/product/product-reviews";
import { RelatedProducts } from "@/components/product/related-products";
import { BreadcrumbJsonLd, ProductJsonLd } from "@/components/seo/json-ld";

export async function generateStaticParams() {
  const { items } = await getProducts({ pageSize: 1000 });
  return items.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return {};

  const image = product.images[0]?.url;
  return {
    title: product.title,
    description: product.description,
    openGraph: {
      type: "website",
      title: product.title,
      description: product.description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: product.title },
  ];

  return (
    <Container className="py-10">
      <Breadcrumbs items={breadcrumbs} />

      <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <ImageGallery images={product.images} />
        <ProductDetails product={product} />
      </div>

      <div id="reviews" className="scroll-mt-28">
        <ProductReviews productId={product.id} />
      </div>

      <RelatedProducts productId={product.id} />

      <ProductJsonLd product={product} />
      <BreadcrumbJsonLd
        items={breadcrumbs.map((b) => ({
          name: b.label,
          url: b.href ? `${siteConfig.url}${b.href}` : `${siteConfig.url}/products/${product.slug}`,
        }))}
      />
    </Container>
  );
}
