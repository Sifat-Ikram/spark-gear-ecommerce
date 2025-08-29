import express from "express";
import {
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
  getCategoryByName,
} from "../controllers/category.controller.js";

const router = express.Router();

router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.post("/", addCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);
router.get("/category/:name", getCategoryByName);

export default router;
