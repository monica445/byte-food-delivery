import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

type UserRole = "CUSTOMER" | "SELLER";

interface TokenPayload {
  id: string;
  role: UserRole;
}

export interface AuthRequest extends Request {
  user?: TokenPayload;
}

export function authenticate(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  console.log("auth header:", req.headers.authorization);
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Authentication required",
    });
  }

  const token = authHeader.slice(7);
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    console.error("JWT_SECRET is not configured");
    return res.status(500).json({
      message: "Internal server error",
    });
  }

  try {
    const decoded = jwt.verify(token, secret);

    if (
      typeof decoded === "string" ||
      typeof decoded.id !== "string" ||
      !["CUSTOMER", "SELLER"].includes(decoded.role as string)
    ) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }

    req.user = {
      id: decoded.id,
      role: decoded.role as UserRole,
    };

    next();
  } catch {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
}

export function requireRole(role: UserRole) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    if (req.user.role !== role) {
      return res.status(403).json({
        message: "You do not have permission to access this resource",
      });
    }

    next();
  };
}
