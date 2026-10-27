import type { Cover } from "@/lib/types";

export type DemoReview = {
  author: string;
  location: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  verified: boolean;
};

export type DemoProduct = {
  slug: string;
  title: string;
  subtitle: string;
  author: string;
  description: string[];
  price: number;
  compareAt?: number;
  hardcoverPrice?: number;
  pages: number;
  dimensions: string;
  collection: string;
  badge?: string;
  featured?: boolean;
  stock: number;
  amazonUrl?: string;
  /** Print-edition listing (separate ASIN on Amazon format swatch) */
  amazonUrlPrint?: string;
  printPrice?: number;
  printFormat?: "Paperback" | "Hardcover";
  coverImage?: string;
  createdAt: string;
  cover: Cover;
  insideQuote: string;
  reviews: DemoReview[];
};

export const DEMO_COLLECTIONS = [
  {
    slug: "kids-creative",
    name: "Kids' Creative Books",
    tagline: "Draw, color, imagine and learn",
    description:
      "Big, friendly pages made for crayons, pencils, curious hands and screen-free afternoons.",
    image: "/images/collection-coloring.jpg",
    sort: 1,
  },
  {
    slug: "ai-business",
    name: "AI & Freelancing",
    tagline: "Practical tools for modern independent work",
    description:
      "Action-first guides, prompt libraries and client-ready systems for freelancers and creators.",
    image: "/images/collection-guides.jpg",
    sort: 2,
  },
  {
    slug: "health-wellness",
    name: "Health & Calm",
    tagline: "Evidence, rituals and calmer daily systems",
    description:
      "Approachable wellness guides for focus, sleep, healthy habits and whole-person care.",
    image: "/images/collection-wellness.jpg",
    sort: 3,
  },
  {
    slug: "psychology-growth",
    name: "Psychology & Growth",
    tagline: "Understand people — and yourself — more clearly",
    description:
      "Research-led psychology and honest personal development for relationships, confidence and adulthood.",
    image: "/images/collection-psychology.jpg",
    sort: 4,
  },
  {
    slug: "fiction-mystery",
    name: "Fiction & Mystery",
    tagline: "Stories where every word leaves a fingerprint",
    description:
      "Original fiction built around irresistible questions, forensic clues and one-more-chapter endings.",
    image: "/images/collection-fiction.jpg",
    sort: 5,
  },
  {
    slug: "spirituality-biography",
    name: "Biography & Spirituality",
    tagline: "Complex lives, examined without easy verdicts",
    description:
      "Balanced, documented stories of ideas, movements and the people who changed them.",
    image: "/images/collection-spirituality.jpg",
    sort: 6,
  },
];

