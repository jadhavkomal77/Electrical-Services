// controllers/adminAboutController.js
import fs from "fs";
import About from "../models/About.js";
import cloudinary from "../utils/cloudinary.js";

/* 🌍 Public */
export const getPublicAbout = async (req, res) => {
  try {
    const about = await About.findOne({ isActive: true });
    res.json(about);
  } catch (err) {
    res.status(500).json({ message: "Failed to load about section" });
  }
};

/* 🔐 Admin */
export const getAdminAbout = async (req, res) => {
  try {
    const about = await About.findOne();
    res.json(about);
  } catch (err) {
    res.status(500).json({ message: "Failed to load about section" });
  }
};

/* 🔐 Create / Update */
export const saveAbout = async (req, res) => {
  try {
    const {
      headingSmall,
      title,
      description1,
      description2,
      experience,
      isActive,
    } = req.body;

    let imageUrl;

    if (req.file) {
      const uploadRes = await cloudinary.uploader.upload(req.file.path, {
        folder: "about",
      });
      imageUrl = uploadRes.secure_url;
      fs.unlinkSync(req.file.path);
    }

    let about = await About.findOne();

    if (about) {
      about.headingSmall = headingSmall;
      about.title = title;
      about.description1 = description1;
      about.description2 = description2;
      about.experience = experience;
      about.isActive = isActive;
      if (imageUrl) about.image = imageUrl;
      await about.save();
    } else {
      about = await About.create({
        headingSmall,
        title,
        description1,
        description2,
        experience,
        image: imageUrl,
        isActive,
      });
    }

    res.json({ message: "About section updated", about });
  } catch (err) {
    res.status(500).json({ message: "Failed to update about section" });
  }
};
