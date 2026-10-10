import { prisma } from "../lib/prisma";

export async function getShopCategories(shopId: string) {
  return prisma.category.findMany({
    where: {
      shopId,
      shop: {
        isApproved: true,
      },
    },
    orderBy: {
      sortOrder: "asc",
    },
  });
}

export async function createCategory(
  sellerId: string,
  data: {
    name: string;
    imageUrl?: string;
    sortOrder?: number;
  },
) {
  const shop = await prisma.shop.findUnique({
    where: {
      sellerId,
    },
  });

  if (!shop) {
    throw new Error("SHOP_NOT_FOUND");
  }

  const name = data.name.trim();

  if (!name) {
    throw new Error("INVALID_CATEGORY_NAME");
  }

  return prisma.category.create({
    data: {
      shopId: shop.id,
      name,
      imageUrl: data.imageUrl?.trim() || null,
      sortOrder: data.sortOrder ?? 0,
    },
  });
}

export async function updateCategory(
  sellerId: string,
  categoryId: string,
  data: {
    name?: string;
    imageUrl?: string;
    sortOrder?: number;
  },
) {
  const category = await prisma.category.findFirst({
    where: {
      id: categoryId,
      shop: {
        sellerId,
      },
    },
  });

  if (!category) {
    throw new Error("CATEGORY_NOT_FOUND");
  }

  const name = data.name?.trim();

  if (data.name !== undefined && !name) {
    throw new Error("INVALID_CATEGORY_NAME");
  }

  return prisma.category.update({
    where: {
      id: categoryId,
    },
    data: {
      ...(name !== undefined && {
        name,
      }),

      ...(data.imageUrl !== undefined && {
        imageUrl: data.imageUrl.trim() || null,
      }),

      ...(data.sortOrder !== undefined && {
        sortOrder: data.sortOrder,
      }),
    },
  });
}

export async function deleteCategory(sellerId: string, categoryId: string) {
  const category = await prisma.category.findFirst({
    where: {
      id: categoryId,
      shop: {
        sellerId,
      },
    },
    include: {
      _count: {
        select: {
          products: true,
        },
      },
    },
  });

  if (!category) {
    throw new Error("CATEGORY_NOT_FOUND");
  }

  if (category._count.products > 0) {
    throw new Error("CATEGORY_HAS_PRODUCTS");
  }

  await prisma.category.delete({
    where: {
      id: categoryId,
    },
  });

  return {
    message: "Category deleted successfully.",
  };
}
