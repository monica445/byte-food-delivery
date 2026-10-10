import type { ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowRepeat } from "react-bootstrap-icons";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  icon?: ReactNode;
}

export function Button({
  loading,
  icon,
  disabled,
  children,
  className = "",
  ...rest
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={`inline-flex h-13 w-full items-center justify-center gap-2 rounded-full bg-brand-500 text-base font-bold text-white transition hover:bg-brand-600 focus-visible:ring-4 focus-visible:ring-brand-500/40 focus-visible:outline-none active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70 ${className}`}
      {...rest}
    >
      {loading ? <ArrowRepeat className="animate-spin" aria-hidden /> : icon}
      {children}
    </button>
  );
}
