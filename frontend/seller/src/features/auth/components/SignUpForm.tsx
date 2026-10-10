import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Envelope, Lock, Person, PersonPlus } from "react-bootstrap-icons";
import { Button } from "./Button";
import { Alert } from "./Alert";
import { ApiError } from "../../../shared/api/http";
import { useAuth } from "../hooks/useAuth";
import { validateSignUp, type FieldErrors } from "../utils/validate";
import { TextInput } from "./TextInput";

export function SignUpForm() {
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<
    FieldErrors<"fullName" | "email" | "password">
  >({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError("");

    const found = validateSignUp({ fullName, email, password });
    setErrors(found);
    if (Object.keys(found).length) return;

    setLoading(true);
    try {
      await signUp({ fullName, email, password });
      navigate("/", { replace: true });
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
        label="Full Name"
        icon={<Person />}
        placeholder="Enter your full name"
        autoComplete="name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        error={errors.fullName}
      />
      <TextInput
        label="Email"
        type="email"
        icon={<Envelope />}
        placeholder="Enter your email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
      />
      <TextInput
        label="Password"
        type="password"
        icon={<Lock />}
        placeholder="At least 8 characters"
        autoComplete="new-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
      />

      {formError && <Alert>{formError}</Alert>}

      <Button
        type="submit"
        loading={loading}
        icon={<PersonPlus aria-hidden />}
        className="mt-3"
      >
        {loading ? "Creating account…" : "Sign Up"}
      </Button>
    </form>
  );
}
