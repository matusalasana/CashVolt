import express from "express"
import {
  getAccounts,
  getAccount,
  updateAccount,
  deleteAccount,
  addAccount
} from "../controllers/accounts.js"
const router = express.Router()

router.post("/", addAccount)
router.get("/", getAccounts)
router.get("/:id", getAccount)
router.put("/:id", updateAccount)
router.delete("/:id", deleteAccount)

export default router 