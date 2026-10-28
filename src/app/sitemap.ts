import type { MetadataRoute } from "next";
import { DEMO_PRODUCTS } from "@/lib/catalog";
import { SITE_URL } from "@/lib/site";

const BASE_URL = SITE_URL;

export default function sitemap(): MetadataRoute.Sitemap {
  const bookPages: MetadataRoute.Sitemap = DEMO_PRODUCTS.map((p) => ({
    url: `${BASE_URL}/product/${p.slug}`,
    lastModified: new Date(p.createdAt),
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/shop`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/policies`, changeFrequency: "monthly", priority: 0.3 },
    ...bookPages,
  ];
}
