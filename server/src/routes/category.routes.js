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
router.post("/", protect, verifyAdmin, addCategory);
router.put("/:id", updateCategory);
router.delete("/:id", protect, verifyAdmin, deleteCategory);
router.get("/category/:name", getCategoryByName);

export default router;
