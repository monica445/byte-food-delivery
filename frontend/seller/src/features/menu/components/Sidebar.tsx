import { NavLink } from "react-router-dom";

import { useAuth } from "../../auth/hooks/useAuth";

const tabs = [
  { to: "/dashboard/menu", label: "Menu", icon: "bi bi-shop" },
  { to: "/dashboard/orders", label: "Orders", icon: "bi bi-receipt" },
  { to: "/dashboard/account", label: "Account", icon: "bi bi-person" },
];

export function Sidebar() {
  const { user, signOut } = useAuth();

  const initial =
    (user as { name?: string } | null)?.name?.[0]?.toUpperCase() ?? "S";

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-gray-200 bg-white p-4">
      {/* Profile */}
      <div className="mb-6 flex items-center gap-3 rounded-2xl bg-brand-50 p-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-500 font-semibold text-white">
          {initial}
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-ink">
            {(user as { name?: string } | null)?.name ?? "Seller"}
          </p>

          <p className="truncate text-xs text-gray-500">
            {(user as { email?: string } | null)?.email}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <nav className="flex flex-1 flex-col gap-1">
        {tabs.map((t) => (
          <NavLink
            key={t.to}
            to={t.to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                isActive
                  ? "bg-brand-500 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <i className={`${t.icon} text-base`} />
            {t.label}
          </NavLink>
        ))}
      </nav>

      <button
        onClick={signOut}
        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-gray-500 hover:bg-gray-100 hover:text-ink"
      >
        <i className="bi bi-box-arrow-right text-base" />
        Sign out
      </button>
    </aside>
  );
}
