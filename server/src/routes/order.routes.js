import express from "express";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrderById,
  getOrderByUsername,
  updateOrder,
} from "../controllers/order.controller.js";

const router = express.Router();

router.post("/createOrder", createOrder);
router.get("/", getAllOrders);
router.get("/:id", getOrderById);
router.get("/user/:username", getOrderByUsername);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

export default router;
