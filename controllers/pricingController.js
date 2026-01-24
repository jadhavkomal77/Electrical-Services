import Pricing from "../models/Pricing.js";

export const createPricing = async (req, res) => {
  const pricing = await Pricing.create(req.body);
  res.json(pricing);
};

export const getPublicPricing = async (req, res) => {
  const data = await Pricing.find({ status: "active" }).sort({ order: 1 });
  res.json(data);
};

export const getAdminPricing = async (req, res) => {
  const data = await Pricing.find().sort({ order: 1 });
  res.json(data);
};

export const updatePricing = async (req, res) => {
  const data = await Pricing.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(data);
};

export const deletePricing = async (req, res) => {
  await Pricing.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};

/* 🔀 Reorder */
export const reorderPricing = async (req, res) => {
  const { list } = req.body; // [{id, order}]
  for (let item of list) {
    await Pricing.findByIdAndUpdate(item.id, { order: item.order });
  }
  res.json({ message: "Reordered" });
};
