import fs from "fs";
import Hero from "../models/Hero.js";
import cloudinary from "../utils/cloudinary.js";

/* =======================
   🌍 Public Hero
======================= */
export const getPublicHero = async (req, res) => {
  try {
    const hero = await Hero.findOne({ isActive: true }).sort({ updatedAt: -1 });
    res.json(hero);
  } catch (err) {
    res.status(500).json({ message: "Failed to load hero" });
  }
};

/* =======================
   🔐 Admin Get Hero
======================= */
export const getAdminHero = async (req, res) => {
  try {
    const hero = await Hero.findOne();
    res.json(hero);
  } catch (err) {
    res.status(500).json({ message: "Failed to load hero" });
  }
};

/* =======================
   🔐 Create / Update Hero
======================= */
export const createOrUpdateHero = async (req, res) => {
  try {
    const { title, subtitle, buttonText, isActive } = req.body;

    let imageUrl;

    // ✅ If image uploaded → upload to cloudinary
    if (req.file) {
      const uploadRes = await cloudinary.uploader.upload(req.file.path, {
        folder: "hero",
      });

      imageUrl = uploadRes.secure_url;

      // remove local file
      fs.unlinkSync(req.file.path);
    }

    let hero = await Hero.findOne();

    if (hero) {
      hero.title = title;
      hero.subtitle = subtitle;
      hero.buttonText = buttonText;
      hero.isActive = isActive;

      if (imageUrl) hero.backgroundImage = imageUrl;

      await hero.save();
    } else {
      hero = await Hero.create({
        title,
        subtitle,
        buttonText,
        backgroundImage: imageUrl,
        isActive,
      });
    }

    res.json({ message: "Hero updated successfully", hero });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Hero update failed" });
  }
};
