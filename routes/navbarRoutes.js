import express from "express";
import { createOrUpdateNavbar, getAdminNavbar, getPublicNavbar } from "../controllers/navbarController.js";
import upload from "../utils/upload.js";
import adminAuth from "../middlewares/adminAuth.js";


const router = express.Router();

/* 🌍 Public */
router.get("/public", getPublicNavbar);

/* 🔐 Admin */
router.get("/", adminAuth, getAdminNavbar);
router.put("/", adminAuth, upload.single("logo"), createOrUpdateNavbar);

export default router;
