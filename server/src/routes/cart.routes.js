import express from "express";
import {
  addToCart,
  deleteCart,
  deleteCartByEmail,
  getAllCart,
  getCartByEmail,
  updatCart,
} from "../controllers/cart.controller.js";

const router = express.Router();

router.post("/addCart", addToCart);
router.get("/", getAllCart);
router.get("/:email", getCartByEmail);
router.patch("/:id", updatCart);
router.delete("/:id", deleteCart);
router.delete("/user/:email", deleteCartByEmail);

export default router;
