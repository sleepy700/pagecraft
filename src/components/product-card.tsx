import { ExternalLink } from "lucide-react";
import Link from "next/link";
import type { ShopProduct } from "@/db/queries";
import { formatMoney } from "@/lib/money";
import { BookCover } from "@/components/book-cover";
import { StarRating } from "@/components/star-rating";
import { cn } from "@/lib/utils";

export function ProductCard({ product, className }: { product: ShopProduct; className?: string }) {
  const onSale = product.compareAt != null && product.compareAt > product.price;
  const savePct = onSale ? Math.round((1 - product.price / product.compareAt!) * 100) : 0;
  const asin = product.amazonUrl?.match(/\/dp\/([A-Z0-9]{10})/i)?.[1];
  const amazonPath = asin ? `/go?asin=${asin}` : product.amazonUrl ?? "#";

  return (
    <article className={cn("group relative", className)}>
      <Link href={`/product/${product.slug}`} className="book-3d relative block">
        <div className="book-tilt relative aspect-[2/3] overflow-hidden rounded-[6px] shadow-book group-hover:shadow-book-hover">
          {product.coverImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={product.coverImage} alt={`${product.title} cover`} className="h-full w-full bg-paper-dark/40 object-contain" />
          ) : (
            <BookCover cover={product.cover} title={product.title} author={product.author} />
          )}
        </div>

        {product.badge && (
          <span className="absolute -top-2 left-3 -rotate-2 rounded-[3px] bg-ember px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-paper shadow-card">
            {product.badge}
          </span>
        )}
        {onSale && (
          <span className="absolute -top-2 right-3 rotate-2 rounded-[3px] bg-gold px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-ink shadow-card">
            Save {savePct}%
          </span>
        )}
      </Link>

      <div className="pointer-events-none absolute inset-x-3 top-[52%] flex justify-center opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:opacity-100">
        {product.amazonUrl ? (
          <a
            href={amazonPath}
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto inline-flex items-center justify-center gap-2 rounded-full bg-gold px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink shadow-card transition-all duration-300 hover:bg-ember hover:text-paper"
          >
            <ExternalLink size={13} />
            Buy on Amazon
          </a>
        ) : (
          <Link
            href={`/product/${product.slug}`}
            className="pointer-events-auto inline-flex items-center justify-center gap-2 rounded-full bg-ink px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-paper shadow-card transition-all duration-300 hover:bg-ember"
          >
            View details
          </Link>
        )}
      </div>

      <div className="pt-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link href={`/product/${product.slug}`}>
              <h3 className="font-display text-[19px] leading-tight font-semibold transition-colors hover:text-ember">
                {product.title}
              </h3>
            </Link>
            <p className="mt-0.5 truncate text-[11px] font-medium uppercase tracking-[0.16em] text-ink-3">
              {product.author} · {product.subtitle}
            </p>
          </div>
          <div className="shrink-0 text-right">
            <p className="font-display text-[17px] font-semibold">{formatMoney(product.price)}</p>
            {onSale && (
              <p className="text-xs text-ink-3 line-through">{formatMoney(product.compareAt!)}</p>
            )}
          </div>
        </div>
        <div className="mt-1.5 flex items-center gap-2 text-xs text-ink-2">
          {product.stats.count > 0 ? (
            <>
              <StarRating value={product.stats.avg} />
              <span className="font-medium">{product.stats.avg.toFixed(1)}</span>
              <span className="text-ink-3">({product.stats.count})</span>
            </>
          ) : (
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-moss">New release</span>
          )}
          <span className="ml-auto rounded-full border border-ink/15 px-2 py-0.5 text-[9.5px] font-semibold uppercase tracking-[0.1em] text-ink-2">
            {product.dimensions.toLowerCase().includes("ebook") ? "Kindle" : "Paperback"}
          </span>
        </div>
      </div>
    </article>
  );
}
