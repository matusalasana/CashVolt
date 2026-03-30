import express from "express"
import {
  getTransactions,
  getTransaction,
  addTransaction,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transactions.js"
import { protect} from "../middleware/auth.js"

const router = express.Router()

router.post("/", protect, addTransaction)
router.get("/", protect, getTransactions)
router.get("/:id", protect,  getTransaction)
router.put("/:id", protect, updateTransaction)
router.delete("/:id", protect, deleteTransaction)

export default router