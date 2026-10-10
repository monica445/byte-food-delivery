import type { Category } from "../types/menu.types";

interface Props {
  category: Category;
  count: number;
  active: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function CategoryItem({
  category,
  count,
  active,
  onSelect,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div
      onClick={onSelect}
      className={`group flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 text-sm transition ${
        active
          ? "bg-brand-50 font-semibold text-brand-700"
          : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      <span className="truncate">
        {category.name}
        <span className="ml-2 text-xs font-normal text-gray-400">{count}</span>
      </span>

      <span className="flex gap-1 opacity-0 transition group-hover:opacity-100">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="rounded px-1.5 text-xs text-navy hover:bg-white"
        >
          Edit
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="rounded px-1.5 text-xs text-red-600 hover:bg-white"
        >
          Delete
        </button>
      </span>
    </div>
  );
}
