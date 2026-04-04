import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in .env file");
}

// Create token
export const signToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d",
  });
};

// Verify token
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};