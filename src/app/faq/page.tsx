import type { Metadata } from "next";
import { ExternalLink, Globe2, HelpCircle, RotateCcw, ShoppingCart, TabletSmartphone } from "lucide-react";
import Link from "next/link";
import { ProductAccordions } from "@/components/product-accordions";

export const metadata: Metadata = {
  title: "How buying works — FAQ",
  description:
    "How to buy PageCraft Kindle eBooks and paperbacks worldwide through Amazon, including local stores, formats, delivery and returns.",
};

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 pb-24 pt-12 sm:px-8 lg:pt-16">
      <nav className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-3">
        <Link href="/" className="transition-colors hover:text-ember">Home</Link>
        <span className="mx-2 text-ink/25">/</span>
        <span className="text-ink-2">Help</span>
      </nav>

      <h1 className="mt-4 font-display text-[clamp(2.4rem,5vw,3.8rem)] font-medium leading-[1.02] tracking-tight">
        Good questions, <span className="italic text-ember">straight</span> answers.
      </h1>
      <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-2">
        Everything about browsing PageCraft and buying Kindle eBooks or paperbacks through Amazon —
        in plain language, wherever you live.
      </p>

      <section id="buying" className="mt-16 scroll-mt-28">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-gold text-ink"><ShoppingCart size={18} /></span>
          <h2 className="font-display text-2xl font-semibold">How buying works</h2>
        </div>
        <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-ink-2">
          <p>
            PageCraft helps readers discover the catalog, but every purchase is completed on Amazon.
            Payment details never pass through this website, and fulfillment stays inside the Amazon
            account you already trust.
          </p>
          <ul className="grid gap-3 sm:grid-cols-3">
            {[
              ["1 · Choose a book", "Open any title to see its official cover, description, format and reference US price"],
              ["2 · Tap Buy on Amazon", "Our smart link opens that exact book on an appropriate local Amazon store"],
              ["3 · Amazon fulfills it", "Amazon shows Kindle availability and print delivery options at checkout"],
            ].map(([a, b]) => (
              <li key={a} className="rounded-xl border border-ink/10 bg-paper-deep/50 p-4">
                <p className="font-display text-[15px] font-semibold">{a}</p>
                <p className="mt-1 text-xs leading-snug text-ink-2">{b}</p>
              </li>
            ))}
          </ul>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-ember hover:text-paper"
          >
            Browse all PageCraft books <ExternalLink size={13} />
          </Link>
        </div>
      </section>

      <section className="mt-14 scroll-mt-28">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-forest text-paper"><Globe2 size={18} /></span>
          <h2 className="font-display text-2xl font-semibold">Buying from your country</h2>
        </div>
        <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-ink-2">
          <p>
            PageCraft&apos;s smart links recognize the visitor&apos;s country on Vercel and redirect to
            Amazon US, Canada, UK, Australia, India, Germany, France, Italy, Spain, Japan and other
            supported stores. If no local store is mapped, the link safely falls back to Amazon.com.
          </p>
          <p>
            Availability, currency, taxes and prices can vary by marketplace. The price shown on this
            site reflects the main Amazon.com listing; your local Amazon page is always the final,
            authoritative price.
          </p>
        </div>
      </section>

      <section id="refunds" className="mt-14 scroll-mt-28">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-ember text-paper"><RotateCcw size={18} /></span>
          <h2 className="font-display text-2xl font-semibold">Delivery, returns & support</h2>
        </div>
        <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-ink-2">
          <p>
            Kindle delivery is normally immediate to your Kindle library. Paperback printing,
            shipping estimates and Prime eligibility depend on your delivery address and are shown by
            Amazon before payment.
          </p>
          <p>
            Returns and refunds follow the policy displayed by the Amazon marketplace where you placed
            the order. Use <strong className="text-ink">Your Orders</strong> in Amazon for the fastest
            help with a purchase, delivery or refund.
          </p>
        </div>
      </section>

      <section id="faq" className="mt-14 scroll-mt-28">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-ink text-paper"><HelpCircle size={18} /></span>
          <h2 className="font-display text-2xl font-semibold">Frequently asked</h2>
        </div>
        <div className="mt-6">
          <ProductAccordions
            items={[
              {
                title: "Do I need a Kindle device for the eBooks?",
                body: (
                  <span className="flex gap-2.5">
                    <TabletSmartphone size={16} className="mt-0.5 shrink-0 text-ember" />
                    <span>
                      No. Amazon&apos;s free Kindle app works on iPhone, Android, Windows and Mac, and
                      Kindle for Web runs in a browser. Your library syncs across supported devices.
                    </span>
                  </span>
                ),
              },
              {
                title: "Why are some books under different author names?",
                body: "PageCraft is a multi-genre catalog. Some books use a category-specific author or imprint name — for example Little Lamp Books for children's creativity, Dr. Ryan Veda for wellness, and Jordan Blake for relationship psychology. The exact author shown here matches the public Amazon listing.",
              },
              {
                title: "Are the prices the same in every country?",
                body: "Not always. Amazon converts or sets marketplace prices by currency and may add local taxes. PageCraft shows the manually maintained reference US price for reference; the local Amazon page opened by the Buy button shows the final price for your account and country.",
              },
              {
                title: "Are all titles available in print?",
                body: "The catalog includes both Kindle editions and paperbacks. Use the Format filter in the shop to view one type. Some Kindle listings also offer a separate print edition on the same Amazon page under 'See all formats and editions.'",
              },
              {
                title: "Does PageCraft collect my card or address?",
                body: "No. This is a discovery storefront. Every Buy button sends you to Amazon, and checkout takes place there. PageCraft does not receive or store your Amazon password, payment card, address or order history.",
              },
              {
                title: "Where can I leave a genuine review?",
                body: "Open the book's product page here, then use the review button to visit its Amazon listing. PageCraft intentionally does not display invented reviews; Amazon is the source for reader ratings and customer feedback.",
              },
            ]}
          />
        </div>
      </section>

      <div className="mt-16 rounded-[22px] border border-ink/10 bg-paper-deep/50 p-8 text-center">
        <span className="mx-auto grid h-11 w-11 place-items-center rounded-full bg-ink text-paper"><Globe2 size={18} /></span>
        <h2 className="mt-4 font-display text-2xl font-semibold">Ready to find your next book?</h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink-2">
          Browse by category, format, price or title — then buy safely through the Amazon store
          available in your country.
        </p>
        <Link
          href="/shop"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-paper transition-colors hover:bg-ember"
        >
          Explore all books <ExternalLink size={13} />
        </Link>
      </div>
    </div>
  );
}
