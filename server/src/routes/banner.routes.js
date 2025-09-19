import express from "express";
import BannerController from "../controllers/banner.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";

const router = express.Router();

router.post("/", protect, verifyAdmin, BannerController.addBanner);

router.get("/", protect, verifyAdmin, BannerController.getAllBanners);

router.put("/:id", protect, verifyAdmin, BannerController.updateBanner);

router.delete("/:id", protect, verifyAdmin, BannerController.deleteBanner);

router.patch(
  "/active/:id",
  protect,
  verifyAdmin,
  BannerController.setActiveBanner
);

router.get("/active", BannerController.getActiveBanner);

export default router;
