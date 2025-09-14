import express from "express";
import rateLimit from "express-rate-limit";
import { protect } from "../middlewares/auth.middleware.js";
import { protectRefresh } from "../middlewares/refreshAuth.middleware.js";
import {
  registerController,
  loginController,
  meController,
} from "../controllers/user.controller.js";
import {
  refreshController,
  logoutController,
} from "../controllers/auth.controller.js";

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many login attempts, try again after 15 minutes",
});

router.post("/register", registerController);
router.post("/login", loginLimiter, loginController);
router.post("/refresh", protectRefresh, refreshController);
router.post("/logout", protectRefresh, logoutController);
router.get("/profile", meController);

export default router;
