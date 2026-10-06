import type { Request, Response } from "express";
import { AuthError, registerUser, loginUser } from "../services/auth.service";

export async function register(req: Request, res: Response) {
  try {
    const result = await registerUser(req.body);

    return res.status(201).json({
      message: "Registration successful.",
      ...result,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return res.status(error.statusCode).json({
        message: error.message,
      });
    }

    console.error("Registration error:", error);

    return res.status(500).json({
      message: "Something went wrong.",
    });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const result = await loginUser(req.body);

    return res.status(200).json({
      message: "Login successful.",
      ...result,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return res.status(error.statusCode).json({
        message: error.message,
      });
    }

    console.error("Login error:", error);

    return res.status(500).json({
      message: "Something went wrong.",
    });
  }
}
