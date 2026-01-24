import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    planId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pricing",
      required: true,
    },

    planTitle: String,
    price: String,
    currency: String,
    unit: String,

    name: { type: String, required: true },
    mobile: { type: String, required: true },
    address: { type: String, required: true },

    bookingDate: { type: String, required: true }, // 📅
    bookingTime: { type: String, required: true }, // ⏰

    status: {
      type: String,
      default: "pending", // pending | confirmed | cancelled
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
