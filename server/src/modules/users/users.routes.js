import {
  getUsers, 
  updateUser, 
  deleteUser
} from "./users.controller.js";
import express from "express"
import { protect } from "../../middleware/auth.middleware.js"
import { authorizeRoles } from "../../middleware/roleAuth.middleware.js"

const router = express.Router()

router.get("/", protect, authorizeRoles("admin"), getUsers)
router.put("/", protect, updateUser)
router.delete("/:id", protect, authorizeRoles("admin"), deleteUser)

export default router;