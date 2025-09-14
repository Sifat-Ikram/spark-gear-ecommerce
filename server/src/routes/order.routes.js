import express from "express";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrderById,
  getOrderByUsername,
  getOrdersByStatus,
  updateOrder,
  updateOrderStatus,
} from "../controllers/order.controller.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/createOrder", createOrder);
router.get("/", protect, verifyAdmin(["admin"]), getAllOrders);
router.get("/:id", getOrderById);
router.get("/user/:username", getOrderByUsername);
router.get("/status/:status", getOrdersByStatus);
router.put("/:id", updateOrder);
router.patch("/status/:id", protect, verifyAdmin(["admin"]), updateOrderStatus);
router.delete("/:id", protect, verifyAdmin(["admin"]), deleteOrder);

export default router;
