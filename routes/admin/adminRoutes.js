import express from "express";
import { adminLogin, adminLogout, adminRegister, adminStats, changeAdminPassword, getAdminProfile,  updateAdminProfile } from "../../controllers/admin/adminController.js";
import adminAuth from "../../middlewares/adminAuth.js";

const router = express.Router();

router.post("/register", adminRegister);

router.post("/login", adminLogin);

router.post("/logout", adminAuth, adminLogout);

router.get("/profile", adminAuth, getAdminProfile);

router.put("/profile", adminAuth, updateAdminProfile);

router.put("/change-password", adminAuth, changeAdminPassword);
router.get("/stats", adminAuth, adminStats);



export default router;
