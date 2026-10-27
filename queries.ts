// Static store layer — the site reads everything from src/lib/catalog.ts.
// No database connection is required at runtime: to add or edit a book,
// update catalog.ts and redeploy. That's it.
import { DEMO_COLLECTIONS, DEMO_PRODUCTS, type DemoProduct } from "@/lib/catalog";
import type {
  CollectionRecord,
  ProductRecord,
  ProductWithStats,
  RatingStats,
  ReviewRecord,
} from "@/lib/types";

export type ShopProduct = ProductWithStats & { collectionSlug: string };

export type ProductDetail = {
  product: ProductRecord & { collectionSlug: string; collectionName: string };
  stats: RatingStats;
  distribution: { rating: number; count: number }[];
  reviews: ReviewRecord[];
  related: ShopProduct[];
};

export type FeaturedReview = ReviewRecord & { productTitle: string; productSlug: string };

/* ---------- build static records once ---------- */

const collectionsList: CollectionRecord[] = DEMO_COLLECTIONS.map((c, i) => ({
  id: i + 1,
  slug: c.slug,
  name: c.name,
  tagline: c.tagline,
  description: c.description,
  image: c.image,
  sort: c.sort,
}));

function productToRecord(p: DemoProduct, index: number, collectionId: number): ProductRecord {
  return {
    id: index + 1,
    slug: p.slug,
    title: p.title,
    subtitle: p.subtitle,
    author: p.author,
    description: p.description,
    price: p.price,
    compareAt: p.compareAt ?? null,
    hardcoverPrice: p.hardcoverPrice ?? null,
    pages: p.pages,
    dimensions: p.dimensions,
    badge: p.badge ?? null,
    featured: p.featured ?? false,
    stock: p.stock,
    amazonUrl: p.amazonUrl ?? null,
    amazonUrlPrint: p.amazonUrlPrint ?? null,
    printPrice: p.printPrice ?? null,
    printFormat: p.printFormat ?? null,
    coverImage: p.coverImage ?? null,
    cover: p.cover,
    insideQuote: p.insideQuote,
    collectionId,
    createdAt: new Date(p.createdAt + "T12:00:00Z"),
  };
}

const reviewsList: ReviewRecord[] = DEMO_PRODUCTS.flatMap((p, productIndex) =>
  p.reviews.map((r, i) => ({
    id: productIndex * 100 + i + 1,
    productId: productIndex + 1,
    author: r.author,
    location: r.location || null,
    rating: r.rating,
    title: r.title,
    body: r.body,
    verified: r.verified,
    createdAt: new Date(r.date + "T12:00:00Z"),
  })),
);

function statsFor(productIndex: number): RatingStats {
  const list = reviewsList.filter((r) => r.productId === productIndex + 1);
  if (list.length === 0) return { avg: 0, count: 0 };
  return {
    avg: list.reduce((s, r) => s + r.rating, 0) / list.length,
    count: list.length,
  };
}

const productList: ShopProduct[] = DEMO_PRODUCTS.map((p, i) => {
  const collection = collectionsList.find((c) => c.slug === p.collection)!;
  const record = productToRecord(p, i, collection.id);
  return { ...record, collectionSlug: collection.slug, stats: statsFor(i) };
});

/* ---------- public API (same signatures as before) ---------- */

export async function getCollections(): Promise<CollectionRecord[]> {
  return collectionsList;
}

export async function getShopProducts(): Promise<ShopProduct[]> {
  return productList;
}

export async function getFeaturedProducts(limit = 8): Promise<ShopProduct[]> {
  const featured = productList.filter((p) => p.featured);
  featured.sort((a, b) => b.stats.count - a.stats.count || b.stats.avg - a.stats.avg);
  return featured.slice(0, limit);
}

export async function getBestsellers(limit = 4): Promise<ShopProduct[]> {
  const all = [...productList];
  all.sort(
    (a, b) =>
      b.stats.avg * Math.log(b.stats.count + 1) - a.stats.avg * Math.log(a.stats.count + 1),
  );
  return all.slice(0, limit);
}

export async function getNewArrivals(limit = 6): Promise<ShopProduct[]> {
  const all = [...productList];
  all.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  return all.slice(0, limit);
}

export async function getProductBySlug(slug: string): Promise<ProductDetail | null> {
  const product = productList.find((p) => p.slug === slug);
  if (!product) return null;

  const list = reviewsList
    .filter((r) => r.productId === product.id)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  const distribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: list.filter((r) => r.rating === rating).length,
  }));

  const collection = collectionsList.find((c) => c.id === product.collectionId)!;

  const related = productList
    .filter((p) => p.collectionId === product.collectionId && p.id !== product.id)
    .slice(0, 4);

  return {
    product: { ...product, collectionSlug: collection.slug, collectionName: collection.name },
    stats: product.stats,
    distribution,
    reviews: list,
    related,
  };
}

export async function getStoreStats() {
  return {
    titles: productList.length,
    reviews: reviewsList.length,
    avgRating: reviewsList.length
      ? reviewsList.reduce((s, r) => s + r.rating, 0) / reviewsList.length
      : 0,
  };
}

export async function getTopReviews(limit = 3): Promise<FeaturedReview[]> {
  return reviewsList
    .filter((r) => r.rating === 5)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, limit)
    .map((r) => {
      const product = productList.find((p) => p.id === r.productId)!;
      return { ...r, productTitle: product.title, productSlug: product.slug };
    });
}
