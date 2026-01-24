import express from "express";
import {
  createBooking,
  getAllBookings,
  updateBookingStatus,
  deleteBooking,
} from "../controllers/bookingController.js";
import adminAuth from "../middlewares/adminAuth.js";

const router = express.Router();

/* 🌍 Public */
router.post("/", createBooking);

/* 🔐 Admin */
router.get("/", adminAuth, getAllBookings);
router.put("/:id", adminAuth, updateBookingStatus);
router.delete("/:id", adminAuth, deleteBooking);

export default router;
