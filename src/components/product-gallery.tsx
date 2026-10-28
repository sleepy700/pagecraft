"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { Cover } from "@/lib/types";
import { cn, wrapText } from "@/lib/utils";
import { BookCover } from "@/components/book-cover";

const SERIF = "var(--font-fraunces), 'Iowan Old Style', Georgia, serif";

function InsidePage({ cover, quote, title }: { cover: Cover; quote: string; title: string }) {
  const lines = wrapText(quote, 26);
  return (
    <svg viewBox="0 0 400 600" className="block h-full w-full" role="img" aria-label={`Inside page of ${title}`}>
      <rect width="400" height="600" fill="#FAF5E8" />
      <rect width="14" height="600" fill="#000" opacity="0.05" />
      {/* ruled lines */}
      {Array.from({ length: 14 }).map((_, i) => (
        <line key={i} x1={56} x2={368} y1={300 + i * 22} y2={300 + i * 22} stroke="#8A7F66" strokeOpacity={0.28} strokeWidth={1} />
      ))}
      <line x1={44} y1={60} x2={44} y2={572} stroke="#B0492A" strokeOpacity={0.35} strokeWidth={1.2} />
      <text x={56} y={92} fontSize={10} letterSpacing={3} fill="#8A7F66" fontFamily="var(--font-inter), ui-sans-serif">
        {title.toUpperCase()}
      </text>
      <text x={368} y={92} textAnchor="end" fontSize={10} letterSpacing={2} fill="#8A7F66" fontFamily="var(--font-inter), ui-sans-serif">
        DATE {new Date().getFullYear()} / __ / __
      </text>
      <line x1={56} x2={368} y1={106} y2={106} stroke={cover.accent} strokeWidth={1.4} />
      <text x={212} y={170} textAnchor="middle" fontSize={30} fill={cover.accent} fontFamily={SERIF}>
        “
      </text>
      <g fontFamily={SERIF} fontStyle="italic" fontSize={19} fill="#3B322A" textAnchor="middle">
        {lines.map((l, i) => (
          <text key={i} x={212} y={200 + i * 30}>
            {l}
          </text>
        ))}
      </g>
      <text x={212} y={576} textAnchor="middle" fontSize={10} fill="#8A7F66" fontFamily={SERIF}>
        1
      </text>
    </svg>
  );
}

type View = "front" | "back" | "inside";

export function ProductGallery({
  cover,
  coverImage,
  title,
  author,
  insideQuote,
  badge,
}: {
  cover: Cover;
  coverImage?: string | null;
  title: string;
  author: string;
  insideQuote: string;
  badge: string | null;
}) {
  const [view, setView] = useState<View>("front");

  const views: { key: View; label: string }[] = [
    { key: "front", label: "Front cover" },
    { key: "back", label: "Back cover" },
    { key: "inside", label: "Inside page" },
  ];

  if (coverImage) {
    return (
      <div className="relative overflow-hidden rounded-[18px] bg-paper-deep/60 p-6 sm:p-10">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{ background: `radial-gradient(60% 50% at 50% 35%, ${cover.bg}55, transparent 70%)` }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-[380px] overflow-hidden rounded-[8px] bg-paper shadow-book-hover">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={coverImage} alt={`${title} — official cover`} className="block h-auto w-full" />
        </div>
        {badge && (
          <span className="absolute left-5 top-5 -rotate-2 rounded-[4px] bg-ember px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-paper shadow-card">
            {badge}
          </span>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="relative overflow-hidden rounded-[18px] bg-paper-deep/60 p-6 sm:p-10">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{ background: `radial-gradient(60% 50% at 50% 35%, ${cover.bg}55, transparent 70%)` }}
          aria-hidden
        />
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 14, rotateY: view === "back" ? -14 : 0 }}
            animate={{ opacity: 1, y: 0, rotateY: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: [0.22, 0.9, 0.24, 1] }}
            className="relative mx-auto aspect-[2/3] max-w-[380px] overflow-hidden rounded-[8px] shadow-book-hover"
          >
            {view === "front" && <BookCover cover={cover} title={title} author={author} />}
            {view === "back" && <BookCover cover={cover} title={title} author={author} variant="back" />}
            {view === "inside" && <InsidePage cover={cover} quote={insideQuote} title={title} />}
          </motion.div>
        </AnimatePresence>

        {badge && (
          <span className="absolute left-5 top-5 -rotate-2 rounded-[4px] bg-ember px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-paper shadow-card">
            {badge}
          </span>
        )}
      </div>

      <div className="mt-4 flex justify-center gap-3">
        {views.map((v) => (
          <button
            key={v.key}
            type="button"
            onClick={() => setView(v.key)}
            className={cn(
              "group flex flex-col items-center gap-2",
            )}
            aria-label={`Show ${v.label}`}
            aria-pressed={view === v.key}
          >
            <span
              className={cn(
                "block w-16 overflow-hidden rounded-[5px] ring-1 ring-offset-2 ring-offset-paper transition-all",
                view === v.key ? "shadow-card ring-ember" : "opacity-70 ring-transparent hover:opacity-100",
              )}
            >
              <span className="block aspect-[2/3]">
                {v.key === "front" && <BookCover cover={cover} title={title} author={author} />}
                {v.key === "back" && <BookCover cover={cover} title={title} author={author} variant="back" />}
                {v.key === "inside" && <InsidePage cover={cover} quote={insideQuote} title={title} />}
              </span>
            </span>
            <span
              className={cn(
                "text-[10px] font-semibold uppercase tracking-[0.14em] transition-colors",
                view === v.key ? "text-ember" : "text-ink-3 group-hover:text-ink",
              )}
            >
              {v.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
