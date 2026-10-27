import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "PageCraft — Coloring Books, AI Guides, Fiction & More",
    template: "%s · PageCraft",
  },
  description:
    "Discover PageCraft books worldwide: kids' coloring and drawing books, AI and freelancing guides, psychology, wellness, biography and original mystery fiction. Buy securely on your local Amazon store.",
  keywords: [
    "PageCraft books",
    "Mantu Ji books",
    "ChatGPT for Freelancers",
    "Festivals of India coloring book",
    "How to Draw Cute Sea Animals",
    "The Witness Is Words novel",
    "The Story of Osho book",
    "AI prompts book for freelancers",
    "coloring books for kids",
    "kids drawing books ages 4-8",
    "psychology attraction book",
    "wellness and focus books",
    "independent author bookstore",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "PageCraft",
    title: "PageCraft — Books to Make, Think, Grow & Wonder",
    description:
      "Nine original books across kids' creativity, AI, psychology, wellness, biography and fiction — available worldwide through Amazon.",
    images: [{ url: "/images/collection-guides.jpg", width: 1200, height: 800, alt: "PageCraft book collection" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PageCraft — Independent Books for Curious Readers",
    description: "Kids' creativity, AI, psychology, wellness, biography and fiction — available worldwide.",
    images: ["/images/collection-guides.jpg"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "PageCraft",
    url: SITE_URL,
    description: "Independent multi-genre books available worldwide through Amazon.",
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/shop?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col bg-paper text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
