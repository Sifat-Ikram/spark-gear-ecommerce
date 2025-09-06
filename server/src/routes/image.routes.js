import express from "express";
import { addProductImages } from "../controllers/image.controller.js";

const router = express.Router();

router.patch("/products/:id/images", addProductImages);

export default router;
