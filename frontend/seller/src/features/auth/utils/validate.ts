import type { SignInInput, SignUpInput } from "../types/auth.types";

export type FieldErrors<K extends string> = Partial<Record<K, string>>;

export const isEmail = (v: string) => /^\S+@\S+\.\S+$/.test(v.trim());
export const isPhone = (v: string) => /^\+?[0-9\s-]{8,15}$/.test(v.trim());

export function validateSignIn(v: SignInInput): FieldErrors<keyof SignInInput> {
  const errors: FieldErrors<keyof SignInInput> = {};
  if (!v.identifier.trim())
    errors.identifier = "Enter your email or phone number.";
  else if (!isEmail(v.identifier) && !isPhone(v.identifier))
    errors.identifier = "Enter a valid email or phone number.";
  if (!v.password) errors.password = "Enter your password.";
  return errors;
}

export function validateSignUp(v: SignUpInput): FieldErrors<keyof SignUpInput> {
  const errors: FieldErrors<keyof SignUpInput> = {};
  if (v.fullName.trim().length < 2) errors.fullName = "Enter your full name.";
  if (!isEmail(v.email)) errors.email = "Enter a valid email address.";
  if (v.password.length < 8) errors.password = "Use at least 8 characters.";
  return errors;
}
