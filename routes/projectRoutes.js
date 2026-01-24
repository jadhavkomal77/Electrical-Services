import express from "express";
import { createProject, deleteProject, getAdminProjects, getProjectBySlug, getPublicProjects, updateProject } from "../controllers/projectController.js";
import upload from "../utils/upload.js";
import adminAuth from "../middlewares/adminAuth.js";


const router = express.Router();

/* 🌍 PUBLIC */
router.get("/public", getPublicProjects);
router.get("/public/:slug", getProjectBySlug);

/* 🔐 ADMIN */
router.get("/", adminAuth, getAdminProjects);
router.post("/", adminAuth, upload.single("image"), createProject);
router.put("/:id", adminAuth, upload.single("image"), updateProject);
router.delete("/:id", adminAuth, deleteProject);

export default router;
