import { ArrowLeft, LibraryBig } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto grid max-w-3xl place-items-center px-5 py-28 text-center sm:px-8">
      <span className="grid h-16 w-16 place-items-center rounded-full bg-paper-deep text-ember">
        <LibraryBig size={28} />
      </span>
      <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.24em] text-ink-3">Error 404</p>
      <h1 className="mt-3 font-display text-[clamp(2.4rem,6vw,4rem)] font-medium leading-[1.02]">
        Lost between the stacks.
      </h1>
      <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-2">
        The page you&apos;re looking for was mis-shelved. It happens in the best libraries — let us
        walk you back to the front desk.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-paper transition-colors hover:bg-ember"
        >
          <ArrowLeft size={14} /> Back home
        </Link>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-7 py-3.5 text-xs font-bold uppercase tracking-[0.15em] transition-colors hover:border-ink"
        >
          Browse the shop
        </Link>
      </div>
    </div>
  );
}
