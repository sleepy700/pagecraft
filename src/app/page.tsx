import { ArrowRight, Check, ExternalLink, Globe2, Palette, ShieldCheck, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { HomeHero, type HeroBook } from "@/components/home/hero";
import { MarqueeBand } from "@/components/home/marquee";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { getCollections, getShopProducts } from "@/db/queries";
import { formatMoney } from "@/lib/money";
import { cn } from "@/lib/utils";
import { notFound } from "next/navigation";

function toHeroBook(product: Awaited<ReturnType<typeof getShopProducts>>[number]): HeroBook {
  const asin = product.amazonUrl?.match(/\/dp\/([A-Z0-9]{10})/i)?.[1] ?? "B0HLZR7B4B";
  return {
    slug: product.slug,
    title: product.title,
    author: product.author,
    price: product.price,
    asin,
    coverImage: product.coverImage ?? "/images/products/mantuji-cover.jpg",
  };
}

export default async function HomePage() {
  const [collections, all] = await Promise.all([getCollections(), getShopProducts()]);
  if (all.length === 0) notFound();

  const counts = new Map<string, number>();
  for (const p of all) counts.set(p.collectionSlug, (counts.get(p.collectionSlug) ?? 0) + 1);

  const featured = all.find((p) => p.slug === "chatgpt-for-freelancers") ?? all[0];
  const heroCovers = [
    all.find((p) => p.slug === "festivals-of-india-coloring-book"),
    all.find((p) => p.slug === "the-witness-is-words"),
    all.find((p) => p.slug === "the-low-stimulation-method"),
  ].filter((p): p is (typeof all)[number] => Boolean(p));

  const latest = [...all].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  const kids = all.filter((p) => p.collectionSlug === "kids-creative");
  const collectionSpans = [
    "lg:col-span-7",
    "lg:col-span-5",
    "lg:col-span-4",
    "lg:col-span-4",
    "lg:col-span-4",
    "lg:col-span-12",
  ];

  return (
    <>
      <HomeHero
        featured={toHeroBook(featured)}
        covers={heroCovers.map(toHeroBook)}
        titleCount={all.length}
        collectionCount={collections.length}
      />
      <MarqueeBand />

      {/* Category shelves */}
      <section id="collections" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-20 sm:px-8 lg:py-28">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em] text-ember">
                <span className="h-px w-10 bg-ember" /> Find your next book
              </p>
              <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.2rem)] font-medium leading-[1.05] tracking-tight">
                Six shelves. Nine worlds.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-ink-2">
              Browse by what you want to do today: create, earn, heal, understand, escape or explore.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-12">
          {collections.map((collection, i) => (
            <Reveal key={collection.slug} delay={(i % 3) * 0.06} className={cn(collectionSpans[i])}>
              <Link
                href={`/shop?collection=${collection.slug}`}
                className={cn(
                  "group relative block overflow-hidden rounded-[20px] shadow-card",
                  i === 5 ? "h-[300px]" : "h-[350px]",
                )}
              >
                <Image
                  src={collection.image}
                  alt={collection.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  sizes="(max-width: 1024px) 50vw, 60vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/15 to-transparent" />
                <span className="absolute left-5 top-5 rounded-full bg-paper/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-ink backdrop-blur">
                  {counts.get(collection.slug) ?? 0} {(counts.get(collection.slug) ?? 0) === 1 ? "title" : "titles"}
                </span>
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                  <div>
                    <h3 className="font-display text-[25px] font-semibold leading-tight text-paper">
                      {collection.name}
                    </h3>
                    <p className="mt-1 max-w-sm text-[13px] leading-snug text-paper/75">
                      {collection.tagline}
                    </p>
                  </div>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-paper text-ink transition-all duration-300 group-hover:bg-ember group-hover:text-paper">
                    <ArrowRight size={17} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Catalog */}
      <section className="grain bg-paper-deep/50">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em] text-ember">
                  <span className="h-px w-10 bg-ember" /> Fresh from PageCraft
                </p>
                <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.2rem)] font-medium leading-[1.05] tracking-tight">
                  Explore every title
                </h2>
              </div>
              <Link
                href="/shop"
                className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-ink transition-colors hover:text-ember"
              >
                Search & filter all books
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>

          <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-8">
            {latest.map((product, i) => (
              <Reveal key={product.slug} delay={(i % 4) * 0.05}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Kids creative spotlight */}
      {kids.length >= 2 && (
        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <div className="grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr]">
            <Reveal className="relative min-h-[480px]">
              <div className="absolute inset-8 rounded-full bg-gold/20 blur-3xl" aria-hidden />
              <div className="absolute left-[8%] top-4 w-[46%] -rotate-6 overflow-hidden rounded-[8px] shadow-book-hover">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={kids[0].coverImage!} alt={`${kids[0].title} cover`} className="block aspect-[2/3] w-full bg-paper object-contain" />
              </div>
              <div className="absolute bottom-4 right-[8%] w-[46%] rotate-6 overflow-hidden rounded-[8px] shadow-book-hover">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={kids[1].coverImage!} alt={`${kids[1].title} cover`} className="block aspect-[2/3] w-full object-cover" />
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em] text-ember">
                <span className="h-px w-10 bg-ember" /> Made for curious kids
              </p>
              <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.2rem)] font-medium leading-[1.08] tracking-tight">
                Less screen time.
                <br />
                More <span className="italic text-ember">“I made this!”</span>
              </h2>
              <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-ink-2">
                Big pages, bold lines and friendly step-by-step activities help young artists build
                confidence while they color Indian festivals or draw their own ocean world.
              </p>
              <ul className="mt-7 space-y-3">
                {[
                  "Age-appropriate instructions and open drawing spaces",
                  "Single-sided pages designed for crayons and markers",
                  "Creative, cultural and screen-free learning",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-ink-2">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-moss/15 text-moss">
                      <Check size={11} strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/shop?collection=kids-creative"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-paper transition-colors hover:bg-ember"
              >
                Shop kids&apos; books <Palette size={14} />
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      {/* Worldwide buying */}
      <section className="border-y border-ink/10 bg-forest text-paper">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-8 md:grid-cols-3">
          {[
            {
              icon: Globe2,
              title: "Local Amazon storefronts",
              body: "Our smart links send readers to Amazon US, Canada, UK, Australia, India and 15+ other local markets.",
            },
            {
              icon: ShieldCheck,
              title: "Amazon-secure checkout",
              body: "Payment, taxes, delivery and refunds stay inside the Amazon account readers already trust.",
            },
            {
              icon: Sparkles,
              title: "Digital & print editions",
              body: "Kindle titles arrive instantly; paperbacks are printed and fulfilled through Amazon where available.",
            },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-paper/10 text-gold">
                <Icon size={19} />
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold">{title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-paper/65">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured AI guide */}
      <section id="story" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-20 sm:px-8 lg:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="mx-auto w-full max-w-[340px]">
            <Link href={`/product/${featured.slug}`} className="book-3d block">
              <div className="book-tilt overflow-hidden rounded-[10px] shadow-book-hover">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={featured.coverImage!} alt={`${featured.title} official cover`} className="block w-full" />
              </div>
            </Link>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em] text-ember">
              <span className="h-px w-10 bg-ember" /> Start with the flagship guide
            </p>
            <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.2rem)] font-medium leading-[1.05] tracking-tight">
              {featured.title}
            </h2>
            <p className="mt-2 font-display text-lg italic text-ink-2">{featured.subtitle}</p>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-ink-2">
              One hundred categorized prompts, client-ready templates and a 30-day action plan for
              freelancers who want better work in fewer hours.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={`/go?asin=${toHeroBook(featured).asin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-ink shadow-card transition-colors hover:bg-ember hover:text-paper"
              >
                Buy on Amazon · {formatMoney(featured.price)} <ExternalLink size={14} />
              </a>
              <Link
                href={`/product/${featured.slug}`}
                className="text-xs font-bold uppercase tracking-[0.15em] text-ink-2 underline-offset-4 hover:text-ember hover:underline"
              >
                Explore the book
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Final catalog CTA */}
      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        <Reveal>
          <div className="grain relative overflow-hidden rounded-[28px] bg-ink px-7 py-14 text-center shadow-panel sm:px-12">
            <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-gold/20 blur-3xl" aria-hidden />
            <div className="absolute -bottom-12 -right-8 h-48 w-48 rounded-full bg-ember/25 blur-3xl" aria-hidden />
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-gold">Your next page starts here</p>
            <h2 className="mx-auto mt-4 max-w-xl font-display text-[clamp(1.8rem,3.6vw,2.8rem)] font-medium leading-[1.1] text-paper">
              Nine books. One shelf for every kind of curiosity.
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-paper/70">
              Filter by category, format or price, then buy securely through the Amazon marketplace
              available in your country.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-ink transition-colors hover:bg-paper"
              >
                Browse all books <ArrowRight size={14} />
              </Link>
              <Link
                href="/faq#buying"
                className="inline-flex items-center gap-2 rounded-full border border-paper/25 px-7 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-paper transition-colors hover:border-paper"
              >
                How worldwide buying works
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
