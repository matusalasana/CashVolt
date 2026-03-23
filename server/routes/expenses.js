import express from "express"
import {
  getExpenses,
  // getExpense,
  // addExpense,
  // updateExpense,
  // deleteExpense
} from "../controllers/expenses.js"

const router = express.Router()

router.get("/", getExpenses)
// router.get("/:id", getExpense)
// router.post("/", addExpense)
// router.put("/:id", updateExpense)
// router.delete("/:id", deleteExpense)

export default router