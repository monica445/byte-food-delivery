import type { Product } from "../types/menu.types";
import { formatPrice } from "../utils/format";

interface Props {
  product: Product;
  categoryName?: string;
  onEdit: () => void;
  onDelete: () => void;
  onToggleAvailable: () => void;
}

export function ProductCard({
  product,
  categoryName,
  onEdit,
  onDelete,
  onToggleAvailable,
}: Props) {
  return (
    <div
      className={`flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:shadow-md ${
        product.isAvailable ? "" : "opacity-70"
      }`}
    >
      <div className="relative aspect-4/3 w-full bg-brand-50">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-3xl text-gray-400">
            <i className="bi bi-fork-knife" />
          </div>
        )}
        {!product.isAvailable && (
          <span className="absolute left-2 top-2 rounded-full bg-ink/80 px-2.5 py-1 text-xs font-medium text-white">
            Unavailable
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 p-4">
        {categoryName && (
          <span className="text-xs font-medium text-navy">{categoryName}</span>
        )}
        <h3 className="font-semibold text-ink">{product.name}</h3>
        {product.description && (
          <p className="line-clamp-2 text-sm text-gray-500">
            {product.description}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="font-semibold text-brand-600">
            {formatPrice(product.price)}
          </span>
          <label className="flex cursor-pointer items-center gap-2 text-xs text-gray-500">
            <input
              type="checkbox"
              checked={product.isAvailable}
              onChange={onToggleAvailable}
              className="accent-brand-500"
            />
            Available
          </label>
        </div>

        <div className="flex gap-2 pt-2 text-sm">
          <button
            onClick={onEdit}
            className="rounded-lg px-2 py-1 text-navy hover:bg-gray-100"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="rounded-lg px-2 py-1 text-red-600 hover:bg-red-50"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
