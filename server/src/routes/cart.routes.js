import express from "express";
import {
  addToCart,
  deleteCart,
  deleteCartByEmail,
  getAllCart,
  getCartByEmail,
  updatCart,
} from "../controllers/cart.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";

const router = express.Router();

router.post("/addCart", addToCart);
router.get("/get", protect, verifyAdmin(["admin"]), getAllCart);
router.get("/:email", getCartByEmail);
router.patch("/:id", updatCart);
router.delete("/:id", protect, verifyAdmin(["admin"]), deleteCart);
router.delete("/user/:email", deleteCartByEmail);

export default router;
