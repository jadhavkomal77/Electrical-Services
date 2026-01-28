import express from "express";
import {
  createService,
  getPublicServices,
  getAdminServices,
  getServiceBySlug,
  updateService,
  deleteService,
  getPublicServiceBySlug,
} from "../controllers/adminServiceController.js";
import upload from "../utils/upload.js";

const router = express.Router();

router.post(
  "/",
  upload.fields([{ name: "projects", maxCount: 10 }]),
  createService
);

router.get("/", getPublicServices);
router.get("/admin", getAdminServices);
router.get("/:slug", getServiceBySlug);

router.put(
  "/:id",
  upload.fields([{ name: "projects", maxCount: 10 }]),
  updateService
);

router.delete("/:id", deleteService);
router.get("/public/:slug", getPublicServiceBySlug); 

export default router;
