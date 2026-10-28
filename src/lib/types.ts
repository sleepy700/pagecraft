export type Motif =
  | "botanical"
  | "fern"
  | "celestial"
  | "arches"
  | "waves"
  | "rays"
  | "atlas"
  | "ember"
  | "maze"
  | "grid"
  | "tide"
  | "type";

export type Cover = {
  motif: Motif;
  /** gradient start */
  bg: string;
  /** gradient end */
  bg2: string;
  /** primary ink color for artwork + type */
  ink: string;
  /** accent color */
  accent: string;
  /** title broken into lines for the cover layout */
  lines: string[];
  /** small line set under the title */
  kicker?: string;
};

export type CollectionRecord = {
  id: number;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
};

export type ReviewRecord = {
  id: number;
  productId: number;
  author: string;
  location: string | null;
  rating: number;
  title: string;
  body: string;
  verified: boolean;
  createdAt: Date;
};

export type ProductRecord = {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  author: string;
  description: string[];
  price: number;
  compareAt: number | null;
  hardcoverPrice: number | null;
  pages: number;
  dimensions: string;
  badge: string | null;
  featured: boolean;
  stock: number;
  /** When set, "Buy on Amazon" replaces the internal cart checkout */
  amazonUrl: string | null;
  /** Optional print-edition listing (paperback/hardcover) with its own ASIN */
  amazonUrlPrint: string | null;
  printPrice: number | null;
  printFormat: "Paperback" | "Hardcover" | null;
  /** Real cover image path — overrides the procedural SVG cover */
  coverImage: string | null;
  cover: Cover;
  insideQuote: string;
  collectionId: number;
  createdAt: Date;
};

export type RatingStats = { avg: number; count: number };

export type ProductWithStats = ProductRecord & { stats: RatingStats };
