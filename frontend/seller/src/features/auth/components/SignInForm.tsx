import { useState, type FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BoxArrowInRight, Lock, Person } from "react-bootstrap-icons";
import { Button } from "./Button";
import { Alert } from "./Alert";
import { ApiError } from "../http/http";
import { useAuth } from "../hooks/useAuth";
import { validateSignIn, type FieldErrors } from "../utils/validate";
import { TextInput } from "./TextInput";

export function SignInForm() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo =
    (location.state as { from?: { pathname: string } } | null)?.from
      ?.pathname ?? "/";

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FieldErrors<"identifier" | "password">>(
    {},
  );
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError("");

    const found = validateSignIn({ identifier, password });
    setErrors(found);
    if (Object.keys(found).length) return;

    setLoading(true);
    try {
      await signIn({ identifier, password });
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setFormError(
        err instanceof ApiError
          ? err.message
          : "Something went wrong. Try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <TextInput
        label="Email/Phone"
        icon={<Person />}
        placeholder="Enter your email or phone number"
        autoComplete="username"
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
        error={errors.identifier}
      />
      <TextInput
        label="Password"
        type="password"
        icon={<Lock />}
        placeholder="Enter password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
      />

      {formError && <Alert>{formError}</Alert>}

      <Button
        type="submit"
        loading={loading}
        icon={<BoxArrowInRight aria-hidden />}
        className="mt-3"
      >
        {loading ? "Signing in…" : "Sign In"}
      </Button>
    </form>
  );
}
