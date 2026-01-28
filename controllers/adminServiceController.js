import Service from "../models/Service.js";
import slugify from "slugify";
import cloudinary from "../utils/cloudinary.js";
import fs from "fs";

/* 🌍 Public */
export const getPublicServices = async (req, res) => {
  const services = await Service.find({ isActive: true });
  res.json(services);
};

export const getServiceBySlug = async (req, res) => {
  const service = await Service.findOne({
    slug: req.params.slug,
    isActive: true,
  });
  if (!service) return res.status(404).json({ message: "Service not found" });
  res.json(service);
};

/* 🔐 Admin */
export const getAdminServices = async (req, res) => {
  const services = await Service.find();
  res.json(services);
};

/* 🔐 Add Service */
export const addService = async (req, res) => {
  try {
    const { title, shortDesc, longDesc, icon, whyChoose, process, technologies } =
      req.body;

    let projects = JSON.parse(req.body.projects || "[]");
    const slug = slugify(title, { lower: true, strict: true });

    const exists = await Service.findOne({ slug });
    if (exists) return res.status(400).json({ message: "Already exists" });

    // 🔥 upload images in order
    if (req.files?.length) {
      let imgIndex = 0;
      for (let i = 0; i < projects.length; i++) {
        if (projects[i] && req.files[imgIndex]) {
          const upload = await cloudinary.uploader.upload(
            req.files[imgIndex].path,
            { folder: "services" }
          );
          projects[i].image = upload.secure_url;
          fs.unlinkSync(req.files[imgIndex].path);
          imgIndex++;
        }
      }
    }

    const service = await Service.create({
      title,
      shortDesc,
      longDesc,
      slug,
      icon,
      whyChoose: JSON.parse(whyChoose),
      process: JSON.parse(process),
      technologies: JSON.parse(technologies),
      projects,
    });

    res.status(201).json(service);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add service" });
  }
};

/* 🔐 Update Service */
// export const updateService = async (req, res) => {
//   try {
//     const { title, shortDesc, longDesc, icon, whyChoose, process, technologies, isActive } =
//       req.body;

//     let projects = JSON.parse(req.body.projects || "[]");
//     const slug = slugify(title, { lower: true, strict: true });

//     const oldService = await Service.findById(req.params.id);
//     if (!oldService) return res.status(404).json({ message: "Service not found" });

//     // 🔥 upload new images only where file is sent
//     if (req.files?.length) {
//       let imgIndex = 0;
//       for (let i = 0; i < projects.length; i++) {
//         if (req.files[imgIndex]) {
//           const upload = await cloudinary.uploader.upload(
//             req.files[imgIndex].path,
//             { folder: "services" }
//           );
//           projects[i].image = upload.secure_url;
//           fs.unlinkSync(req.files[imgIndex].path);
//           imgIndex++;
//         }
//       }
//     }

//     // 🔥 keep old images if frontend sent ""
//     projects = projects.map((p, i) => ({
//       ...p,
//       image: p.image && p.image !== "" ? p.image : oldService.projects[i]?.image || "",
//     }));

//     const service = await Service.findByIdAndUpdate(
//       req.params.id,
//       {
//         title,
//         shortDesc,
//         longDesc,
//         slug,
//         icon,
//         whyChoose: JSON.parse(whyChoose),
//         process: JSON.parse(process),
//         technologies: JSON.parse(technologies),
//         projects,
//         isActive,
//       },
//       { new: true }
//     );

//     res.json(service);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to update service" });
//   }
// };
export const updateService = async (req, res) => {
  try {
    const {
      title,
      shortDesc,
      longDesc,
      icon,
      whyChoose,
      process,
      technologies,
      isActive,
    } = req.body;

    let projects = JSON.parse(req.body.projects || "[]");
    const slug = slugify(title, { lower: true, strict: true });

    const oldService = await Service.findById(req.params.id);
    if (!oldService) return res.status(404).json({ message: "Service not found" });

    let fileIndex = 0;

    for (let i = 0; i < projects.length; i++) {
      // 👉 only replace where frontend marked "__new__"
      if (projects[i].image === "__new__") {
        const upload = await cloudinary.uploader.upload(
          req.files[fileIndex].path,
          { folder: "services" }
        );

        projects[i].image = upload.secure_url;
        fs.unlinkSync(req.files[fileIndex].path);
        fileIndex++;
      } else {
        // keep old image
        projects[i].image = oldService.projects[i]?.image || "";
      }
    }

    const service = await Service.findByIdAndUpdate(
      req.params.id,
      {
        title,
        shortDesc,
        longDesc,
        slug,
        icon,
        whyChoose: JSON.parse(whyChoose),
        process: JSON.parse(process),
        technologies: JSON.parse(technologies),
        projects,
        isActive,
      },
      { new: true }
    );

    res.json(service);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update service" });
  }
};

/* 🔐 Delete */
export const deleteService = async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: "Service deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};
