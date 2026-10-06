import { BoxArrowRight, Shop } from "react-bootstrap-icons";
import { useAuth } from "../hooks/useAuth";

export default function DashboardPage() {
  const { user, signOut } = useAuth();

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-4 px-6 text-center">
      <span className="grid size-14 place-items-center rounded-full bg-brand-50 text-2xl text-brand-500">
        <Shop aria-hidden />
      </span>
      <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
      <p className="text-neutral-500">Your shop dashboard goes here.</p>
      <button
        onClick={signOut}
        className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-5 py-2.5 text-sm font-semibold transition hover:border-brand-500 hover:text-brand-600"
      >
        <BoxArrowRight aria-hidden /> Sign out
      </button>
    </main>
  );
}
