import express from "express"
import {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
} from "../controllers/users.js"
const router = express.Router()

router.post("/", addUser)
router.get("/", getUsers)
router.get("/:id", getUser)
router.put("/:id", updateUser)
router.delete("/:id", deleteUser)

export default router