import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Role } from "../../generated/prisma/client";
import { prisma } from "../lib/prisma";

const SALT_ROUNDS = 12;

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is missing from environment variables");
}

export class AuthError extends Error {
  constructor(
    message: string,
    public statusCode: number = 400,
  ) {
    super(message);
    this.name = "AuthError";
  }
}

function normalizePhone(phone: string): string {
  const value = phone.replace(/[\s()-]/g, "");

  if (value.startsWith("0")) {
    return `+855${value.slice(1)}`;
  }

  return value;
}

function isValidCambodianPhone(phone: string): boolean {
  const normalized = normalizePhone(phone);

  // Cambodian mobile numbers: +855 followed by 8 or 9 digits.
  return /^\+855\d{8,9}$/.test(normalized);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function createToken(userId: string, role: Role): string {
  return jwt.sign({ id: userId, role }, JWT_SECRET!, { expiresIn: "15m" });
}

export async function registerUser(data: {
  name: string;
  email: string;
  phone?: string;
  password: string;
}) {
  const name = data.name?.trim();
  const email = data.email?.trim().toLowerCase();
  const phone = data.phone?.trim();
  const password = data.password;

  if (!name || !email || !password) {
    throw new AuthError("Name, email, and password are required.");
  }

  if (!isValidEmail(email)) {
    throw new AuthError("Please provide a valid email address.");
  }

  if (password.length < 8) {
    throw new AuthError("Password must be at least 8 characters.");
  }

  let normalizedPhone: string | undefined;

  if (phone) {
    if (!isValidCambodianPhone(phone)) {
      throw new AuthError("Please provide a valid Cambodian phone number.");
    }

    normalizedPhone = normalizePhone(phone);
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email }, ...(normalizedPhone ? [{ phone: normalizedPhone }] : [])],
    },
  });

  if (existingUser) {
    throw new AuthError("Email or phone number is already registered.", 409);
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      phone: normalizedPhone,
      passwordHash,
      role: Role.CUSTOMER,
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      createdAt: true,
    },
  });

  return {
    user,
    token: createToken(user.id, user.role),
  };
}

export async function loginUser(data: {
  identifier: string;
  password: string;
}) {
  const identifier = data.identifier?.trim();
  const password = data.password;

  if (!identifier || !password) {
    throw new AuthError("Email or phone and password are required.");
  }

  const isEmail = identifier.includes("@");

  let normalizedIdentifier = identifier.toLowerCase();

  if (!isEmail) {
    if (!isValidCambodianPhone(identifier)) {
      throw new AuthError(
        "Please provide a valid email or Cambodian phone number.",
      );
    }

    normalizedIdentifier = normalizePhone(identifier);
  } else if (!isValidEmail(identifier)) {
    throw new AuthError("Please provide a valid email address.");
  }

  const user = await prisma.user.findFirst({
    where: isEmail
      ? { email: normalizedIdentifier }
      : { phone: normalizedIdentifier },
  });

  if (!user) {
    throw new AuthError("Invalid credentials.", 401);
  }

  const passwordMatches = await bcrypt.compare(password, user.passwordHash);

  if (!passwordMatches) {
    throw new AuthError("Invalid credentials.", 401);
  }

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    },
    token: createToken(user.id, user.role),
  };
}

export const getCurrentUser = async (userId: string) => {
  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      createdAt: true,
    },
  });
};
