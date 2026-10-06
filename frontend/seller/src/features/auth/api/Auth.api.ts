import { post } from "../http/http";
import type {
  AuthResponse,
  SignInInput,
  SignUpInput,
} from "../types/auth.types";
import { isEmail } from "../utils/validate";

export function registerSeller(input: SignUpInput) {
  return post<AuthResponse>("/auth/register", {
    name: input.fullName.trim(),
    email: input.email.trim().toLowerCase(),
    password: input.password,
    role: "SELLER",
  });
}

export function loginSeller(input: SignInInput) {
  const value = input.identifier.trim();
  const contact = isEmail(value)
    ? { email: value.toLowerCase() }
    : { phone: value.replace(/[\s-]/g, "") };

  return post<AuthResponse>("/auth/login", {
    ...contact,
    password: input.password,
  });
}
