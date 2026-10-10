import { post } from "../../../shared/api/http";

import type {
  AuthResponse,
  SignInInput,
  SignUpInput,
} from "../types/auth.types";

export function registerSeller(input: SignUpInput) {
  return post<AuthResponse>("/auth/register", {
    name: input.fullName.trim(),
    email: input.email.trim().toLowerCase(),
    password: input.password,
    role: "SELLER",
  });
}

export function loginSeller(input: SignInInput) {
  return post<AuthResponse>("/auth/login", {
    identifier: input.identifier.trim(),
    password: input.password,
  });
}
