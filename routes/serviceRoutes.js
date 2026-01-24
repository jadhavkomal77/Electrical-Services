// routes/serviceRoutes.js
import express from "express";
import {
  getAdminServices,
  getPublicServices,
  addService,
  updateService,
  getServiceBySlug,
} from "../controllers/adminServiceController.js";
import adminAuth from "../middlewares/adminAuth.js";

const router = express.Router();

/* 🌍 Public */
router.get("/public", getPublicServices);

/* 🔐 Admin */
router.get("/", adminAuth, getAdminServices);
router.post("/", adminAuth, addService);
router.put("/:id", adminAuth, updateService);
router.get("/public/:slug", getServiceBySlug);

export default router;
