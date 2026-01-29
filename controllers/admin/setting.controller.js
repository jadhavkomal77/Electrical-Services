import Setting from "../../models/admin/Setting.js";


export const getSettings = async (req, res) => {
  const setting = await Setting.findOne();
  res.json(setting);
};

export const updateWhatsApp = async (req, res) => {
  const { whatsappNumber } = req.body;

  let setting = await Setting.findOne();

  if (!setting) {
    setting = await Setting.create({ whatsappNumber });
  } else {
    setting.whatsappNumber = whatsappNumber;
    await setting.save();
  }

  res.json(setting);
};
