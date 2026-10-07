import express from "express";
import { signup, login } from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// POST /api/auth/signup
router.post("/signup", signup);

// POST /api/auth/loginlogin
router.post("/login", login);

// 🔒 Protected route
router.get("/me", authMiddleware, (req, res) => {
    res.json({
        message: "User authenticated",
        user: req.user,
    });
});

export default router;