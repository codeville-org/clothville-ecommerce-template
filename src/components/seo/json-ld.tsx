import type { Product } from "@/lib/commerce";
import { siteConfig } from "@/config/site";

/** Render a JSON-LD <script>. Server component; safe in the page body. */
function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

function absolute(url: string): string {
  return url.startsWith("http") ? url : `${siteConfig.url}${url}`;
}

/** schema.org Product structured data for PDPs. */
export function ProductJsonLd({ product }: { product: Product }) {
  const prices = product.variants.map((v) => v.price.amount);
  const inStock = product.variants.some((v) => v.available);

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.title,
        description: product.description,
        image: product.images.map((i) => absolute(i.url)),
        sku: product.variants[0]?.sku,
        brand: { "@type": "Brand", name: siteConfig.name },
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: product.currencyCode,
          lowPrice: (Math.min(...prices) / 100).toFixed(2),
          highPrice: (Math.max(...prices) / 100).toFixed(2),
          offerCount: product.variants.length,
          availability: inStock
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
          url: `${siteConfig.url}/products/${product.slug}`,
        },
        ...(product.rating && product.reviewCount
          ? {
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: product.rating,
                reviewCount: product.reviewCount,
              },
            }
          : {}),
      }}
    />
  );
}

/** schema.org BreadcrumbList structured data. */
export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: item.url,
        })),
      }}
    />
  );
}

/** schema.org Organization for the site root. */
export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        sameAs: siteConfig.socials.map((s) => s.href),
      }}
    />
  );
}

/** schema.org WebSite with a search action for the site root. */
export function WebSiteJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: siteConfig.name,
        url: siteConfig.url,
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteConfig.url}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      }}
    />
  );
}
