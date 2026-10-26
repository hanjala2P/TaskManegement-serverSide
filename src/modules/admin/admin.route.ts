import express from "express";
import { AdminController } from "./admin.controller";
import auth from "../../middleware/auth";
import authAdmin from "../../middleware/authAdmin";

const router = express.Router();


router.get("/dashboard-stats", auth(), authAdmin("admin"), AdminController.getAdminDashboardStats);

export const AdminRoutes = router;