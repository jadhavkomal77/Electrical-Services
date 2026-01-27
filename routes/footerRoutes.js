import express from "express";
import {
  getPublicFooter,
  getAdminFooter,
  saveFooter,
} from "../controllers/footerController.js";

const router = express.Router();

/* Public */
router.get("/public", getPublicFooter);

/* Admin */
router.get("/", getAdminFooter);
router.put("/", saveFooter);

export default router;
