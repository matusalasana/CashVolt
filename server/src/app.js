import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";

import authRoutes from "./modules/auth/auth.routes.js";
import accountsRoutes from "./modules/accounts/accounts.routes.js";
import categoriesRoutes from "./modules/categories/categories.routes.js";
import transactionsRoutes from "./modules/transactions/transactions.routes.js";
import budgetsRoutes from "./modules/budgets/budgets.routes.js";
import savingsRoutes from "./modules/savings/savings.routes.js";
import analyticsRoutes from "./modules/analytics/analytics.routes.js";
import usersRoutes from "./modules/users/users.routes.js";
import {FRONTEND_URL, FRONTEND_LOCALHOST_URL  } from "./config/env.js";


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
    origin: [ FRONTEND_URL, FRONTEND_LOCALHOST_URL ],
    credentials: true,
  })
);


app.use("/api/accounts", accountsRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionsRoutes);
app.use("/api/budgets", budgetsRoutes);
app.use("/api/savings", savingsRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/users", usersRoutes);


export default app;