import Booking from "../models/Booking.js";
import Pricing from "../models/Pricing.js";

/* ➕ CREATE BOOKING (Public) */
export const createBooking = async (req, res) => {
  try {
    const { planId, name, mobile, address, bookingDate, bookingTime } = req.body;

    const plan = await Pricing.findById(planId);
    if (!plan) return res.status(404).json({ message: "Plan not found" });

    const booking = await Booking.create({
      planId,
      planTitle: plan.title,
      price: plan.price,
      currency: plan.currency,
      unit: plan.unit,
      name,
      mobile,
      address,
      bookingDate,
      bookingTime,
    });

    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


/* 🌍 GET BOOKINGS (Admin) */
export const getAllBookings = async (req, res) => {
  const data = await Booking.find().sort({ createdAt: -1 });
  res.json(data);
};

/* ✏ UPDATE STATUS (Admin) */
export const updateBookingStatus = async (req, res) => {
  const data = await Booking.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  res.json(data);
};

/* 🗑 DELETE BOOKING (Admin) */
export const deleteBooking = async (req, res) => {
  await Booking.findByIdAndDelete(req.params.id);
  res.json({ message: "Booking deleted" });
};
