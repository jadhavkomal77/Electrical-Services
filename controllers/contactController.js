import Contact from "../models/Contact.js";


// CREATE CONTACT
export const createContact = async (req, res) => {
  try {
    const { name, company, email, phone, date, time, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ message: "All required fields needed" });
    }

    const contact = await Contact.create({
      name,
      company,
      email,
      phone,
      date,
      time,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Requirement submitted successfully",
      data: contact,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL CONTACTS (ADMIN)
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE CONTACT
export const deleteContact = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Contact deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
