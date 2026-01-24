import express from "express";
import {
  createPricing,
  getPublicPricing,
  getAdminPricing,
  updatePricing,
  deletePricing,
  reorderPricing,
} from "../controllers/pricingController.js";
import adminAuth from "../middlewares/adminAuth.js";

const router = express.Router();

router.get("/public", getPublicPricing);

router.get("/", adminAuth, getAdminPricing);
router.post("/", adminAuth, createPricing);
router.put("/:id", adminAuth, updatePricing);
router.delete("/:id", adminAuth, deletePricing);
router.put("/reorder/all", adminAuth, reorderPricing);

export default router;
