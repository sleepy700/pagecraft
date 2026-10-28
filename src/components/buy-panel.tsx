import { Check, ExternalLink } from "lucide-react";
import { formatMoney } from "@/lib/money";
import type { Cover } from "@/lib/types";

export function BuyPanel({
  price,
  compareAt,
  amazonUrl,
  amazonUrlPrint,
  printPrice,
  printFormat,
  editionLabel,
  digital,
}: {
  slug: string;
  title: string;
  author: string;
  price: number;
  compareAt: number | null;
  hardcoverPrice: number | null;
  cover: Cover;
  stock: number;
  amazonUrl?: string | null;
  amazonUrlPrint?: string | null;
  printPrice?: number | null;
  printFormat?: "Paperback" | "Hardcover" | null;
  editionLabel?: string;
  digital?: boolean;
}) {
  const onSale = compareAt != null && compareAt > price;
  const asin = amazonUrl?.match(/\/dp\/([A-Z0-9]{10})/i)?.[1];
  const amazonPath = asin ? `/go?asin=${asin}` : amazonUrl ?? "/shop";
  const printAsin = amazonUrlPrint?.match(/\/dp\/([A-Z0-9]{10})/i)?.[1];
  const printPath = printAsin ? `/go?asin=${printAsin}` : amazonUrlPrint ?? null;

  return (
    <div className="rounded-[20px] border border-ink/10 bg-paper-deep/50 p-6 shadow-card">
      <div className="flex flex-wrap items-baseline gap-3">
        <p className="font-display text-[34px] font-semibold leading-none">{formatMoney(price)}</p>
        {onSale && <p className="text-lg text-ink-3 line-through">{formatMoney(compareAt)}</p>}
        <span className="text-xs text-ink-2">{editionLabel ?? "Amazon edition"} · Reference US price</span>
      </div>

      <a
        href={amazonPath}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 flex w-full items-center justify-center gap-2.5 rounded-full bg-gold px-6 py-4 text-sm font-bold text-ink shadow-card transition-all hover:bg-ember hover:text-paper hover:shadow-book"
      >
        <ExternalLink size={16} />
        Buy {editionLabel ?? "this book"} · {formatMoney(price)}
      </a>

      {printPath && printPrice != null && (
        <a
          href={printPath}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2.5 flex w-full items-center justify-center gap-2.5 rounded-full border border-ink/20 bg-paper px-6 py-3.5 text-[13px] font-semibold text-ink transition-all hover:border-ember hover:text-ember"
        >
          Also in {printFormat ?? "print"} · {formatMoney(printPrice)}
          <ExternalLink size={13} />
        </a>
      )}

      <div className="mt-4 space-y-2 rounded-xl border border-ink/10 bg-paper px-4 py-3.5">
        {(digital
          ? [
              "Secure checkout on your local Amazon store",
              "Kindle access subject to Amazon availability",
              "Local currency and final price shown by Amazon",
            ]
          : [
              "Secure checkout on your local Amazon store",
              "Printed and fulfilled through Amazon",
              "Local availability and delivery shown before payment",
            ]
        ).map((text) => (
          <p key={text} className="flex items-start gap-2 text-xs leading-relaxed text-ink-2">
            <Check size={13} className="mt-0.5 shrink-0 text-moss" strokeWidth={3} />
            {text}
          </p>
        ))}
      </div>

      <p className="mt-4 text-xs leading-relaxed text-ink-2">Prices are manually maintained references, not live quotes. Check Amazon for the current price, taxes and availability.</p>

      <p className="mt-4 flex items-center gap-2 text-xs text-ink-2">
        <span className="h-2 w-2 rounded-full bg-moss" />
        {digital
          ? "Kindle edition · available where supported"
          : "Paperback · availability varies by marketplace"}
      </p>
    </div>
  );
}
