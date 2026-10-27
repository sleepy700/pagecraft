import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * Smart Amazon redirect: sends every buyer to their local Amazon store.
 * Vercel sets `x-vercel-ip-country` on every request once deployed;
 * in local/preview the fallback is amazon.com.
 *
 * Usage: /go            → the main book (default ASIN)
 *        /go?asin=XXXX  → any future book
 */
const STORES: Record<string, string> = {
  US: "amazon.com",
  CA: "amazon.ca",
  AU: "amazon.com.au",
  GB: "amazon.co.uk",
  UK: "amazon.co.uk",
  IN: "amazon.in",
  DE: "amazon.de",
  FR: "amazon.fr",
  IT: "amazon.it",
  ES: "amazon.es",
  NL: "amazon.nl",
  JP: "amazon.co.jp",
  BR: "amazon.com.br",
  MX: "amazon.com.mx",
  SG: "amazon.sg",
  AE: "amazon.ae",
  PL: "amazon.pl",
  SE: "amazon.se",
  BE: "amazon.com.be",
  SA: "amazon.sa",
  TR: "amazon.com.tr",
  EG: "amazon.eg",
};

const DEFAULT_ASIN = "B0HLZR7B4B";

export function GET(req: NextRequest) {
  const country = (req.headers.get("x-vercel-ip-country") ?? "US").toUpperCase();
  const domain = STORES[country] ?? "amazon.com";

  const asinParam = req.nextUrl.searchParams.get("asin");
  const asin = asinParam && /^[A-Z0-9]{10}$/i.test(asinParam) ? asinParam.toUpperCase() : DEFAULT_ASIN;

  return NextResponse.redirect(`https://www.${domain}/dp/${asin}`, 302);
}
