import { registerUser } from "../controllers/authController.js";

import { loginUser } from "../controllers/authController.js";

import { getMe } from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";

import express from "express";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/me", protect, getMe);

export default router;