import express from "express";
import ProductController from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", ProductController.getAllProducts);
router.post("/", ProductController.addProduct);
router.get("/id/:id", ProductController.getProductById);
router.put("/:id", ProductController.updateProduct);
router.delete("/:id", ProductController.deleteProduct);
router.get("/category/:categoryName", ProductController.getProductsByCategory);

export default router;
