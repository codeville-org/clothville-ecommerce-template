import type { MetadataRoute } from "next";
import { getCollections, getProducts } from "@/lib/commerce";
import { policyList } from "@/lib/content/policies";
import { siteConfig } from "@/config/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  const [products, collections] = await Promise.all([
    getProducts({ pageSize: 1000 }),
    getCollections(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/shop`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/collections`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/about`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/lookbook`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/contact`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${base}/faq`, changeFrequency: "monthly", priority: 0.4 },
  ];

  const collectionRoutes: MetadataRoute.Sitemap = collections.map((c) => ({
    url: `${base}/collections/${c.handle}`,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.items.map((p) => ({
    url: `${base}/products/${p.slug}`,
    lastModified: new Date(p.createdAt),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const policyRoutes: MetadataRoute.Sitemap = policyList.map((d) => ({
    url: `${base}/policies/${d.slug}`,
    lastModified: new Date(d.updated),
    changeFrequency: "yearly",
    priority: 0.3,
  }));

  return [...staticRoutes, ...collectionRoutes, ...productRoutes, ...policyRoutes];
}
