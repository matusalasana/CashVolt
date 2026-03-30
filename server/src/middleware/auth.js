import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  try {
    // 1. Get token from cookie
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Attach user info to request
    req.user = decoded;

    next(); // allow request

  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};