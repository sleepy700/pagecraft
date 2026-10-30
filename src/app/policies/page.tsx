import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy & site policies",
  description: "How PageCraft handles browsing, Amazon purchases and reference information.",
  alternates: { canonical: "/policies" },
};

export default function PoliciesPage() {
  const sections = [
    ["Independent website & purchases", "PageCraft is an independent book-discovery website, not Amazon or an Amazon customer-support service. Purchases take place on the external Amazon marketplace. The seller and marketplace determine prices, taxes, availability, payment methods, shipping, returns and refunds. For order support, use the Amazon account used to purchase."],
    ["Prices & availability", "Catalog prices are manually maintained US reference prices, not live quotations. Prices and availability may change and may differ by country or edition. Confirm the final details on Amazon before paying. A link to a local store does not guarantee that a title is available there."],
    ["Privacy & hosting", "The current storefront does not provide customer accounts, a checkout, a newsletter signup or a contact form. It does not directly collect payment details. Hosting providers may process technical request data such as IP addresses, browser information and security logs to deliver and protect the site. This is not a promise of anonymous browsing."],
    ["Browser storage & third parties", "The deployment guide at /admin saves its progress in your browser's local storage; you can clear it using your browser settings. Vercel Web Analytics is integrated to measure page views, approximate visitor counts, referral sources, device information and country-level traffic. It does not use tracking cookies; counts may be incomplete when browsers block analytics. We do not intentionally send names, email addresses or payment details as analytics events. No advertising scripts are intentionally included in the current application code. Fonts are hosted with the site. Following an Amazon link takes you to a separate service whose privacy and cookie policies apply. Google Search Console verification does not add visitor tracking code to this website."],
    ["Amazon links", "Current purchase redirects use product identifiers and do not add an Amazon Associates tracking tag. If affiliate links are introduced, the operator must add the appropriate disclosure and comply with the relevant program rules before publishing them. Amazon and Kindle are trademarks of their respective owners; their mention does not imply endorsement."],
    ["Content & wellness information", "Book descriptions are informational. Health, psychology, business and AI content is not individual medical, mental-health, legal or financial advice. No health or earnings outcome is guaranteed. Consult a qualified professional when appropriate. Rights to books, cover artwork, photographs and descriptions must be held by, or licensed to, the site operator."],
  ];
  return (
    <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
      <h1 className="font-display text-4xl">Privacy & site policies</h1>
      <p className="mt-4 text-sm text-ink-2">Updated 30 October 2026. These notices describe the current site; they do not replace applicable consumer rights.</p>
      {sections.map(([title, text]) => (
        <section key={title} className="mt-9">
          <h2 className="font-display text-2xl">{title}</h2>
          <p className="mt-3 leading-relaxed text-ink-2">{text}</p>
        </section>
      ))}
    </article>
  );
}
