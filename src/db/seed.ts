import "dotenv/config";
import { db, pool } from "@/db";
import { collections, orderItems, orders, products, reviews } from "@/db/schema";
import { DEMO_COLLECTIONS, DEMO_PRODUCTS } from "@/lib/catalog";

async function main() {
  console.log("Seeding PageCraft store…");

  await db.delete(orderItems);
  await db.delete(orders);
  await db.delete(reviews);
  await db.delete(products);
  await db.delete(collections);

  const insertedCollections = await db
    .insert(collections)
    .values(DEMO_COLLECTIONS)
    .returning();
  const slugToId = new Map(insertedCollections.map((c) => [c.slug, c.id]));
  console.log(`  collections: ${insertedCollections.length}`);

  let reviewCount = 0;
  for (const p of DEMO_PRODUCTS) {
    const collectionId = slugToId.get(p.collection);
    if (!collectionId) throw new Error(`Unknown collection ${p.collection}`);

    const [row] = await db
      .insert(products)
      .values({
        slug: p.slug,
        title: p.title,
        subtitle: p.subtitle,
        author: p.author,
        description: p.description,
        price: p.price,
        compareAt: p.compareAt ?? null,
        hardcoverPrice: p.hardcoverPrice ?? null,
        pages: p.pages,
        dimensions: p.dimensions,
        collectionId,
        badge: p.badge ?? null,
        featured: p.featured ?? false,
        stock: p.stock,
        amazonUrl: p.amazonUrl ?? null,
        coverImage: p.coverImage ?? null,
        cover: p.cover,
        insideQuote: p.insideQuote,
        createdAt: new Date(p.createdAt + "T12:00:00Z"),
      })
      .returning({ id: products.id });

    if (p.reviews.length > 0) {
      await db.insert(reviews).values(
        p.reviews.map((r) => ({
          productId: row.id,
          author: r.author,
          location: r.location,
          rating: r.rating,
          title: r.title,
          body: r.body,
          verified: r.verified,
          createdAt: new Date(r.date + "T12:00:00Z"),
        })),
      );
      reviewCount += p.reviews.length;
    }
  }

  console.log(`  products: ${DEMO_PRODUCTS.length}`);
  console.log(`  reviews: ${reviewCount}`);
  console.log("Seed complete.");
}

main()
  .then(async () => {
    await pool.end();
    process.exit(0);
  })
  .catch(async (err) => {
    console.error(err);
    await pool.end();
    process.exit(1);
  });
