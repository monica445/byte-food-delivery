import {
  useId,
  useState,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { ExclamationCircleFill, Eye, EyeSlash } from "react-bootstrap-icons";

interface TextInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "id"
> {
  label: string;
  error?: string;
  icon?: ReactNode;
}

export function TextInput({
  label,
  error,
  icon,
  type,
  className = "",
  ...rest
}: TextInputProps) {
  const id = useId();
  const [visible, setVisible] = useState(false);
  const isPassword = type === "password";

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold">
        {label}
      </label>

      <div className="relative">
        {icon && (
          <span
            className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-neutral-400"
            aria-hidden
          >
            {icon}
          </span>
        )}

        <input
          id={id}
          type={isPassword && visible ? "text" : type}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={[
            "h-13 w-full rounded-full border bg-white text-sm transition outline-none",
            "placeholder:text-neutral-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/20",
            icon ? "pl-11" : "pl-5",
            isPassword ? "pr-13" : "pr-5",
            error
              ? "border-red-500"
              : "border-neutral-200 hover:border-neutral-300",
            className,
          ].join(" ")}
          {...rest}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? "Hide password" : "Show password"}
            className="absolute top-1/2 right-2 grid size-9 -translate-y-1/2 place-items-center rounded-full text-neutral-500 transition hover:bg-brand-50 hover:text-brand-600 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:outline-none"
          >
            {visible ? <EyeSlash /> : <Eye />}
          </button>
        )}
      </div>

      {error && (
        <p
          id={`${id}-error`}
          className="mt-1.5 flex items-center gap-1.5 pl-5 text-xs text-red-600"
        >
          <ExclamationCircleFill aria-hidden /> {error}
        </p>
      )}
    </div>
  );
}
