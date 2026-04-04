import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";

import authRoutes from "./modules/auth/auth.routes.js";
import { protect } from "./middleware/auth.middleware.js"
const app = express();

// Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(limiter);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Health check
app.get("/health", (req, res) => {
  res.json({ message: "API is running" });
});

app.use("/api/auth", authRoutes);

export default app;