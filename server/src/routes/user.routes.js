import express from "express";
import {
  login,
  logout,
  profile,
  refresh,
  register,
  validateLogin,
  validateRegister,
} from "../controllers/user.controller.js";
import { protectRefresh } from "../middlewares/refreshAuth.middleware.js";
import rateLimit from "express-rate-limit";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many login attempts, try again after 15 minutes",
});

router.post("/register", validateRegister, register);
router.post("/login", loginLimiter, validateLogin, login);
router.post("/refresh", protectRefresh, refresh);
router.post("/logout", protectRefresh, logout);
router.get("/profile", protect, profile);

export default router;
