"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type Item = { title: string; body: React.ReactNode };

export function ProductAccordions({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number>(0);
  return (
    <div className="divide-y divide-ink/10 border-y border-ink/10">
      {items.map((item, i) => (
        <div key={item.title}>
          <button
            type="button"
            onClick={() => setOpen(open === i ? -1 : i)}
            className="flex w-full items-center justify-between py-4 text-left"
            aria-expanded={open === i}
          >
            <span className="text-[13px] font-bold uppercase tracking-[0.14em]">{item.title}</span>
            <ChevronDown
              size={16}
              className={cn("text-ink-3 transition-transform duration-300", open === i && "rotate-180 text-ember")}
            />
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 0.9, 0.24, 1] }}
                className="overflow-hidden"
              >
                <div className="pb-5 text-sm leading-relaxed text-ink-2">{item.body}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
