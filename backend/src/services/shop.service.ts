import { prisma } from "../lib/prisma";

export async function getMyShop(sellerId: string) {
  const shop = await prisma.shop.findUnique({
    where: { sellerId },
  });

  if (!shop) {
    throw new Error("SHOP_NOT_FOUND");
  }

  return shop;
}

export async function getShopProducts(sellerId: string) {
  const shop = await prisma.shop.findUnique({
    where: { sellerId },
    select: { id: true },
  });

  if (!shop) {
    throw new Error("SHOP_NOT_FOUND");
  }

  const products = await prisma.product.findMany({
    where: { shopId: shop.id },
  });

  console.log("Seller ID:", sellerId);
  console.log("Shop ID:", shop.id);
  console.log("Products found:", products.length);

  return products;
}
