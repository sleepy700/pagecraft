import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DEMO_PRODUCTS } from "@/lib/catalog";
import { isLocale, languages, locales } from "@/lib/languages";

export const dynamicParams = false;
export function generateStaticParams() { return locales.map((locale) => ({ locale })); }
type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const text = languages[locale];
  return {
    title: text.title,
    description: text.intro,
    alternates: {
      canonical: `/${locale}`,
      languages: { ...Object.fromEntries(locales.map((code) => [code, `/${code}`])), "x-default": "/en" },
    },
    openGraph: { title: `${text.title} · PageCraft`, description: text.intro, url: `/${locale}`, type: "website" },
  };
}

export default async function LanguagePage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const text = languages[locale];
  return (
    <article lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
      <h1 className="font-display text-4xl sm:text-5xl">{text.title}</h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-2">{text.intro}</p>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-2">{text.editions}</p>
      <p className="mt-5 rounded-xl border border-ink/10 bg-paper-deep p-4 text-sm leading-relaxed">{text.notice}</p>
      <Link href="/" className="mt-5 inline-block font-semibold text-ember underline underline-offset-4">{text.home}</Link>
      <h2 className="mt-12 font-display text-3xl">{text.browse}</h2>
      <div className="mt-7 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {DEMO_PRODUCTS.map((book) => {
          const asin = book.amazonUrl?.match(/\/dp\/([A-Z0-9]{10})/i)?.[1];
          return (
            <section key={book.slug} className="rounded-2xl border border-ink/10 bg-paper-deep/40 p-5">
              {book.coverImage && <div className="relative h-64"><Image src={book.coverImage} alt={book.title} fill sizes="(max-width: 640px) 90vw, 30vw" className="object-contain" /></div>}
              <div lang="en" dir="ltr">
                <h3 className="mt-5 font-display text-2xl">{book.title}</h3>
                <p className="mt-2 text-sm text-ink-2">{book.subtitle}</p>
                <p className="mt-2 text-xs text-ink-2">{book.author}</p>
              </div>
              <Link href={`/product/${book.slug}`} className="mt-4 block text-sm text-ember underline underline-offset-4">{text.details}</Link>
              {book.amazonUrl && <a href={asin ? `/go?asin=${asin}` : book.amazonUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block rounded-full bg-ember px-5 py-3 text-sm font-semibold text-paper">{text.buy}<span className="sr-only"> — Amazon</span></a>}
            </section>
          );
        })}
      </div>
      <nav aria-label="Languages" className="mt-12 flex flex-wrap gap-4 border-t border-ink/15 pt-6">
        {locales.map((code) => <Link key={code} href={`/${code}`} lang={code} hrefLang={code} className="text-sm text-ember underline">{languages[code].name}</Link>)}
      </nav>
    </article>
  );
}
