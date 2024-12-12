import { Response } from "express";
import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = async (res: Response, userId: string): Promise<void> => {
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("No JWT_SECRET provided");

    const token = jwt.sign({ userId }, secret, {
      expiresIn: "15d",
    });
    res.cookie("token", token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    });
  } catch (error: unknown) {
    throw error;
  }
};
