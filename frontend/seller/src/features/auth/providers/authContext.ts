import { createContext } from "react";
import type { AuthUser, SignInInput, SignUpInput } from "../types/auth.types";

export interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  signIn: (input: SignInInput) => Promise<void>;
  signUp: (input: SignUpInput) => Promise<void>;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
