import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  try {
    // 1. Get token from headers
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Format: "Bearer TOKEN"
    const token = authHeader.split(" ")[1];

    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Attach user info to request
    req.user = decoded;

    next(); // move to next (your route)

  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};