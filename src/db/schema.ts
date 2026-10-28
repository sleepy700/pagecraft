import {
  boolean,
  index,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import type { Cover } from "@/lib/types";

export const collections = pgTable("collections", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  tagline: text("tagline").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  sort: integer("sort").notNull().default(0),
});

export const products = pgTable(
  "products",
  {
    id: serial("id").primaryKey(),
    slug: text("slug").notNull().unique(),
    title: text("title").notNull(),
    subtitle: text("subtitle").notNull(),
    author: text("author").notNull(),
    description: jsonb("description").$type<string[]>().notNull(),
    price: integer("price").notNull(),
    compareAt: integer("compare_at"),
    hardcoverPrice: integer("hardcover_price"),
    pages: integer("pages").notNull(),
    dimensions: text("dimensions").notNull(),
    collectionId: integer("collection_id")
      .notNull()
      .references(() => collections.id),
    badge: text("badge"),
    featured: boolean("featured").notNull().default(false),
    stock: integer("stock").notNull().default(0),
    amazonUrl: text("amazon_url"),
    coverImage: text("cover_image"),
    cover: jsonb("cover").$type<Cover>().notNull(),
    insideQuote: text("inside_quote").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("products_collection_idx").on(t.collectionId)],
);

export const reviews = pgTable(
  "reviews",
  {
    id: serial("id").primaryKey(),
    productId: integer("product_id")
      .notNull()
      .references(() => products.id),
    author: text("author").notNull(),
    location: text("location"),
    rating: integer("rating").notNull(),
    title: text("title").notNull(),
    body: text("body").notNull(),
    verified: boolean("verified").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("reviews_product_idx").on(t.productId)],
);

export const orders = pgTable("orders", {
  id: uuid("id").primaryKey().defaultRandom(),
  orderNumber: text("order_number").notNull().unique(),
  email: text("email").notNull(),
  name: text("name").notNull(),
  phone: text("phone"),
  address1: text("address1").notNull(),
  address2: text("address2"),
  city: text("city").notNull(),
  state: text("state").notNull(),
  zip: text("zip").notNull(),
  country: text("country").notNull().default("United States"),
  subtotal: integer("subtotal").notNull(),
  discount: integer("discount").notNull().default(0),
  shipping: integer("shipping").notNull().default(0),
  total: integer("total").notNull(),
  promoCode: text("promo_code"),
  status: text("status").notNull().default("confirmed"),
  paymentLast4: text("payment_last4"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const orderItems = pgTable(
  "order_items",
  {
    id: serial("id").primaryKey(),
    orderId: uuid("order_id")
      .notNull()
      .references(() => orders.id),
    productId: integer("product_id"),
    title: text("title").notNull(),
    author: text("author").notNull(),
    format: text("format").notNull(),
    price: integer("price").notNull(),
    qty: integer("qty").notNull(),
  },
  (t) => [index("order_items_order_idx").on(t.orderId)],
);