export const DEMO_PRODUCTS: DemoProduct[] = [
  {
    slug: "chatgpt-for-freelancers",
    title: "ChatGPT for Freelancers",
    subtitle: "The Complete AI Toolkit to Double Your Income and Cut Your Work Hours in Half",
    author: "Mantu Ji",
    description: [
      "A complete working toolkit for independent professionals: 100 categorized prompts, a 30-day action plan, and practical templates for real client work. Use ChatGPT to sharpen proposals, email follow-ups, project scopes, content plans, service packages, schedules, portfolios and freelance profiles.",
      "Every chapter closes with a summary and action checklist, so nothing stays theoretical. Bonus resources include 30 prompts for writers, 10 image prompts, 10 Upwork proposal structures, 10 client email templates and a practical overview of 20 AI tools.",
      "Written for freelancers who want clear steps, useful systems and more time for paid work — without unnecessary complexity or technical jargon.",
    ],
    price: 299,
    pages: 165,
    dimensions: "Kindle eBook",
    collection: "ai-business",
    badge: "Featured",
    featured: true,
    stock: 999,
    amazonUrl: "https://www.amazon.com/dp/B0HLZR7B4B",
    amazonUrlPrint: "https://www.amazon.com/dp/B0HM83JWCL",
    printPrice: 999,
    printFormat: "Paperback",
    coverImage: "/images/products/mantuji-cover.jpg",
    createdAt: "2026-10-05",
    cover: {
      motif: "grid",
      bg: "#12233D",
      bg2: "#070D18",
      ink: "#EAF2FF",
      accent: "#25C0F2",
      lines: ["ChatGPT for", "Freelancers"],
      kicker: "the complete AI toolkit",
    },
    insideQuote: "Ask better questions. Ship better work. Make more room for the work that matters.",
    reviews: [],
  },
  {
    slug: "festivals-of-india-coloring-book",
    title: "Festivals of India",
    subtitle: "A Fun Coloring Book for Kids Featuring Navratri, Dussehra and Diwali",
    author: "Little Lamp Books",
    description: [
      "A joyful, extra-large coloring book that brings India's festive season to a child's fingertips. Forty single-sided drawings use bold, smooth outlines, wide open spaces and no fiddly shading, helping younger children color with confidence.",
      "The pages celebrate Navratri, Dussehra and Diwali through rangoli, diyas, traditional sweets, decorations and friendly story figures. Children can meet the nine forms of the Goddess, visit a Ramlila scene, color Hanuman Ji and Ravan Dahan, and finish with warm family Diwali moments.",
      "Every illustration has a blank page behind it, so crayons and markers do not rub onto the next picture. A welcoming, screen-free introduction to Indian culture through creativity.",
    ],
    price: 821,
    pages: 84,
    dimensions: "8.5 × 11 in · Paperback",
    collection: "kids-creative",
    badge: "Ages 3+",
    featured: true,
    stock: 999,
    amazonUrl: "https://www.amazon.com/dp/B0HP2C2TVH",
    coverImage: "/images/products/B0HP2C2TVH.jpg",
    createdAt: "2026-10-18",
    cover: {
      motif: "rays",
      bg: "#F6B744",
      bg2: "#E85C36",
      ink: "#4A2335",
      accent: "#FFF1BD",
      lines: ["Festivals", "of India"],
      kicker: "coloring fun for kids",
    },
    insideQuote: "Celebrate every light, color and story.",
    reviews: [],
  },
  {
    slug: "how-to-draw-cute-sea-animals",
    title: "How to Draw Cute Sea Animals",
    subtitle: "50+ Adorable Ocean Friends in Easy Steps for Kids Ages 4–8",
    author: "Mantu Ji",
    description: [
      "Teach your child to draw dolphins, sharks, octopuses, turtles and more than 50 adorable ocean friends in four easy steps. The instructions are designed especially for children ages 4–8, with simple shapes and plenty of room to practice.",
      "Inside are tracing pages, free-draw spaces, five activity zones, three bonus coloring scenes, a beginner shapes guide and an official certificate of completion. Single-sided pages help prevent bleed-through while children build confidence and fine-motor skills.",
      "A cheerful screen-free activity for homeschool art time, travel, birthdays, holidays and any young artist fascinated by the ocean.",
    ],
    price: 990,
    pages: 98,
    dimensions: "8.5 × 11 in · Paperback",
    collection: "kids-creative",
    badge: "Ages 4–8",
    featured: true,
    stock: 999,
    amazonUrl: "https://www.amazon.com/dp/B0HPFDB1WD",
    coverImage: "/images/products/B0HPFDB1WD.jpg",
    createdAt: "2026-10-25",
    cover: {
      motif: "tide",
      bg: "#73CDE0",
      bg2: "#237FA3",
      ink: "#083B58",
      accent: "#FFD65A",
      lines: ["How to Draw", "Cute Sea Animals"],
      kicker: "50+ ocean friends",
    },
    insideQuote: "Every great drawing starts with one simple shape.",
    reviews: [],
  },
  {
    slug: "rooted-stop-hair-loss-from-within",
    title: "ROOTED",
    subtitle: "Stop Hair Loss from Within: Science & Ayurveda",
    author: "Dr. Ryan Veda",
    description: [
      "ROOTED looks beneath the visible strand to the living follicle — and explains how blood markers, hormones, sleep, stress and scalp health can shape hair loss. It connects modern trichology with classical Ayurvedic ideas without asking readers to choose one side.",
      "Explore the five common alarms, useful lab markers, a Pitta-cooling food approach, evidence and cautions for classical herbs, hands-on scalp practices, and breath and sleep routines designed to reduce stress.",
      "The book brings everything together in a structured 60-day blueprint with daily blocks, a four-week ramp and a way to measure progress instead of relying on hope. Health information is educational and is not a substitute for individual medical advice.",
    ],
    price: 309,
    pages: 0,
    dimensions: "Kindle eBook",
    collection: "health-wellness",
    badge: "Kindle",
    featured: true,
    stock: 999,
    amazonUrl: "https://www.amazon.com/dp/B0HNFYVTL1",
    amazonUrlPrint: "https://www.amazon.com/dp/B0HP9TBYPL",
    printPrice: 869,
    printFormat: "Paperback",
    coverImage: "/images/products/B0HNFYVTL1.jpg",
    createdAt: "2026-10-18",
    cover: {
      motif: "fern",
      bg: "#315941",
      bg2: "#142C20",
      ink: "#F1EAD7",
      accent: "#A9C76B",
      lines: ["ROOTED"],
      kicker: "science & ayurveda",
    },
    insideQuote: "Grow from the root.",
    reviews: [],
  },
  {
    slug: "unspoken-signs-of-attraction",
    title: "UNSPOKEN",
    subtitle: "100 Science-Backed Psychology Signs of Attraction",
    author: "Jordan Blake",
    description: [
      "UNSPOKEN turns the anxiety of decoding glances, texts and conversations into something readers can study. One hundred psychological signs cover eye contact, body language, voice, digital communication, touch, attention, memory and the biology of attraction.",
      "Each sign explains the mechanism, names the research behind it and shows what it might look like in real life. Myth-versus-fact sections, a quick-reference cheat sheet and sources for each claim help separate popular assumptions from supported evidence.",
      "The book's central rule is simple: signs are clues, not proof. Look for clusters that repeat over time, and read people with more curiosity and less anxiety.",
    ],
    price: 309,
    pages: 132,
    dimensions: "Kindle eBook",
    collection: "psychology-growth",
    badge: "100 Signs",
    featured: true,
    stock: 999,
    amazonUrl: "https://www.amazon.com/dp/B0HP7ZCR62",
    amazonUrlPrint: "https://www.amazon.com/dp/B0HMRZFGTJ",
    printPrice: 1999,
    printFormat: "Hardcover",
    coverImage: "/images/products/B0HP7ZCR62.jpg",
    createdAt: "2026-10-25",
    cover: {
      motif: "arches",
      bg: "#672D3E",
      bg2: "#2D1420",
      ink: "#F8ECDC",
      accent: "#E6A06F",
      lines: ["UNSPOKEN"],
      kicker: "psychology of attraction",
    },
    insideQuote: "Signs are clues, not proof. Read the pattern, not the moment.",
    reviews: [],
  },
  {
    slug: "the-witness-is-words",
    title: "The Witness Is Words",
    subtitle: "A Locked-Room Mystery Where the Murder Weapon Is Language",
    author: "Mantu Ji",
    description: [
      "Publisher Victor Sterling is found dead inside his locked study in the fog-bound town of Coldbrook. Five people were in the house. Detective Mary Beck has one witness that cannot lie: everything each suspect has written.",
      "A daughter's unsent drafts, a partner's legal notices, a secretary's flawless exclamation marks, a brother's editorials and a dead man's diary become linguistic fingerprints. In the police-station basement, the text-analysis system ORA searches for the shape of a voice a forger cannot control.",
      "A document-driven locked-room mystery for readers who love forensic clues, unreliable voices and sentences that demand one more chapter.",
    ],
    price: 399,
    pages: 168,
    dimensions: "Kindle eBook",
    collection: "fiction-mystery",
    badge: "New Novel",
    featured: true,
    stock: 999,
    amazonUrl: "https://www.amazon.com/dp/B0HP7KJ8CR",
    amazonUrlPrint: "https://www.amazon.com/dp/B0HMPBV8K9",
    printPrice: 1809,
    printFormat: "Paperback",
    coverImage: "/images/products/B0HP7KJ8CR.jpg",
    createdAt: "2026-10-25",
    cover: {
      motif: "type",
      bg: "#1D2837",
      bg2: "#090E14",
      ink: "#F0E8D4",
      accent: "#C3463A",
      lines: ["The Witness", "Is Words"],
      kicker: "a novel",
    },
    insideQuote: "The writing doesn't lie.",
    reviews: [],
  },
  {
    slug: "the-story-of-osho",
    title: "The Story of Osho",
    subtitle: "Life, Ideas and Controversies",
    author: "Mantu Ji",
    description: [
      "A balanced account of the village boy born Chandra Mohan Jain who became Acharya Rajneesh, Bhagwan Shree Rajneesh and finally Osho — one of the twentieth century's most celebrated and controversial spiritual figures.",
      "Twenty documented chapters follow the journey from Kuchwada and Jabalpur to Bombay, Pune and Rajneeshpuram. The book examines meditation, freedom, love and religion alongside the Rolls-Royce image, the 1984 salmonella attack and the legal collapse of 1985.",
      "Supporters' views and critics' objections are kept in clearly labeled sections. Sources, a timeline and reflection questions invite readers to examine the evidence and keep the final verdict for themselves.",
    ],
    price: 899,
    pages: 96,
    dimensions: "6 × 9 in · Paperback",
    collection: "spirituality-biography",
    badge: "Biography",
    featured: true,
    stock: 999,
    amazonUrl: "https://www.amazon.com/dp/B0HMRCNHRL",
    amazonUrlPrint: "https://www.amazon.com/dp/B0HP74D892",
    printPrice: 4999,
    printFormat: "Hardcover",
    coverImage: "/images/products/B0HMRCNHRL.jpg",
    createdAt: "2026-10-12",
    cover: {
      motif: "rays",
      bg: "#B44D2B",
      bg2: "#592113",
      ink: "#FFF0D2",
      accent: "#E9B95E",
      lines: ["The Story", "of Osho"],
      kicker: "life · ideas · controversies",
    },
    insideQuote: "The evidence is here. The verdict stays yours.",
    reviews: [],
  },
  {
    slug: "boy-to-man",
    title: "BOY TO MAN",
    subtitle: "Decoding the Male Mind",
    author: "Mantu Ji",
    description: [
      "BOY TO MAN is the honest conversation many young men never had with a father, elder brother or closest friend — about focus, money, loneliness, anger, rejection and the pressure to pretend everything is fine.",
      "The book tackles the dopamine trap with a seven-day reset, career pressure with a realistic three-year game plan, love and rejection without 'nice guy' myths, the loneliness epidemic, emotional control and a daily high-value-man system.",
      "Every chapter ends with three practical actions. No jargon and no hustle-culture performance — just direct guidance for young men ready to build discipline, friendship and self-respect.",
    ],
    price: 309,
    pages: 83,
    dimensions: "Kindle eBook",
    collection: "psychology-growth",
    badge: "30-Day Plan",
    featured: true,
    stock: 999,
    amazonUrl: "https://www.amazon.com/dp/B0HMP36MZH",
    amazonUrlPrint: "https://www.amazon.com/dp/B0HNHB9V96",
    printPrice: 769,
    printFormat: "Paperback",
    coverImage: "/images/products/B0HMP36MZH.jpg",
    createdAt: "2026-10-11",
    cover: {
      motif: "rays",
      bg: "#172C49",
      bg2: "#07101D",
      ink: "#F4F1E8",
      accent: "#E6A436",
      lines: ["BOY", "TO MAN"],
      kicker: "decoding the male mind",
    },
    insideQuote: "You are not behind. You are early. Now get up.",
    reviews: [],
  },
  {
    slug: "the-low-stimulation-method",
    title: "The Low-Stimulation Method",
    subtitle: "A 30-Day Guide to Reclaim Your Focus, Sleep Deeper, and Find Your Calm",
    author: "Mantu Ji",
    description: [
      "A practical guide for anyone who feels mentally tired, distracted or constantly switched on. Instead of another complicated routine, The Low-Stimulation Method makes room for focus, rest and calm through small changes that fit real life.",
      "Ten practical chapters cover more intentional phone habits, clearer focus and a calmer bedtime. A 30-day challenge, 50 calm-life tips, exercises and action checklists make it easy to begin with one useful idea at a time.",
      "No expensive tools, hours of meditation or perfect routine required. A calmer life can begin with the next small choice.",
    ],
    price: 1199,
    pages: 79,
    dimensions: "6 × 9 in · Paperback",
    collection: "health-wellness",
    badge: "30-Day Guide",
    featured: true,
    stock: 999,
    amazonUrl: "https://www.amazon.com/dp/B0HMGBHW92",
    coverImage: "/images/products/B0HMGBHW92.jpg",
    createdAt: "2026-10-08",
    cover: {
      motif: "waves",
      bg: "#B9C6BF",
      bg2: "#778D83",
      ink: "#22372F",
      accent: "#E9D6A8",
      lines: ["The Low-Stimulation", "Method"],
      kicker: "30 days to calm",
    },
    insideQuote: "Your calmer life can start with the next small choice.",
    reviews: [],
  },
];

export const FREE_SHIPPING_LINE = 35;
