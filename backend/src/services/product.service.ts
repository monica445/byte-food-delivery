import { prisma } from "../lib/prisma";

export async function getShopProducts(shopId: string) {
  return prisma.product.findMany({
    where: {
      shopId,
      isAvailable: true,
      shop: {
        isApproved: true,
      },
    },
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getCategoryProducts(categoryId: string) {
  return prisma.product.findMany({
    where: {
      categoryId,
      isAvailable: true,
      shop: {
        isApproved: true,
      },
    },
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getProductById(productId: string) {
  const product = await prisma.product.findFirst({
    where: {
      id: productId,
      isAvailable: true,
      shop: {
        isApproved: true,
      },
    },
    include: {
      category: true,
      shop: true,
    },
  });

  if (!product) {
    throw new Error("PRODUCT_NOT_FOUND");
  }

  return product;
}

export async function createProduct(
  sellerId: string,
  data: {
    categoryId: string;
    name: string;
    description?: string;
    price: number;
    imageUrl?: string;
    isAvailable?: boolean;
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
    throw new Error("INVALID_PRODUCT_NAME");
  }

  if (!Number.isInteger(data.price) || data.price < 0) {
    throw new Error("INVALID_PRODUCT_PRICE");
  }

  // Make sure the category belongs to this seller's shop
  const category = await prisma.category.findFirst({
    where: {
      id: data.categoryId,
      shopId: shop.id,
    },
  });

  if (!category) {
    throw new Error("CATEGORY_NOT_FOUND");
  }

  return prisma.product.create({
    data: {
      shopId: shop.id,
      categoryId: category.id,
      name,
      description: data.description?.trim() || null,
      price: data.price,
      imageUrl: data.imageUrl?.trim() || null,
      isAvailable: data.isAvailable ?? true,
    },
    include: {
      category: true,
    },
  });
}

export async function updateProduct(
  sellerId: string,
  productId: string,
  data: {
    categoryId?: string;
    name?: string;
    description?: string;
    price?: number;
    imageUrl?: string;
    isAvailable?: boolean;
  },
) {
  const product = await prisma.product.findFirst({
    where: {
      id: productId,
      shop: {
        sellerId,
      },
    },
  });

  if (!product) {
    throw new Error("PRODUCT_NOT_FOUND");
  }

  if (data.name !== undefined && !data.name.trim()) {
    throw new Error("INVALID_PRODUCT_NAME");
  }

  if (
    data.price !== undefined &&
    (!Number.isInteger(data.price) || data.price < 0)
  ) {
    throw new Error("INVALID_PRODUCT_PRICE");
  }

  if (data.categoryId !== undefined) {
    const category = await prisma.category.findFirst({
      where: {
        id: data.categoryId,
        shopId: product.shopId,
      },
    });

    if (!category) {
      throw new Error("CATEGORY_NOT_FOUND");
    }
  }

  return prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      ...(data.categoryId !== undefined && {
        categoryId: data.categoryId,
      }),

      ...(data.name !== undefined && {
        name: data.name.trim(),
      }),

      ...(data.description !== undefined && {
        description: data.description.trim() || null,
      }),

      ...(data.price !== undefined && {
        price: data.price,
      }),

      ...(data.imageUrl !== undefined && {
        imageUrl: data.imageUrl.trim() || null,
      }),

      ...(data.isAvailable !== undefined && {
        isAvailable: data.isAvailable,
      }),
    },
    include: {
      category: true,
    },
  });
}

export async function deleteProduct(sellerId: string, productId: string) {
  const product = await prisma.product.findFirst({
    where: {
      id: productId,
      shop: {
        sellerId,
      },
    },
  });

  if (!product) {
    throw new Error("PRODUCT_NOT_FOUND");
  }

  // Better for a food delivery app:
  // keep the product because old orders may reference it.
  await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      isAvailable: false,
    },
  });

  return {
    message: "Product removed successfully.",
  };
}
