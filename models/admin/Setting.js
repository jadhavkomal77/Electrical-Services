import mongoose from "mongoose";

const settingSchema = new mongoose.Schema(
  {
    whatsappNumber: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Setting", settingSchema);
