import mongoose from "mongoose";

const featureSchema = new mongoose.Schema({
  title: String,
  desc: String,
  icon: String,
});

const processSchema = new mongoose.Schema({
  step: Number,      // 1,2,3,4
  title: String,
  desc: String,
});

const projectSchema = new mongoose.Schema({
  title: String,
  desc: String,
  image: String,    // cloudinary url
  tech: [String],
});

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    shortDesc: { type: String, required: true },
    longDesc: String,

    slug: { type: String, unique: true },

    icon: { type: String, default: "⚡" },

    whyChoose: [featureSchema],    // icon, title, desc
    process: [processSchema],     // step, title, desc
    technologies: [String],
    projects: [projectSchema],    // title, desc, image, tech

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Service", serviceSchema);
