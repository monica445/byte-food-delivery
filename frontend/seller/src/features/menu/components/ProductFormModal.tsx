import { useEffect, useState } from "react";
import type { Category, Product, ProductInput } from "../types/menu.types";
import { Modal } from "./Modal";

interface Props {
  open: boolean;
  product: Product | null; // null = create
  categories: Category[];
  defaultCategoryId?: string;
  onClose: () => void;
  onSubmit: (input: ProductInput) => Promise<void>;
}

const field =
  "w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/20";

export function ProductFormModal({
  open,
  product,
  categories,
  defaultCategoryId,
  onClose,
  onSubmit,
}: Props) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
    imageUrl: "",
    isAvailable: true,
  });
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    setForm({
      name: product?.name ?? "",
      description: product?.description ?? "",
      price: product ? String(product.price) : "",
      categoryId:
        product?.categoryId ?? defaultCategoryId ?? categories[0]?.id ?? "",
      imageUrl: product?.imageUrl ?? "",
      isAvailable: product?.isAvailable ?? true,
    });
    setError(null);
  }, [open, product, defaultCategoryId, categories]);

  const set =
    (k: "name" | "description" | "price" | "categoryId" | "imageUrl") =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setSaving(true);
      await onSubmit({
        name: form.name.trim(),
        description: form.description.trim() || undefined,
        price: Math.trunc(Number(form.price)),
        categoryId: form.categoryId,
        imageUrl: form.imageUrl.trim() || undefined,
        isAvailable: form.isAvailable,
      });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={product ? "Edit product" : "New product"}
    >
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          className={field}
          placeholder="Product name"
          value={form.name}
          onChange={set("name")}
        />
        <textarea
          className={field}
          rows={3}
          placeholder="Description (optional)"
          value={form.description}
          onChange={set("description")}
        />
        <div className="relative">
          <input
            className={`${field} pr-8`}
            type="number"
            min={0}
            step={1}
            placeholder="Price"
            value={form.price}
            onChange={set("price")}
          />
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
            ៛
          </span>
        </div>
        <select
          className={field}
          value={form.categoryId}
          onChange={set("categoryId")}
        >
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <input
          className={field}
          placeholder="Image URL (optional)"
          value={form.imageUrl}
          onChange={set("imageUrl")}
        />

        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={form.isAvailable}
            onChange={(e) =>
              setForm((f) => ({ ...f, isAvailable: e.target.checked }))
            }
            className="accent-brand-500"
          />
          Available to customers
        </label>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          disabled={
            saving || !form.name.trim() || form.price === "" || !form.categoryId
          }
          className="w-full rounded-xl bg-brand-500 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save"}
        </button>
      </form>
    </Modal>
  );
}
