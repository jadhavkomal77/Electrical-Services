import mongoose from "mongoose";

const footerSchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true },
    tagline: { type: String },
    description: { type: String },

    phone: { type: String },
    email: { type: String },
    address: { type: String },

    facebook: { type: String },
    twitter: { type: String },
    instagram: { type: String },
    linkedin: { type: String },

    quickLinks: [{ type: String }],
    importantLinks: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model("Footer", footerSchema);
