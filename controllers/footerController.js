import Footer from "../models/Footer.js";


/* 🌍 Public - get footer */
export const getPublicFooter = async (req, res) => {
  try {
    const footer = await Footer.findOne();
    res.status(200).json(footer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* 🔐 Admin - get footer */
export const getAdminFooter = async (req, res) => {
  try {
    const footer = await Footer.findOne();
    res.status(200).json(footer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* 🔐 Admin - save/update footer */
export const saveFooter = async (req, res) => {
  try {
    const data = req.body;

    let footer = await Footer.findOne();

    if (footer) {
      footer = await Footer.findByIdAndUpdate(footer._id, data, {
        new: true,
      });
    } else {
      footer = await Footer.create(data);
    }

    res.status(200).json({
      success: true,
      message: "Footer saved successfully",
      data: footer,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
