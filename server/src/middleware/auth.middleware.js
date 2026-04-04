import jwt from "jsonwebtoken";
import { verifyToken } from "../utils/jwt.js"

export const protect = (req, res, next) => {
  try {
    // 1. Get token
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Not authorized, no token",
      });
    }

    // 2. Verify token
    const decoded = verifyToken(token);

    // 3. Attach user to request
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};