import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { authenticateToken } from "../middleware/auth";

const router = Router();

// POST /api/auth/login - Login user
router.post("/login", AuthController.login);

// GET /api/auth/profile - Get current user profile (protected)
router.get("/profile", authenticateToken, AuthController.getProfile);

export default router;
