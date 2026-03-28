import express from "express"
import {
  getTransactions,
  getTransaction,
  addTransaction,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transactions.js"

const router = express.Router()

router.post("/", addTransaction)
router.get("/", getTransactions)
router.get("/:id", getTransaction)
router.put("/:id", updateTransaction)
router.delete("/:id", deleteTransaction)

export default router