import type { ReactNode } from "react";
import { ExclamationTriangleFill } from "react-bootstrap-icons";

export function Alert({ children }: { children: ReactNode }) {
  return (
    <div
      role="alert"
      className="flex items-start gap-2.5 rounded-2xl bg-brand-50 px-4 py-3 text-sm text-red-700"
    >
      <ExclamationTriangleFill className="mt-0.5 shrink-0" aria-hidden />
      <p>{children}</p>
    </div>
  );
}
