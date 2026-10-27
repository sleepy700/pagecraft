import type { Metadata } from "next";
import { BookOpen, ExternalLink, Leaf, RotateCcw, ShieldCheck, Truck, Zap } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BuyPanel } from "@/components/buy-panel";
import { ProductAccordions } from "@/components/product-accordions";
import { ProductCard } from "@/components/product-card";
import { ProductGallery } from "@/components/product-gallery";
import { getProductBySlug } from "@/db/queries";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const detail = await getProductBySlug(slug);
  if (!detail) return {};
  const { product } = detail;
  return {
    title: `${product.title} — ${product.subtitle}`,
    description: product.description[0],
    keywords: [product.title, product.subtitle, `${product.author} books`, product.collectionName, "Amazon books"],
    alternates: { canonical: `/product/${product.slug}` },
    openGraph: {
      type: "book",
      url: `/product/${product.slug}`,
      title: `${product.title}: ${product.subtitle}`,
      description: product.description[0],
      images: product.coverImage
        ? [{ url: product.coverImage, alt: `${product.title} official book cover` }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: product.subtitle,
      images: product.coverImage ? [product.coverImage] : undefined,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const detail = await getProductBySlug(slug);
  if (!detail) notFound();
  const { product, related } = detail;
  const isEbook = product.dimensions.toLowerCase().includes("ebook");
  const asin = product.amazonUrl?.match(/\/dp\/([A-Z0-9]{10})/i)?.[1];
  const amazonPath = asin ? `/go?asin=${asin}` : product.amazonUrl ?? "/shop";

  // Structured data for Google rich results
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: `${product.title}: ${product.subtitle}`,
    author: { "@type": "Person", name: product.author },
    bookFormat: isEbook ? "https://schema.org/EBook" : "https://schema.org/Paperback",
    ...(product.pages > 0 ? { numberOfPages: product.pages } : {}),
    inLanguage: "en",
    description: product.description[0],
    ...(asin ? { identifier: { "@type": "PropertyValue", propertyID: "ASIN", value: asin } } : {}),
    ...(product.coverImage ? { image: product.coverImage } : {}),
    ...(product.amazonUrl
      ? {
          offers: [
            {
              "@type": "Offer",
              url: product.amazonUrl,
              price: (product.price / 100).toFixed(2),
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
            },
            ...(product.amazonUrlPrint && product.printPrice != null
              ? [
                  {
                    "@type": "Offer",
                    url: product.amazonUrlPrint,
                    price: (product.printPrice / 100).toFixed(2),
                    priceCurrency: "USD",
                    availability: "https://schema.org/InStock",
                    itemCondition: "https://schema.org/NewCondition",
                  },
                ]
              : []),
          ],
        }
      : {}),
  };

  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-10 sm:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-3">
        <Link href="/" className="transition-colors hover:text-ember">Home</Link>
        <span className="mx-2 text-ink/25">/</span>
        <Link href="/shop" className="transition-colors hover:text-ember">Shop</Link>
        <span className="mx-2 text-ink/25">/</span>
        <Link href={`/shop?collection=${product.collectionSlug}`} className="transition-colors hover:text-ember">
          {product.collectionName}
        </Link>
        <span className="mx-2 text-ink/25">/</span>
        <span className="text-ink-2">{product.title}</span>
      </nav>

      <div className="mt-8 grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <ProductGallery
            cover={product.cover}
            coverImage={product.coverImage}
            title={product.title}
            author={product.author}
            insideQuote={product.insideQuote}
            badge={product.badge}
          />
        </div>

        <div>
          <Link
            href={`/shop?collection=${product.collectionSlug}`}
            className="text-[11px] font-bold uppercase tracking-[0.2em] text-ember hover:underline underline-offset-4"
          >
            {product.collectionName}
          </Link>
          <h1 className="mt-3 font-display text-[clamp(2.2rem,4.5vw,3.4rem)] font-medium leading-[1.02] tracking-tight">
            {product.title}
          </h1>
          <p className="mt-2 font-display text-lg italic text-ink-2">{product.subtitle}</p>
          <p className="mt-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-ink-3">
            by {product.author}
          </p>

          <a
            href={amazonPath}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-moss/25 bg-moss/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.13em] text-moss transition-colors hover:border-moss/50"
          >
            New release · See reader feedback on Amazon <ExternalLink size={12} />
          </a>

          <div className="mt-6">
            <BuyPanel
              slug={product.slug}
              title={product.title}
              author={product.author}
              price={product.price}
              compareAt={product.compareAt}
              hardcoverPrice={product.hardcoverPrice}
              cover={product.cover}
              stock={product.stock}
              amazonUrl={product.amazonUrl}
              amazonUrlPrint={product.amazonUrlPrint}
              printPrice={product.printPrice}
              printFormat={product.printFormat}
              editionLabel={isEbook ? "Kindle eBook" : "Paperback"}
              digital={isEbook}
            />
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            {(isEbook
              ? [
                  { icon: Zap, label: "Instant Kindle delivery" },
                  { icon: ShieldCheck, label: "Secure Amazon checkout" },
                  { icon: BookOpen, label: "Read on any device" },
                ]
              : [
                  { icon: Truck, label: "Local delivery options" },
                  { icon: RotateCcw, label: "Amazon return policy" },
                  { icon: ShieldCheck, label: "Secure Amazon checkout" },
                ]
            ).map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2.5 rounded-xl border border-ink/10 bg-paper px-3 py-3">
                <Icon size={16} className="shrink-0 text-ember" />
                <span className="text-[11px] font-semibold leading-tight text-ink-2">{label}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-4 text-[15px] leading-relaxed text-ink-2">
            {product.description.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="mt-8">
            <ProductAccordions
              items={[
                {
                  title: "Book details",
                  body: (
                    <dl className="grid grid-cols-2 gap-x-6 gap-y-2.5">
                      {(isEbook
                        ? [
                            ["Format", product.amazonUrlPrint ? `Kindle eBook + ${product.printFormat ?? "print"}` : "Kindle eBook"],
                            ["Print length", product.pages > 0 ? `${product.pages} pages` : "Not listed by Amazon"],
                            ["Language", "English"],
                            ["Author", product.author],
                            ["ASIN", asin ?? "—"],
                            ["Publisher", "Independently published · via KDP"],
                          ]
                        : [
                            ["Format", "Paperback"],
                            ["Pages", `${product.pages}`],
                            ["Trim size", product.dimensions.replace(" · Paperback", "")],
                            ["Language", "English"],
                            ["Author", product.author],
                            ["ASIN", asin ?? "—"],
                          ]
                      ).map(([k, v]) => (
                        <div key={k} className="flex flex-col">
                          <dt className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-ink-3">{k}</dt>
                          <dd className="mt-0.5 text-sm">{v}</dd>
                        </div>
                      ))}
                    </dl>
                  ),
                },
                ...(product.amazonUrl
                  ? [
                      {
                        title: "Buying through Amazon",
                        body: (
                          <>
                            This title is fulfilled through Amazon. Local pricing, taxes, digital or
                            print delivery, and eligible returns are handled on Amazon&apos;s secure
                            checkout. Our smart link takes you to this exact book in an appropriate
                            local marketplace and supports the independent author.
                          </>
                        ),
                      },
                    ]
                  : [
                      {
                        title: "Shipping & returns",
                        body: (
                          <>
                            Every copy is printed fresh when you order — please allow 3–5 business days
                            for printing and delivery within the U.S. Free tracked shipping on orders
                            over $35; a flat $4.95 below that. Not right for you? Return it within 30
                            days for a full refund, no questions and no restocking fees.{" "}
                            <Link href="/faq#shipping" className="font-semibold text-ember underline-offset-2 hover:underline">
                              Read the full policy
                            </Link>
                            .
                          </>
                        ),
                      },
                      {
                        title: "Printed on demand",
                        body: (
                          <span className="flex gap-2.5">
                            <Leaf size={16} className="mt-0.5 shrink-0 text-moss" />
                            <span>
                              Print-on-demand means no warehouse, no overstock and no pulped surplus.
                              Your copy exists because you asked for it — the least wasteful way we
                              know to make books.
                            </span>
                          </span>
                        ),
                      },
                    ]),
              ]}
            />
          </div>
        </div>
      </div>

      {/* Honest review handoff — Amazon hosts verified buyer feedback */}
      <section id="reviews" className="mt-24 scroll-mt-28 border-t border-ink/10 pt-16">
        <div className="grain relative overflow-hidden rounded-[24px] bg-forest px-7 py-12 text-center text-paper shadow-panel sm:px-12">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold">Reader feedback</p>
          <h2 className="mx-auto mt-3 max-w-xl font-display text-[clamp(1.8rem,3vw,2.6rem)] font-medium leading-tight">
            Read reviews from Amazon customers
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-paper/70">
            To keep feedback transparent, PageCraft does not publish invented or unverified reviews.
            Amazon hosts ratings and reviews from readers who bought or read this title.
          </p>
          <a
            href={amazonPath}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-ink transition-colors hover:bg-paper"
          >
            Read or leave a review on Amazon <ExternalLink size={14} />
          </a>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-24 border-t border-ink/10 pt-16">
          <div className="flex items-end justify-between gap-6">
            <h2 className="font-display text-[clamp(1.8rem,3vw,2.5rem)] font-medium leading-tight">
              Pairs well with
            </h2>
            <Link
              href={`/shop?collection=${product.collectionSlug}`}
              className="hidden text-xs font-bold uppercase tracking-[0.16em] text-ember underline-offset-4 hover:underline sm:block"
            >
              More {product.collectionName}
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4 lg:gap-x-8">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
