import express from "express";
import ProductController from "../controllers/product.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";

const router = express.Router();

router.get("/", ProductController.getAllProducts);
router.post("/", protect, verifyAdmin, ProductController.addProduct);
router.get("/id/:id", ProductController.getProductById);
router.put("/:id", protect, verifyAdmin, ProductController.updateProduct);
router.delete("/:id", protect, verifyAdmin, ProductController.deleteProduct);
router.get("/:categoryName", ProductController.getProductsByCategory);
router.get("/:slug", ProductController.getProductsBySlug);

export default router;
