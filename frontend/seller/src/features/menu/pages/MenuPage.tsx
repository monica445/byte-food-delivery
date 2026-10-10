import { useMemo, useState } from "react";
import { useMenu } from "../hooks/useMenu";
import type { Category, Product } from "../types/menu.types";
import { SearchBar } from "../components/SearchBar";
import { CategoryItem } from "../components/CategoryItem";
import { ProductCard } from "../components/ProductCard";
import { CategoryFormModal } from "../components/CategoryFormModal";
import { ProductFormModal } from "../components/ProductFormModal";
import type { CategoryInput } from "../types/menu.types";

export default function MenuPage() {
  const menu = useMenu();

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [actionError, setActionError] = useState<string | null>(null);

  const [categoryModal, setCategoryModal] = useState<{
    open: boolean;
    category: Category | null;
  }>({
    open: false,
    category: null,
  });
  const [productModal, setProductModal] = useState<{
    open: boolean;
    product: Product | null;
  }>({
    open: false,
    product: null,
  });

  const categoryName = useMemo(
    () => Object.fromEntries(menu.categories.map((c) => [c.id, c.name])),
    [menu.categories],
  );

  const counts = useMemo(() => {
    const m: Record<string, number> = {};
    menu.products.forEach(
      (p) => (m[p.categoryId] = (m[p.categoryId] ?? 0) + 1),
    );
    return m;
  }, [menu.products]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return menu.products.filter(
      (p) =>
        (activeCategory === "all" || p.categoryId === activeCategory) &&
        (!q ||
          p.name.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)),
    );
  }, [menu.products, activeCategory, query]);

  async function run(fn: () => Promise<unknown>) {
    try {
      setActionError(null);
      await fn();
    } catch (e) {
      setActionError(e instanceof Error ? e.message : "Something went wrong.");
    }
  }

  const handleDeleteCategory = (c: Category) =>
    window.confirm(`Delete category "${c.name}"?`) &&
    run(async () => {
      await menu.removeCategory(c.id);
      if (activeCategory === c.id) setActiveCategory("all");
    });

  const handleDeleteProduct = (p: Product) =>
    window.confirm(`Delete "${p.name}"?`) &&
    run(() => menu.removeProduct(p.id));

  if (!menu.shop && !menu.loading) {
    return (
      <p className="text-gray-500">No shop is linked to this account yet.</p>
    );
  }

  const handleToggleAvailable = (p: Product) =>
    run(() => menu.editProduct(p.id, { isAvailable: !p.isAvailable }));

  console.log(menu.products);

  return (
    <div className="mx-auto max-w-6xl">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ink">Menu</h1>
          <p className="text-sm text-gray-500">
            Manage your categories and products.
          </p>
        </div>
        <button
          disabled={menu.categories.length === 0}
          onClick={() => setProductModal({ open: true, product: null })}
          title={
            menu.categories.length === 0 ? "Create a category first" : undefined
          }
          className="rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:opacity-50"
        >
          + Add product
        </button>
      </div>

      <div className="mb-6 max-w-md">
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Search products…"
        />
      </div>

      {(menu.error || actionError) && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {actionError ?? menu.error}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        {/* Categories */}
        <section className="h-fit rounded-2xl border border-gray-200 bg-white p-3">
          <div className="mb-2 flex items-center justify-between px-3 pt-1">
            <h2 className="text-sm font-semibold text-navy">Categories</h2>
            <button
              onClick={() => setCategoryModal({ open: true, category: null })}
              className="text-sm font-medium text-brand-600 hover:text-brand-700"
            >
              + New
            </button>
          </div>

          <div
            onClick={() => setActiveCategory("all")}
            className={`flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 text-sm transition ${
              activeCategory === "all"
                ? "bg-brand-50 font-semibold text-brand-700"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            All products
            <span className="text-xs font-normal text-gray-400">
              {menu.products.length}
            </span>
          </div>

          {menu.categories.map((c) => (
            <CategoryItem
              key={c.id}
              category={c}
              count={counts[c.id] ?? 0}
              active={activeCategory === c.id}
              onSelect={() => setActiveCategory(c.id)}
              onEdit={() => setCategoryModal({ open: true, category: c })}
              onDelete={() => handleDeleteCategory(c)}
            />
          ))}
        </section>

        {/* Products */}
        <section>
          {menu.loading ? (
            <p className="text-sm text-gray-500">Loading menu…</p>
          ) : visible.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center text-sm text-gray-500">
              {query
                ? "No products match your search."
                : "No products here yet."}
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {visible.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  categoryName={
                    activeCategory === "all"
                      ? categoryName[p.categoryId]
                      : undefined
                  }
                  onEdit={() => setProductModal({ open: true, product: p })}
                  onDelete={() => handleDeleteProduct(p)}
                  onToggleAvailable={() => handleToggleAvailable(p)}
                />
              ))}
            </div>
          )}
        </section>
      </div>

      <CategoryFormModal
        open={categoryModal.open}
        category={categoryModal.category}
        onClose={() => setCategoryModal({ open: false, category: null })}
        onSubmit={(input: CategoryInput) =>
          categoryModal.category
            ? menu.editCategory(categoryModal.category.id, input)
            : menu.addCategory(input)
        }
      />

      <ProductFormModal
        open={productModal.open}
        product={productModal.product}
        categories={menu.categories}
        defaultCategoryId={
          activeCategory === "all" ? undefined : activeCategory
        }
        onClose={() => setProductModal({ open: false, product: null })}
        onSubmit={(input) =>
          productModal.product
            ? menu.editProduct(productModal.product.id, input)
            : menu.addProduct(input)
        }
      />
    </div>
  );
}
