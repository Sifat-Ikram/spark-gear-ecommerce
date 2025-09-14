import express from "express";
import CouponController from "../controllers/coupon.controller.js";

const router = express.Router();

router.get("/", CouponController.getAllCoupons);
router.get("/:id", CouponController.getCouponById);
router.get("/code/:code", CouponController.getCouponByCode);
router.post("/", CouponController.addCoupon);
router.put("/:id", CouponController.updateCoupon);
router.delete("/:id", CouponController.deleteCoupon);
router.patch("/:id/toggle", CouponController.toggleStatus);

export default router;
