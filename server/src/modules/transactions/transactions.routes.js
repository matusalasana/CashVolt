import express from "express";
import {
  getTransactions,
  createTransaction,
  deleteTransaction
} from "./transactions.controller.js";

import { protect } from "../../middleware/auth.middleware.js";

const router = express.Router();

// protect all routes
router.use(protect);

router.get("/", getTransactions);
router.post("/", createTransaction);
router.delete("/:id", deleteTransaction);

export default router;