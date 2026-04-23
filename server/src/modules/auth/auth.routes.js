import express from "express";
import {
  registerUser,
  loginUser,
  updateUser,
  logoutUser,
  getMe
} from "./auth.controller.js";
import { protect } from "../../middleware/auth.middleware.js";


const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/update", protect, updateUser);
router.get("/me", protect, getMe);

export default router;