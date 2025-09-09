import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUserByEmail,
  updateUser,
  updateUserRole,
} from "../controllers/users.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";

const router = express.Router();

router.get("/", protect, verifyAdmin(["admin"]), getAllUsers);
router.get("/:email", protect, getUserByEmail);
router.put("/:id", protect, updateUser);
router.patch("/:id/role", protect, verifyAdmin(["admin"]), updateUserRole);
router.delete("/:id", protect, verifyAdmin(["admin"]), deleteUser);

export default router;
