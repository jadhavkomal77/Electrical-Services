// routes/aboutRoutes.js
import express from "express";
import {
  getAdminAbout,
  getPublicAbout,
  saveAbout,
} from "../controllers/adminAboutController.js";
import adminAuth from "../middlewares/adminAuth.js";
import upload from "../utils/upload.js";

const router = express.Router();

/* 🌍 Public */
router.get("/public", getPublicAbout);

/* 🔐 Admin */
router.get("/", adminAuth, getAdminAbout);
router.put("/", adminAuth, upload.single("image"), saveAbout);

export default router;
