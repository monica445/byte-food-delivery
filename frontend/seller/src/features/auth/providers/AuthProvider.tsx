import { useCallback, useMemo, useState, type ReactNode } from "react";
import { loginSeller, registerSeller } from "../api/Auth.api";
import type {
  AuthResponse,
  AuthUser,
  SignInInput,
  SignUpInput,
} from "../types/auth.types";
import { AuthContext, type AuthContextValue } from "./authContext";
import { ApiError } from "../http/http";

const STORAGE_KEY = "byteme.seller.session";

interface Session {
  user: AuthUser;
  token: string;
}

function readSession(): Session | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(readSession);

  const accept = useCallback((res: AuthResponse) => {
    if (res.user.role !== "SELLER") {
      throw new ApiError(
        "This is a customer account. Use a seller account to manage a shop.",
        403,
      );
    }

    const next: Session = {
      user: res.user,
      token: res.token,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setSession(next);
  }, []);

  const signIn = useCallback(
    async (input: SignInInput) => {
      accept(await loginSeller(input));
    },
    [accept],
  );

  const signUp = useCallback(
    async (input: SignUpInput) => {
      accept(await registerSeller(input));
    },
    [accept],
  );

  const signOut = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setSession(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user: session?.user ?? null,
      token: session?.token ?? null,
      signIn,
      signUp,
      signOut,
    }),
    [session, signIn, signUp, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
