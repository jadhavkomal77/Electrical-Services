import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: { type: String },

    password: { type: String, required: true },

    role: {
      type: String,
      enum: ["admin"],
      default: "admin",
    },

    isActive: { type: Boolean, default: true },

    profile: {
      url: String,
      public_id: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Admin", adminSchema);
