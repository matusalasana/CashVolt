import { register, login, logout, getMe } from "../controllers/auth.js"
import { protect } from "../middleware/auth.js";

import express from "express"

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)
router.get("/me", protect, getMe);

export default router;