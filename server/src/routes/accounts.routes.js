import express from "express"
import {
  getAccounts,
  getAccount,
  updateAccount,
  deleteAccount,
  addAccount
} from "../controllers/accounts.controller.js"
import { protect} from "../middleware/auth.middleware.js"

const router = express.Router()

router.post("/", protect, addAccount)
router.get("/", protect, getAccounts)
router.get("/:id", protect,  getAccount)
router.put("/:id", protect, updateAccount)
router.delete("/:id", protect, deleteAccount)

export default router 