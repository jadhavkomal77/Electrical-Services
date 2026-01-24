import express from "express";
import {
  getAdminHero,
  getPublicHero,
  createOrUpdateHero,
} from "../controllers/adminHeroController.js";
import adminAuth from "../middlewares/adminAuth.js";
import upload from "../utils/upload.js";

const router = express.Router();

/* 🌍 Public */
router.get("/public", getPublicHero);

/* 🔐 Admin */
router.get("/", adminAuth, getAdminHero);
router.put("/", adminAuth, upload.single("backgroundImage"), createOrUpdateHero);

export default router;
