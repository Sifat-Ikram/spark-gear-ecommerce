import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";
import {
  addBanner,
  deleteBanner,
  getAllBanners,
  updateBanner,
} from "../controllers/banner.controller.js";

const router = express.Router();

router.post("/", protect, verifyAdmin(["admin"]), addBanner);
router.get("/", getAllBanners);
router.put("/:id", protect, verifyAdmin(["admin"]), updateBanner);
router.delete("/:id", protect, verifyAdmin(["admin"]), deleteBanner);

export default router;
