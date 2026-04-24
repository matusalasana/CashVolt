
import { verifyToken } from "../utils/jwt.js"

export const protect = async (req, res, next) => {
  try {
    // 1. Get token
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Not authorized, no token",
      });
    }

    // 2. Verify token
    const decoded = await verifyToken(token);

    // 3. Attach user to request
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: error.message || "Invalid token",
    });
  }
};