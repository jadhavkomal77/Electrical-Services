// controllers/adminServiceController.js
import Service from "../models/Service.js";

/* 🌍 Public */
export const getPublicServices = async (req, res) => {
  try {
    const services = await Service.find({ isActive: true }).sort({ createdAt: 1 });
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: "Failed to load services" });
  }
};

/* 🔐 Admin */
export const getAdminServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: 1 });
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: "Failed to load services" });
  }
};

/* 🔐 Add Service */
export const addService = async (req, res) => {
  try {
    const { title, shortDesc, icon } = req.body;

    const slug = title.toLowerCase().replace(/\s+/g, "-");

    const service = await Service.create({
      title,
      shortDesc,
      icon,
      slug,
    });

    res.json(service);
  } catch (err) {
    res.status(500).json({ message: "Failed to add service" });
  }
};

/* 🔐 Update Service */
export const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, shortDesc, icon, isActive } = req.body;

    const slug = title.toLowerCase().replace(/\s+/g, "-");

    const service = await Service.findByIdAndUpdate(
      id,
      { title, shortDesc, icon, slug, isActive },
      { new: true }
    );

    res.json(service);
  } catch (err) {
    res.status(500).json({ message: "Failed to update service" });
  }
};

// controllers/adminServiceController.js

export const getServiceBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const service = await Service.findOne({
      slug,
      isActive: true,
    });

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json(service);
  } catch (err) {
    res.status(500).json({ message: "Failed to load service" });
  }
};
