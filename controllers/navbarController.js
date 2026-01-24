import fs from "fs";
import Navbar from "../models/Navbar.js";
import cloudinary from "../utils/cloudinary.js";


/* 🌍 PUBLIC */
export const getPublicNavbar = async (req, res) => {
  const navbar = await Navbar.findOne();
  res.json(navbar);
};

/* 🔐 ADMIN */
export const getAdminNavbar = async (req, res) => {
  const navbar = await Navbar.findOne();
  res.json(navbar);
};

export const createOrUpdateNavbar = async (req, res) => {
  try {
    const { logoText, phone, menu } = req.body;

    let data = {
      logoText,
      phone,
      menu: JSON.parse(menu),
    };

    // 🖼️ LOGO FILE UPLOAD
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "navbar-logo",
      });

      data.logoImage = result.secure_url;

      // 🧹 local temp file delete
      fs.unlinkSync(req.file.path);
    }

    let navbar = await Navbar.findOne();

    if (navbar) {
      navbar = await Navbar.findByIdAndUpdate(navbar._id, data, {
        new: true,
      });
    } else {
      navbar = await Navbar.create(data);
    }

    res.json({
      success: true,
      navbar,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Navbar update failed" });
  }
};
