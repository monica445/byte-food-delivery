import type { ReactNode } from "react";
import { Bicycle, ListUl, Receipt } from "react-bootstrap-icons";
import logo from "../../../assets/logo.png";

const highlights = [
  { icon: Receipt, text: "Accept and track incoming orders" },
  { icon: ListUl, text: "Keep your menu and prices up to date" },
  { icon: Bicycle, text: "Follow every delivery to the door" },
];

interface AuthLayoutProps {
  title: string;
  children: ReactNode;
  footer: ReactNode;
}

export function AuthLayout({ title, children, footer }: AuthLayoutProps) {
  return (
    <main className="flex min-h-screen flex-col bg-brand-500 lg:flex-row">
      <aside className="flex min-h-60 flex-col items-center justify-center gap-10 px-6 pt-10 pb-20 text-white lg:min-h-screen lg:flex-[1_1_52%] lg:pr-24 lg:pb-10">
        <img src={logo} alt="Logo" className="h-16 w-16" />

        <div className="hidden max-w-sm lg:block">
          <h2 className="mb-6 text-2xl font-bold">
            Run your shop from one place
          </h2>
          <ul className="space-y-4">
            {highlights.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3 font-medium">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white/15">
                  <Icon aria-hidden />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <section className="-mt-12 flex flex-1 justify-center bg-white px-6 pt-10 pb-8 [border-radius:50%_50%_0_0/56px_56px_0_0] lg:mt-0 lg:-ml-16 lg:flex-[1_1_48%] lg:items-center lg:py-16 lg:pr-16 lg:pl-28 lg:[border-radius:64px_0_0_64px/50%_0_0_50%]">
        <div className="w-full max-w-sm">
          <h1 className="mb-8 text-2xl font-bold tracking-tight lg:text-3xl">
            {title}
          </h1>
          {children}
          <p className="mt-7 text-center text-sm">{footer}</p>
        </div>
      </section>
    </main>
  );
}
