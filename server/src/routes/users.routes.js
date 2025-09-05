import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUserByEmail,
  updateUser,
  updateUserRole,
} from "../controllers/users.controller.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", protect, verifyAdmin, getAllUsers);
router.get("/:email", getUserByEmail);
router.put("/:id", updateUser);
router.patch("/:id/role", protect, verifyAdmin, updateUserRole);
router.delete("/:id", protect, verifyAdmin, deleteUser);

export default router;
