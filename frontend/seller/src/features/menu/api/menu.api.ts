import { del, get, patch, post } from "../../../shared/api/http";

import type {
  Category,
  CategoryInput,
  Product,
  ProductInput,
  Shop,
} from "../types/menu.types";

export async function fetchMyShop(token: string) {
  const response = await get<{ shop: Shop }>("/shops/me", token);

  return response.shop;
}

export async function fetchCategories(shopId: string) {
  const response = await get<{ categories: Category[] }>(
    `/shops/${shopId}/categories`,
  );

  return response.categories;
}

export async function fetchProducts(shopId: string) {
  const response = await get<{ products: Product[] }>(
    `/shops/${shopId}/products`,
  );
  return response.products;
}

export function createCategory(token: string, input: CategoryInput) {
  return post("/seller/categories", input, token);
}

export function updateCategory(
  token: string,
  id: string,
  input: Partial<CategoryInput>,
) {
  return patch(`/seller/categories/${id}`, input, token);
}

export function deleteCategory(token: string, id: string) {
  return del(`/seller/categories/${id}`, token);
}

// Seller: products
export function createProduct(token: string, input: ProductInput) {
  return post("/seller/products", input, token);
}

export function updateProduct(
  token: string,
  id: string,
  input: Partial<ProductInput>,
) {
  return patch(`/seller/products/${id}`, input, token);
}

export function deleteProduct(token: string, id: string) {
  return del(`/seller/products/${id}`, token);
}
