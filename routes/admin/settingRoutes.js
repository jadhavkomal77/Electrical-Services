import express from "express";
import adminAuth from "../../middlewares/adminAuth.js";
import { getSettings, updateWhatsApp } from "../../controllers/admin/setting.controller.js";


const router = express.Router();

router.get("/", getSettings);
router.put("/whatsapp", adminAuth, updateWhatsApp);

export default router;
