// models/Hero.js
import mongoose from "mongoose";

const heroSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String },
    buttonText: { type: String, default: "Get Free Estimation" },
    backgroundImage: { type: String, required: true }, // Cloudinary URL
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Hero", heroSchema);
