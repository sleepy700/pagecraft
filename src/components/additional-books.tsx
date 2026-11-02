import { BookOpen, ExternalLink } from "lucide-react";

// Owner-supplied listings. Do not invent bibliographic or edition details.
const listings = [
  { asin: "B0HM23B88P", url: "https://www.amazon.com/dp/B0HM23B88P", note: "View book details, available editions and current pricing on Amazon." },
  { asin: "B0HPZJXQX1", url: "https://www.amazon.com/dp/B0HPZJXQX1", note: "Explore the two versions on Amazon." },
  { asin: "B0HP621DK5", url: "https://www.amazon.com/dp/B0HP621DK5", note: "Explore the three versions on Amazon." },
  { asin: "B0HPZ9SKTQ", url: "https://www.amazon.in/dp/B0HPZ9SKTQ", note: "View this book on Amazon India." },
];

export function AdditionalBooks() {
  return (
    <section aria-labelledby="additional-books-heading" className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
      <h2 id="additional-books-heading" className="font-display text-3xl">More books on Amazon</h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-2">
        Explore more listings from our author. Open Amazon for the title, cover,
        available editions and current pricing. Edition availability varies by marketplace.
      </p>
      <div className="mt-7 grid gap-5 sm:grid-cols-3">
        {listings.map((book) => (
          <article key={book.asin} className="rounded-2xl border border-ink/10 bg-paper-deep/50 p-6">
            <BookOpen size={30} aria-hidden="true" className="text-ember" />
            <h3 className="mt-4 font-display text-xl">Amazon listing · {book.asin}</h3>
            <p className="mt-3 text-sm text-ink-2">{book.note}</p>
            <a href={book.url} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 font-semibold text-ember underline underline-offset-4">
              View book & editions <ExternalLink size={15} aria-hidden="true" />
              <span className="sr-only">for {book.asin} (opens in a new tab)</span>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
