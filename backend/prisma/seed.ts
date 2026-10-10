import bcrypt from "bcryptjs";

import { prisma } from "../src/lib/prisma";

async function main() {
  console.log("Seeding database...");

  // -------------------------
  // 1. Create shop categories
  // -------------------------

  const khmerFood = await prisma.shopCategory.upsert({
    where: {
      slug: "khmer-food",
    },
    update: {},
    create: {
      name: "Khmer Food",
      slug: "khmer-food",
      description: "Traditional Cambodian food",
    },
  });

  await prisma.shopCategory.upsert({
    where: {
      slug: "fast-food",
    },
    update: {},
    create: {
      name: "Fast Food",
      slug: "fast-food",
      description: "Burgers, fries, sandwiches and more",
    },
  });

  const coffeeDrinks = await prisma.shopCategory.upsert({
    where: {
      slug: "coffee-drinks",
    },
    update: {},
    create: {
      name: "Coffee & Drinks",
      slug: "coffee-drinks",
      description: "Coffee, tea and other drinks",
    },
  });

  // -------------------------
  // 2. Create first seller
  // -------------------------

  const passwordHash = await bcrypt.hash("ByteMe123!", 12);

  const seller = await prisma.user.upsert({
    where: {
      email: "dara@byteme.test",
    },
    update: {
      name: "Dara Sok",
      phone: "012345678",
      passwordHash,
      role: "SELLER",
    },
    create: {
      name: "Dara Sok",
      email: "dara@byteme.test",
      phone: "012345678",
      passwordHash,
      role: "SELLER",
    },
  });

  // -------------------------
  // 3. Create first seller's shop
  // -------------------------

  await prisma.shop.upsert({
    where: {
      sellerId: seller.id,
    },
    update: {
      name: "KhmerFood Kitchen",
      description: "Authentic Cambodian home-style cooking.",
      addressText: "BKK1, Phnom Penh",
      latitude: 11.5564,
      longitude: 104.9282,
      shopCategoryId: khmerFood.id,
      isOpen: true,
      isApproved: true,
    },
    create: {
      sellerId: seller.id,
      name: "KhmerFood Kitchen",
      description: "Authentic Cambodian home-style cooking.",
      addressText: "BKK1, Phnom Penh",
      latitude: 11.5564,
      longitude: 104.9282,
      shopCategoryId: khmerFood.id,
      isOpen: true,
      isApproved: true,
    },
  });

  // -------------------------
  // 4. Create second seller
  // -------------------------

  const jenniePasswordHash = await bcrypt.hash("Jennie123!", 12);

  const jennie = await prisma.user.upsert({
    where: {
      email: "jennie@byteme.test",
    },
    update: {
      name: "Kim Jennie",
      phone: "098765432",
      passwordHash: jenniePasswordHash,
      role: "SELLER",
    },
    create: {
      name: "Kim Jennie",
      email: "jennie@byteme.test",
      phone: "098765432",
      passwordHash: jenniePasswordHash,
      role: "SELLER",
    },
  });

  // -------------------------
  // 5. Create second seller's shop
  // -------------------------

  await prisma.shop.upsert({
    where: {
      sellerId: jennie.id,
    },
    update: {
      name: "Jeni's Bloom Tea",
      description:
        "Cute and refreshing tea, juice and drinks made for every mood.",
      addressText: "Toul Tom Poung, Phnom Penh",
      latitude: 11.5436,
      longitude: 104.9177,
      shopCategoryId: coffeeDrinks.id,
      isOpen: true,
      isApproved: true,
    },
    create: {
      sellerId: jennie.id,
      name: "Jeni's Bloom Tea",
      description:
        "Cute and refreshing tea, juice and drinks made for every mood.",
      addressText: "Toul Tom Poung, Phnom Penh",
      latitude: 11.5436,
      longitude: 104.9177,
      shopCategoryId: coffeeDrinks.id,
      isOpen: true,
      isApproved: true,
    },
  });

  // -------------------------
  // 6. Seed summary
  // -------------------------

  console.log("Seed completed successfully!");
  console.log("");

  console.log("Seller accounts:");

  console.log("1. Dara Sok");
  console.log("   Email: dara@byteme.test");
  console.log("   Password: ByteMe123!");
  console.log("   Shop: KhmerFood Kitchen");
  console.log("");

  console.log("2. Kim Jennie");
  console.log("   Email: jennie@byteme.test");
  console.log("   Password: Jennie123!");
  console.log("   Shop: Jeni's Bloom Tea");
  console.log("");

  console.log("Created:");
  console.log("- 2 sellers");
  console.log("- 2 shops");
  console.log("- 3 shop categories");
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
