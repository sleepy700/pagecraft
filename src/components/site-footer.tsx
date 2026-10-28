import { BookOpenText } from "lucide-react";
import Link from "next/link";

const SHOP_LINKS = [
  { href: "/shop", label: "Shop all books" },
  { href: "/shop?collection=kids-creative", label: "Kids' creative books" },
  { href: "/shop?collection=ai-business", label: "AI & freelancing" },
  { href: "/shop?collection=health-wellness", label: "Health & calm" },
  { href: "/shop?collection=fiction-mystery", label: "Fiction & mystery" },
];

const HELP_LINKS = [
  { href: "/faq#buying", label: "How buying works" },
  { href: "/faq#refunds", label: "Returns & support" },
  { href: "/faq#faq", label: "FAQ" },
  { href: "/policies", label: "Privacy & site policies" },
];

const COMPANY_LINKS = [
  { href: "/#collections", label: "All collections" },
  { href: "/shop?format=kindle", label: "Kindle eBooks" },
  { href: "/shop?format=paperback", label: "Paperbacks" },
  { href: "/", label: "Home" },
];

export function SiteFooter() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-[10px] bg-ember text-paper">
                <BookOpenText size={18} />
              </span>
              <span className="font-display text-[22px] font-semibold">
                Page<span className="italic text-gold">Craft</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/60">
              An independent multi-genre book studio: kids&apos; creativity, AI, psychology,
              wellness, biography and fiction — available through local Amazon stores worldwide.
            </p>
            <Link
              href="/shop"
              className="mt-6 inline-flex rounded-full border border-paper/25 px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-paper transition-colors hover:border-gold hover:text-gold"
            >
              Explore the complete catalog →
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-8">
            <FooterCol title="Shop" links={SHOP_LINKS} />
            <FooterCol title="Help" links={HELP_LINKS} />
            <FooterCol title="Company" links={COMPANY_LINKS} />
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-5 border-t border-paper/15 pt-7 sm:flex-row">
          <p className="text-xs text-paper/50">
            © 2026 PageCraft — independent author site. Purchases are completed securely on
            Amazon.
          </p>
          <p className="max-w-sm text-xs leading-relaxed text-paper/60">
            PageCraft is not Amazon. Prices are reference information; confirm current
            price, availability, payment methods and returns on Amazon before buying.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h3 className="text-[11px] font-bold uppercase tracking-[0.22em] text-paper/40">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              href={l.href}
              className="text-sm text-paper/70 transition-colors hover:text-paper"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
