import express from "express";
import { AuthController } from "./auth.controller";

const router = express.Router();

// User Registration Route
router.post("/register", AuthController.registerUser);

// User Login Route
router.post("/login", AuthController.loginUser);

export const AuthRoutes = router;