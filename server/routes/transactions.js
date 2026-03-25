import express from "express"
import {
  getTransactions,
  getTransaction,
  addTransaction,
  updateTransaction,
  deleteTransaction,
  getSummary
} from "../controllers/transactions.js"
import { protect } from "../middleware/auth.js";
const router = express.Router()


router.get("/", protect, getTransactions)
router.get("/:id", protect, getTransaction)
router.post("/", protect, addTransaction)
router.put("/:id", protect, updateTransaction)
router.delete("/:id", protect, deleteTransaction)
router.get("/summary", protect, getSummary)

export default router