import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 3000;
export const FRONTEND_URL = process.env.FRONTEND_URL || "https://cash-volt.vercel.app";
export const FRONTEND_LOCALHOST_URL = process.env.FRONTEND_LOCALHOST_URL || "http://localhost:5173";
export const DATABASE_URL = process.env.DATABASE_URL;
export const JWT_SECRET = process.env.JWT_SECRET;