import mongoose from "mongoose";

const navbarSchema = new mongoose.Schema(
  {
    logoText: String,
    logoImage: String,
    phone: String,
    menu: [
      {
        label: String,
        link: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Navbar", navbarSchema);
