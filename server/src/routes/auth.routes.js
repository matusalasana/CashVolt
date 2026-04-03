import { register, login, logout, getMe, updateUser} from "../controllers/auth.controller.js"
import { protect } from "../middleware/auth.middleware.js";

import express from "express"

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)
router.get("/me", protect, getMe);
router.get("/me/:id", protect, updateUser);

export default router;