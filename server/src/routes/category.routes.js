import express from "express";
import {
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
  getCategoryByName,
} from "../controllers/category.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";

const router = express.Router();

router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.post("/", protect, verifyAdmin(["admin"]), addCategory);
router.put("/:id", verifyAdmin(["admin"]), updateCategory);
router.delete("/:id", protect, verifyAdmin(["admin"]), deleteCategory);
router.get("/category/:name", getCategoryByName);

export default router;
