import type { Metadata } from "next";
import { BookX, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { ShopTools, type ShopFiltersState } from "@/components/shop-tools";
import { getCollections, getShopProducts } from "@/db/queries";

export const metadata: Metadata = {
  alternates: { canonical: "/shop" },
  title: "Shop all books",
  description:
    "Browse the PageCraft catalog — AI toolkits, coloring books, activity books and practical guides by independent author Mantu Ji, delivered safely via Amazon.",
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function parseFilters(raw: Record<string, string | string[] | undefined>): ShopFiltersState {
  const get = (k: string) => {
    const v = raw[k];
    return Array.isArray(v) ? v[0] : v;
  };
  return {
    q: get("q") ?? "",
    collections: (get("collection") ?? "").split(",").filter(Boolean),
    price: get("price") ?? "any",
    format: get("format") ?? "any",
    rating: get("rating") ?? "any",
    sort: get("sort") ?? "featured",
  };
}

function priceOk(price: number, band: string): boolean {
  switch (band) {
    case "under-15":
      return price < 1500;
    case "15-20":
      return price >= 1500 && price <= 2000;
    case "over-20":
      return price > 2000;
    default:
      return true;
  }
}

export default async function ShopPage({ searchParams }: { searchParams: SearchParams }) {
  const raw = await searchParams;
  const filters = parseFilters(raw);

  const [all, collections] = await Promise.all([getShopProducts(), getCollections()]);

  const q = filters.q.trim().toLowerCase();
  let list = all.filter((p) => {
    if (filters.collections.length > 0 && !filters.collections.includes(p.collectionSlug)) return false;
    if (!priceOk(p.price, filters.price)) return false;
    if (filters.format === "kindle" && !p.dimensions.toLowerCase().includes("ebook")) return false;
    if (filters.format === "paperback" && p.dimensions.toLowerCase().includes("ebook")) return false;
    if (filters.rating !== "any") {
      const min = Number(filters.rating);
      if (p.stats.count === 0 || p.stats.avg < min) return false;
    }
    if (q) {
      const hay = `${p.title} ${p.subtitle} ${p.author}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  switch (filters.sort) {
    case "price-asc":
      list = [...list].sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      list = [...list].sort((a, b) => b.price - a.price);
      break;
    case "rating":
      list = [...list].sort((a, b) => b.stats.avg - a.stats.avg || b.stats.count - a.stats.count);
      break;
    case "newest":
      list = [...list].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      break;
    case "name":
      list = [...list].sort((a, b) => a.title.localeCompare(b.title));
      break;
    default:
      list = [...list].sort(
        (a, b) =>
          Number(b.featured) - Number(a.featured) ||
          b.stats.avg * Math.log(b.stats.count + 1) - a.stats.avg * Math.log(a.stats.count + 1),
      );
  }

  const activeCollectionNames = filters.collections
    .map((slug) => collections.find((c) => c.slug === slug)?.name ?? slug)
    .join(", ");
  const heading = activeCollectionNames || (q ? `“${filters.q}”` : "All books");
  const shopCollections = collections.map((c) => ({
    slug: c.slug,
    name: c.name,
    count: all.filter((p) => p.collectionSlug === c.slug).length,
  }));

  const hasActive =
    filters.collections.length > 0 ||
    filters.q !== "" ||
    filters.price !== "any" ||
    filters.format !== "any" ||
    filters.rating !== "any";

  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-10 sm:px-8 lg:pt-14">
      <nav className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-3">
        <Link href="/" className="transition-colors hover:text-ember">
          Home
        </Link>
        <span className="mx-2 text-ink/25">/</span>
        <span className="text-ink-2">Shop</span>
      </nav>

      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-[clamp(2.2rem,5vw,3.6rem)] font-medium leading-[1.02] tracking-tight">
            {heading}
          </h1>
          <p className="mt-2 text-sm text-ink-2">
            {list.length} {list.length === 1 ? "title" : "titles"}
            {hasActive ? " matching your filters" : " — printed on demand, shipped in 3–5 days"}
          </p>
        </div>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[250px_1fr]">
        <ShopTools collections={shopCollections} current={filters}>
          <span className="text-sm font-medium text-ink-2">
            {list.length} {list.length === 1 ? "result" : "results"}
          </span>
        </ShopTools>

        <div>
          {list.length === 0 ? (
            <div className="grid place-items-center rounded-[24px] border border-dashed border-ink/20 bg-paper-deep/40 px-8 py-24 text-center">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-paper-deep text-ink-3">
                <BookX size={26} />
              </span>
              <h2 className="mt-5 font-display text-2xl font-semibold">Nothing on this shelf</h2>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink-2">
                No books match that combination. Loosen a filter or two — the good stuff is close
                by.
              </p>
              <Link
                href="/shop"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-paper transition-colors hover:bg-ember"
              >
                <SlidersHorizontal size={13} /> Clear all filters
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 lg:gap-x-8">
              {list.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
