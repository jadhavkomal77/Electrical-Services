import express from "express";
import {
  adminRegister,
  adminLogin,
  adminLogout,
  getAdminProfile,
  updateAdminProfile,
  changeAdminPassword,
  adminStats,
} from "../../controllers/admin/adminController.js";

import adminAuth from "../../middlewares/adminAuth.js";

const router = express.Router();

/* AUTH */
router.post("/register", adminRegister);
router.post("/login", adminLogin);
router.post("/logout", adminLogout);

/* PROFILE */
router.get("/profile", adminAuth, getAdminProfile);
router.put("/profile", adminAuth, updateAdminProfile);
router.put("/change-password", adminAuth, changeAdminPassword);

/* STATS */
router.get("/stats", adminAuth, adminStats);

export default router;
