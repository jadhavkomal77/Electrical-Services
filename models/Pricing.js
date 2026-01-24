import mongoose from "mongoose";

const pricingSchema = new mongoose.Schema(
  {
    title: String,
    subtitle: String,
    price: String,      // "499"
    currency: { type: String, default: "₹" }, // ₹ or $
    unit: String,       // /visit
    features: [String],
    isPopular: { type: Boolean, default: false },
    status: { type: String, default: "active" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Pricing", pricingSchema);
