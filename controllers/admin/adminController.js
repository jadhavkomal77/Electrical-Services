import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs";
import Admin from "../../models/admin/Admin.js";
import upload from "../../utils/upload.js";
import cloudinary from "../../utils/cloudinary.js";

const JWT_SECRET = process.env.JWT_KEY;

const cookieOptions =
  process.env.NODE_ENV === "production"
    ? { httpOnly: true, sameSite: "none", secure: true }
    : { httpOnly: true, sameSite: "lax", secure: false };


export const adminRegister = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const exists = await Admin.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Login
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email & password required" });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials email" });
    }

    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials pass" });
    }

    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    // COOKIE

    res.cookie("adminToken", token, cookieOptions);

    res.json({
      success: true,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
};

export const adminLogout = async (req, res) => {
  try {
    res.clearCookie("adminToken", cookieOptions);
    res.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Logout error" });
  }
};

/* ================= PROFILE ================= */

// ✅ Get profile
export const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id).select("-password");

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json({ success: true, admin });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Update profile + image
export const updateAdminProfile = (req, res) => {
  upload.single("profileImage")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: "Image upload failed" });
    }

    try {
      const admin = await Admin.findById(req.user.id);
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }

      const { name, phone } = req.body;

      if (req.file) {
        if (admin.profile?.public_id) {
          await cloudinary.uploader.destroy(admin.profile.public_id);
        }

        const uploaded = await cloudinary.uploader.upload(req.file.path, {
          folder: "admin_profiles",
        });

        admin.profile = {
          url: uploaded.secure_url,
          public_id: uploaded.public_id,
        };

        fs.unlinkSync(req.file.path);
      }

      admin.name = name || admin.name;
      admin.phone = phone || admin.phone;

      await admin.save();

      res.json({ success: true, message: "Profile updated", admin });
    } catch {
      res.status(500).json({ message: "Update failed" });
    }
  });
};

// ✅ Change password
export const changeAdminPassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: "Both passwords required" });
    }

    const admin = await Admin.findById(req.user.id);

    const match = await bcrypt.compare(oldPassword, admin.password);
    if (!match) {
      return res.status(401).json({ message: "Old password incorrect" });
    }

    admin.password = await bcrypt.hash(newPassword, 10);
    await admin.save();

    res.json({ success: true, message: "Password updated" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};



//  Admin Stats
export const adminStats = async (req, res) => {
  try {
    const adminId = req.user.id;

    const stats = {
      totalAdmins: await Admin.countDocuments(),
      profileCompleted: await Admin.countDocuments({
        profile: { $exists: true },
      }),
    };

    res.json({
      success: true,
      stats,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to load stats" });
  }
};


