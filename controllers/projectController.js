
import slugify from "slugify";
import Project from "../models/Project.js";
import cloudinary from "../utils/cloudinary.js";

/* ➕ CREATE PROJECT (Admin) */
export const createProject = async (req, res) => {
  try {
    const { title, category, shortDesc, description, status } = req.body;

    const slug = slugify(title, { lower: true, strict: true });

    const existing = await Project.findOne({ slug });
    if (existing) {
      return res.status(400).json({ message: "Project already exists" });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "projects",
    });

    const project = await Project.create({
      title,
      slug,
      category,
      image: result.secure_url,
      shortDesc,
      description,
      status,
    });

    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* 📥 GET ALL PROJECTS (Public) */
export const getPublicProjects = async (req, res) => {
  const projects = await Project.find({ status: "active" }).sort({
    createdAt: -1,
  });
  res.json(projects);
};

/* 🔐 GET ALL PROJECTS (Admin) */
export const getAdminProjects = async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.json(projects);
};

/* 📄 GET SINGLE PROJECT (by slug) */
export const getProjectBySlug = async (req, res) => {
  const project = await Project.findOne({ slug: req.params.slug });
  if (!project) return res.status(404).json({ message: "Not found" });
  res.json(project);
};

/* ✏ UPDATE PROJECT */
export const updateProject = async (req, res) => {
  try {
    const { title, category, shortDesc, description, status } = req.body;

    const data = { title, category, shortDesc, description, status };

    if (title) {
      data.slug = slugify(title, { lower: true, strict: true });
    }

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "projects",
      });
      data.image = result.secure_url;
    }

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true }
    );

    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* 🗑 DELETE PROJECT */
export const deleteProject = async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: "Project deleted" });
};
