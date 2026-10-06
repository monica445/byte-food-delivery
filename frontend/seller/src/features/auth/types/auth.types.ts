export type Role = "CUSTOMER" | "SELLER";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: Role;
}

export interface AuthResponse {
  message: string;
  user: AuthUser;
  token: string;
}

export interface SignInInput {
  identifier: string; // email or phone
  password: string;
}

export interface SignUpInput {
  fullName: string;
  email: string;
  password: string;
}
