import { useEffect, useState } from "react";
import { Modal } from "./Modal";
import type { Category, CategoryInput } from "../types/menu.types";

interface Props {
  open: boolean;
  category: Category | null; // null = create
  onClose: () => void;
  onSubmit: (input: CategoryInput) => Promise<void>;
}

const field =
  "w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/20";

export function CategoryFormModal({
  open,
  category,
  onClose,
  onSubmit,
}: Props) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [sortOrder, setSortOrder] = useState("0");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      setName(category?.name ?? "");
      setImageUrl(category?.imageUrl ?? "");
      setSortOrder(String(category?.sortOrder ?? 0));
      setError(null);
    }
  }, [open, category]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setSaving(true);
      await onSubmit({
        name: name.trim(),
        imageUrl: imageUrl.trim() || undefined,
        sortOrder: Math.trunc(Number(sortOrder)) || 0,
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
      title={category ? "Edit category" : "New category"}
    >
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          autoFocus
          className={field}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Burgers"
        />
        <input
          className={field}
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Image URL (optional)"
        />
        <div>
          <label className="mb-1 block text-xs text-gray-500">
            Sort order (lower shows first)
          </label>
          <input
            className={field}
            type="number"
            step={1}
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          disabled={saving || !name.trim()}
          className="w-full rounded-xl bg-brand-500 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save"}
        </button>
      </form>
    </Modal>
  );
}
