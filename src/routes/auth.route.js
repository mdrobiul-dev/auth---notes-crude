import express from "express";
import {
  loginSchema,
  registerSchema,
} from "../validators/auth.validator.js";
import {
  login,
  logout,
  refreshToken,
  register,
} from "../controllers/auth.controller.js";
import { authLimiter } from "../middleware/rateLimiter.middleware.js";
import { protect } from "../middleware/auth.middleware.js";
import { validate } from "../validators/validator.js";

const router = express.Router();

router.post("/register", authLimiter, validate(registerSchema), register);
router.post("/login", authLimiter, validate(loginSchema), login);
router.post("/refresh-token", refreshToken);
router.post("/logout", protect, logout);

export default router;
