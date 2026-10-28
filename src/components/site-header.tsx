"use client";

import { AnimatePresence, motion } from "framer-motion";
import { BookOpenText, Menu, Search, X, Zap } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/shop", label: "All Books" },
  { href: "/shop?collection=kids-creative", label: "Kids" },
  { href: "/#collections", label: "Collections" },
  { href: "/faq", label: "FAQ" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <div className="flex items-center justify-center gap-2 bg-forest px-4 py-2 text-center text-[11px] font-medium uppercase tracking-[0.18em] text-paper">
        <Zap size={13} className="shrink-0 text-gold" />
        <span>
          <span className="font-bold text-gold">Nine original books</span> · Kids, AI, psychology,
          wellness, fiction & more · Available worldwide
        </span>
      </div>

      <header
        className={cn(
          "sticky top-0 z-40 transition-all duration-300",
          scrolled
            ? "border-b border-ink/10 bg-paper/90 shadow-[0_8px_30px_-18px_rgb(33_28_20/0.4)] backdrop-blur-md"
            : "border-b border-transparent bg-paper",
        )}
      >
        <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <div className="flex items-center gap-1 lg:hidden">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="rounded-full p-2 transition-colors hover:bg-ink/5"
            >
              <Menu size={20} />
            </button>
          </div>

          <nav className="hidden items-center gap-7 lg:flex">
            {NAV.slice(0, 2).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[12.5px] font-semibold uppercase tracking-[0.14em] text-ink-2 transition-colors hover:text-ember"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/"
            className="group absolute left-1/2 flex -translate-x-1/2 items-center gap-2.5"
            aria-label="PageCraft home"
          >
            <span className="grid h-9 w-9 place-items-center rounded-[10px] bg-ember text-paper shadow-card transition-transform duration-300 group-hover:-rotate-6">
              <BookOpenText size={18} />
            </span>
            <span className="font-display text-[22px] font-semibold tracking-tight">
              Page<span className="italic text-ember">Craft</span>
            </span>
          </Link>

          <div className="flex items-center gap-1 sm:gap-2">
            <nav className="hidden items-center gap-7 lg:flex">
              {NAV.slice(2).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[12.5px] font-semibold uppercase tracking-[0.14em] text-ink-2 transition-colors hover:text-ember"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <Link
              href="/shop"
              aria-label="Search and browse"
              className="rounded-full p-2 transition-colors hover:bg-ink/5"
            >
              <Search size={19} />
            </Link>
            <Link
              href="/shop"
              className="hidden items-center gap-2 rounded-full bg-gold px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-ink transition-colors hover:bg-ember hover:text-paper sm:inline-flex"
            >
              Browse books
            </Link>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.aside
              className="fixed inset-y-0 left-0 z-50 flex w-[86%] max-w-sm flex-col bg-paper shadow-panel"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              <div className="flex items-center justify-between border-b border-ink/10 px-6 py-4">
                <span className="font-display text-lg font-semibold">
                  Page<span className="italic text-ember">Craft</span>
                </span>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="rounded-full p-2 hover:bg-ink/5"
                >
                  <X size={18} />
                </button>
              </div>
              <nav className="flex flex-col px-6 py-6">
                {NAV.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between border-b border-ink/8 py-4 font-display text-[26px] font-medium transition-colors hover:text-ember"
                    >
                      {item.label}
                      <span className="text-ember">→</span>
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.32 }}
                >
                  <Link
                    href="/shop"
                    onClick={() => setMenuOpen(false)}
                    className="mt-6 flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-ink"
                  >
                    Browse all books
                  </Link>
                </motion.div>
              </nav>
              <div className="mt-auto px-6 py-6 text-xs leading-relaxed text-ink-3">
                Independent multi-genre books.
                <br />
                Available worldwide through Amazon.
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
