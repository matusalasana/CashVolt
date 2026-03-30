// server.js
import { testDBConnection } from "./config/db.js"
import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import rateLimit from "express-rate-limit";

// Routes
import authRoutes from "./routes/auth.js"
import accountsRoutes from "./routes/accounts.js"
import categoriesRoutes from "./routes/categories.js"
import transactionsRoutes from "./routes/transactions.js";

dotenv.config()

const PORT = process.env.PORT || 3000
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
const app = express()

// Middlewares 
app.use(express.json())
app.use(cookieParser())
app.use(limiter);
app.use(cors({
  origin: "http://localhost:5173", // my frontend URL
  credentials: true
}));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/accounts", accountsRoutes)
app.use("/api/categories", categoriesRoutes);
app.use("/api/transactions", transactionsRoutes)

// Server
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
  testDBConnection()
});