import { useCallback, useEffect, useState } from "react";

import * as api from "../api/menu.api";
import type {
  Category,
  CategoryInput,
  Product,
  ProductInput,
  Shop,
} from "../types/menu.types";
import { useAuth } from "../../auth/hooks/useAuth";

export function useMenu() {
  const { token } = useAuth();

  const [shop, setShop] = useState<Shop | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Get seller's shop
      const myShop = await api.fetchMyShop(token);

      // Get shop categories + seller's products
      const [shopCategories, myProducts] = await Promise.all([
        api.fetchCategories(myShop.id),
        api.fetchProducts(myShop.id),
      ]);

      setShop(myShop);

      setCategories(
        [...shopCategories].sort(
          (a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name),
        ),
      );

      setProducts(myProducts);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to load menu.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    load();
  }, [load]);

  const mutate = useCallback(
    async (fn: () => Promise<unknown>) => {
      await fn();
      await load();
    },
    [load],
  );

  return {
    shop,
    categories,
    products,
    loading,
    error,

    addCategory: (input: CategoryInput) =>
      mutate(() => api.createCategory(token!, input)),

    editCategory: (id: string, input: Partial<CategoryInput>) =>
      mutate(() => api.updateCategory(token!, id, input)),

    removeCategory: (id: string) =>
      mutate(() => api.deleteCategory(token!, id)),

    addProduct: (input: ProductInput) =>
      mutate(() => api.createProduct(token!, input)),

    editProduct: (id: string, input: Partial<ProductInput>) =>
      mutate(() => api.updateProduct(token!, id, input)),

    removeProduct: (id: string) => mutate(() => api.deleteProduct(token!, id)),
  };
}
