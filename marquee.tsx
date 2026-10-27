import { Sparkle } from "lucide-react";

const ITEMS = [
  "9 original books",
  "Kids' coloring & drawing",
  "AI & freelancing guides",
  "Psychology & personal growth",
  "Health & calm",
  "Original mystery fiction",
  "Available worldwide on Amazon",
];

export function MarqueeBand() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="overflow-hidden border-y border-ink/10 bg-ember py-3.5" aria-hidden>
      <div className="animate-marquee flex w-max items-center gap-8">
        {row.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-8 text-[11.5px] font-bold uppercase tracking-[0.22em] text-paper"
          >
            {item}
            <Sparkle size={12} className="text-gold" />
          </span>
        ))}
      </div>
    </div>
  );
}
