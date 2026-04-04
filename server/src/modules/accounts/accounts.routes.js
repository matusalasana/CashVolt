import express from "express";
import {
  getAccounts,
  createAccount,
  updateAccount,
  deleteAccount
} from "./accounts.controller.js";

import { protect } from "../../middleware/auth.middleware.js";

const router = express.Router();

// protect all routes
router.use(protect);

router.get("/", getAccounts);
router.post("/", createAccount);
router.put("/:id", updateAccount);
router.delete("/:id", deleteAccount);

export default router;