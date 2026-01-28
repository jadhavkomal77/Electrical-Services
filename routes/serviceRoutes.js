import express from "express";
import {
  getAdminServices,
  getPublicServices,
  addService,
  updateService,
  getServiceBySlug,
  deleteService,
} from "../controllers/adminServiceController.js";
import adminAuth from "../middlewares/adminAuth.js";
import upload from "../utils/upload.js";

const router = express.Router();

router.get("/public", getPublicServices);
router.get("/public/:slug", getServiceBySlug);

router.get("/", adminAuth, getAdminServices);

/* 🔥 multiple project images */
router.post("/", adminAuth, upload.array("projectImages"), addService);
router.put("/:id", adminAuth, upload.array("projectImages"), updateService);

router.delete("/:id", adminAuth, deleteService);

export default router;
