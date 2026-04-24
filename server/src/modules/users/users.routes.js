import {
  getUsers, 
  updateUser, 
  deleteUser,
  changePassword
} from "./users.controller.js";
import express from "express";
import { protect } from "../../middleware/auth.middleware.js";
import { authorizeRoles } from "../../middleware/roleAuth.middleware.js";

const router = express.Router();

// All routes require authentication
router.use(protect);

// Routes
router.get("/", authorizeRoles("admin"), getUsers);
router.put("/", updateUser);
router.post("/change-password", changePassword);
router.delete("/:id", authorizeRoles("admin"), deleteUser);

export default router;