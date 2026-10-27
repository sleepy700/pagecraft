"use client";

import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Globe2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ease: [number, number, number, number] = [0.22, 0.9, 0.24, 1];

export type HeroBook = {
  slug: string;
  title: string;
  author: string;
  price: number;
  asin: string;
  coverImage: string;
};

export function HomeHero({
  featured,
  covers,
  titleCount,
  collectionCount,
}: {
  featured: HeroBook;
  covers: HeroBook[];
  titleCount: number;
  collectionCount: number;
}) {
  return (
    <section className="grain relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-12 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pb-24 lg:pt-16">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em] text-ember"
          >
            <span className="h-px w-10 bg-ember" />
            Independent books · Available worldwide
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.08, ease }}
            className="mt-6 font-display text-[clamp(3rem,7vw,5.25rem)] font-medium leading-[0.98] tracking-tight"
          >
            Books to make,
            <br />
            think, grow
            <br />
            <span className="relative inline-block italic text-ember">
              & wonder.
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 250 12" fill="none" aria-hidden>
                <path d="M3 9C70 3 165 2 247 7" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" className="text-gold" />
              </svg>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.18, ease }}
            className="mt-6 max-w-lg text-[15.5px] leading-relaxed text-ink-2"
          >
            From kids&apos; coloring and drawing books to AI toolkits, psychology, wellness,
            biography and original mystery — PageCraft makes useful, curious books for every kind
            of reader.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.28, ease }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/shop"
              className="group inline-flex items-center gap-2.5 rounded-full bg-ink px-7 py-4 text-xs font-bold uppercase tracking-[0.16em] text-paper shadow-card transition-all hover:bg-ember hover:shadow-book"
            >
              Explore all books
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <a
              href={`/go?asin=${featured.asin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full border border-ink/20 px-7 py-4 text-xs font-bold uppercase tracking-[0.16em] text-ink transition-colors hover:border-gold hover:bg-gold/15"
            >
              Featured on Amazon <ExternalLink size={14} />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-12 flex flex-wrap items-center gap-7 text-sm"
          >
            {[
              { value: `${titleCount}`, label: "Original titles" },
              { value: `${collectionCount}`, label: "Curated shelves" },
              { value: "20+", label: "Amazon markets" },
            ].map((s, i) => (
              <div key={s.label} className="flex items-center gap-7">
                {i > 0 && <span className="h-9 w-px bg-ink/15" aria-hidden />}
                <div>
                  <p className="font-display text-2xl font-semibold">{s.value}</p>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-ink-3">{s.label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Editorial cover composition */}
        <div className="relative mx-auto w-full max-w-[540px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.15, ease }}
            className="relative"
          >
            <div className="absolute -left-8 -top-8 h-44 w-44 rounded-full border border-dashed border-ink/25" aria-hidden />
            <div className="absolute -bottom-6 -right-6 h-40 w-40 rounded-full bg-[#25C0F2]/20 blur-3xl" aria-hidden />
            <div className="absolute -top-10 right-8 h-28 w-28 rounded-full bg-gold/30 blur-2xl" aria-hidden />

            <div className="relative overflow-hidden rounded-t-[999px] rounded-b-[28px] border-[6px] border-ink/90 shadow-panel">
              <div className="relative aspect-[4/5]">
                <Image
                  src="/images/collection-guides.jpg"
                  alt="A warm independent publishing desk"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 90vw, 540px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-paper/5" />
              </div>
            </div>

            {covers.slice(0, 3).map((book, i) => {
              const positions = [
                "-left-7 bottom-7 w-32 sm:-left-12 sm:w-40 -rotate-[7deg]",
                "left-[37%] -bottom-7 w-28 sm:w-36 rotate-[2deg]",
                "-right-3 bottom-12 w-28 sm:-right-7 sm:w-36 rotate-[8deg]",
              ];
              return (
                <motion.div
                  key={book.slug}
                  initial={{ opacity: 0, y: 44, rotate: i === 0 ? -13 : i === 2 ? 13 : 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.48 + i * 0.12, ease }}
                  className={`absolute ${positions[i]} animate-floaty`}
                >
                  <Link
                    href={`/product/${book.slug}`}
                    className="block overflow-hidden rounded-[7px] bg-paper shadow-book-hover transition-transform hover:scale-105"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={book.coverImage} alt={`${book.title} cover`} className="block aspect-[2/3] w-full bg-paper object-contain" />
                  </Link>
                </motion.div>
              );
            })}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9, ease }}
              className="absolute -right-2 top-10 flex items-center gap-2 rounded-full border border-ink/10 bg-paper/95 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-ink shadow-panel backdrop-blur sm:-right-7"
            >
              <Globe2 size={14} className="text-ember" /> Local Amazon links
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
