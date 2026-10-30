import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact us",
  description: "Contact PageCraft through our Facebook page for book and website enquiries.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
      <h1 className="font-display text-4xl">Contact us</h1>
      <p className="mt-5 leading-relaxed text-ink-2">
        Have a question about our books or this website? Visit our Facebook page.
        If messaging is available on the page, you can send us a message there.
      </p>
      <a
        href="https://www.facebook.com/profile.php?id=61595025644963"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex items-center gap-3 rounded-full bg-ember px-6 py-3 font-semibold text-paper transition-colors hover:bg-ember-deep"
      >
        Contact us on Facebook <ExternalLink size={16} aria-hidden="true" />
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
      <p className="mt-5 text-sm leading-relaxed text-ink-2">
        This link opens Facebook, a separate service with its own privacy policy.
        Please do not send passwords, payment details or other sensitive information.
      </p>
      <p className="mt-8 leading-relaxed text-ink-2">
        For Amazon orders, delivery, returns or refunds, please contact Amazon
        through the account used for your purchase. PageCraft cannot access your Amazon orders.
      </p>
    </article>
  );
}
