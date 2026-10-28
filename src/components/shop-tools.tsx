"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Search, SlidersHorizontal, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ShopFiltersState = {
  q: string;
  collections: string[];
  price: string;
  format: string;
  rating: string;
  sort: string;
};

type CollectionOpt = { slug: string; name: string; count: number };

const PRICE_BANDS = [
  { value: "any", label: "Any price" },
  { value: "under-15", label: "Under $15" },
  { value: "15-20", label: "$15 – $20" },
  { value: "over-20", label: "Over $20" },
];

const SORT_OPTS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "name", label: "Title A–Z" },
];

export function ShopTools({
  collections,
  current,
  children,
}: {
  collections: CollectionOpt[];
  current: ShopFiltersState;
  children?: ReactNode;
}) {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [q, setQ] = useState(current.q);

  const [previousQuery, setPreviousQuery] = useState(current.q);
  if (previousQuery !== current.q) {
    setPreviousQuery(current.q);
    setQ(current.q);
  }

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const push = (patch: Partial<ShopFiltersState>) => {
    const next = { ...current, ...patch };
    const params = new URLSearchParams();
    if (next.q) params.set("q", next.q);
    if (next.collections.length) params.set("collection", next.collections.join(","));
    if (next.price !== "any") params.set("price", next.price);
    if (next.format !== "any") params.set("format", next.format);
    if (next.rating !== "any") params.set("rating", next.rating);
    if (next.sort !== "featured") params.set("sort", next.sort);
    const qs = params.toString();
    router.push(qs ? `/shop?${qs}` : "/shop", { scroll: false });
  };

  const activeCount =
    current.collections.length +
    (current.price !== "any" ? 1 : 0) +
    (current.format !== "any" ? 1 : 0) +
    (current.rating !== "any" ? 1 : 0);

  const toggleCollection = (slug: string) => {
    const set = new Set(current.collections);
    if (set.has(slug)) set.delete(slug);
    else set.add(slug);
    push({ collections: [...set] });
  };

  const form = (
    <div className="space-y-8">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          push({ q: q.trim() });
        }}
      >
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink-3">Search</p>
        <div className="relative mt-3">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-3" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Title or author…"
            className="w-full rounded-full border border-ink/15 bg-paper py-2.5 pl-10 pr-3 text-sm outline-none transition-colors placeholder:text-ink-3/70 focus:border-ember"
          />
        </div>
      </form>

      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink-3">Collection</p>
        <ul className="mt-3 space-y-2">
          {collections.map((c) => {
            const active = current.collections.includes(c.slug);
            return (
              <li key={c.slug}>
                <button
                  type="button"
                  onClick={() => toggleCollection(c.slug)}
                  className="group flex w-full items-center justify-between gap-2 text-left"
                >
                  <span className="flex items-center gap-2.5">
                    <span
                      className={cn(
                        "grid h-[18px] w-[18px] place-items-center rounded-[5px] border transition-colors",
                        active
                          ? "border-ember bg-ember text-paper"
                          : "border-ink/25 bg-transparent group-hover:border-ink/50",
                      )}
                    >
                      {active && <Check size={11} strokeWidth={3.5} />}
                    </span>
                    <span className={cn("text-sm transition-colors", active ? "font-semibold text-ink" : "text-ink-2 group-hover:text-ink")}>
                      {c.name}
                    </span>
                  </span>
                  <span className="text-xs text-ink-3">{c.count}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink-3">Price</p>
        <ul className="mt-3 space-y-2">
          {PRICE_BANDS.map((b) => (
            <RadioRow
              key={b.value}
              active={current.price === b.value}
              label={b.label}
              onClick={() => push({ price: b.value })}
            />
          ))}
        </ul>
      </div>

      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink-3">Format</p>
        <ul className="mt-3 space-y-2">
          <RadioRow active={current.format === "any"} label="All formats" onClick={() => push({ format: "any" })} />
          <RadioRow active={current.format === "kindle"} label="Kindle eBooks" onClick={() => push({ format: "kindle" })} />
          <RadioRow active={current.format === "paperback"} label="Paperbacks" onClick={() => push({ format: "paperback" })} />
        </ul>
      </div>

    </div>
  );

  return (
    <>
      {/* toolbar */}
      <div className="col-span-full -mt-2 mb-2 flex items-center justify-between gap-3 lg:col-span-1 lg:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-paper px-4 py-2.5 text-xs font-bold uppercase tracking-[0.12em] transition-colors hover:border-ink/40"
        >
          <SlidersHorizontal size={13} />
          Filters
          {activeCount > 0 && (
            <span className="grid h-5 w-5 place-items-center rounded-full bg-ember text-[10px] text-paper">
              {activeCount}
            </span>
          )}
        </button>
        <div className="flex items-center gap-3">
          {children}
          <SortSelect value={current.sort} onChange={(sort) => push({ sort })} />
        </div>
      </div>

      {/* desktop sidebar */}
      <aside className="hidden self-start lg:sticky lg:top-28 lg:block">
        <div className="mb-6 flex items-center justify-between">
          {children}
          <SortSelect value={current.sort} onChange={(sort) => push({ sort })} label="Sort" />
        </div>
        {form}
        {activeCount > 0 && (
          <button
            type="button"
            onClick={() => push({ collections: [], price: "any", format: "any", rating: "any", q: "" })}
            className="mt-8 text-xs font-semibold text-ember underline-offset-4 hover:underline"
          >
            Clear all filters ({activeCount})
          </button>
        )}
      </aside>

      {/* mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-ink/45 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              className="fixed inset-y-0 right-0 z-50 flex w-[88%] max-w-sm flex-col bg-paper shadow-panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 32, stiffness: 320 }}
            >
              <div className="flex items-center justify-between border-b border-ink/10 px-6 py-4">
                <p className="font-display text-lg font-semibold">Filters</p>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close filters"
                  className="rounded-full p-2 hover:bg-ink/5"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-6 py-6">{form}</div>
              <div className="border-t border-ink/10 px-6 py-4">
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="w-full rounded-full bg-ink py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-paper transition-colors hover:bg-ember"
                >
                  Show results
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function RadioRow({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) {
  return (
    <li>
      <button type="button" onClick={onClick} className="group flex w-full items-center gap-2.5 text-left">
        <span
          className={cn(
            "grid h-[18px] w-[18px] place-items-center rounded-full border transition-colors",
            active ? "border-ember" : "border-ink/25 group-hover:border-ink/50",
          )}
        >
          {active && <span className="h-2 w-2 rounded-full bg-ember" />}
        </span>
        <span className={cn("text-sm transition-colors", active ? "font-semibold text-ink" : "text-ink-2 group-hover:text-ink")}>
          {label}
        </span>
      </button>
    </li>
  );
}

function SortSelect({
  value,
  onChange,
  label,
}: {
  value: string;
  onChange: (v: string) => void;
  label?: string;
}) {
  return (
    <label className="flex items-center gap-2">
      {label && <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink-3">{label}</span>}
      <span className="relative inline-flex items-center">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none rounded-full border border-ink/15 bg-paper py-2.5 pl-4 pr-9 text-xs font-semibold outline-none transition-colors hover:border-ink/40 focus:border-ember"
          aria-label="Sort products"
        >
          {SORT_OPTS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown size={13} className="pointer-events-none absolute right-3.5 text-ink-3" />
      </span>
    </label>
  );
}
