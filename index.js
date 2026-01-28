
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import adminRoutes from "./routes/admin/adminRoutes.js";
import adminHeroRoutes from "./routes/adminHeroRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import navbarRoutes from "./routes/navbarRoutes.js";
import aboutRoutes from "./routes/aboutRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import pricingRoutes from "./routes/pricingRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import footerRoutes from "./routes/footerRoutes.js";

const app = express();

/* ================= MIDDLEWARE ================= */
app.use(express.json());
app.use(cookieParser());

/* ================= CORS ================= */
app.use(
  cors({
    // origin: "http://localhost:5173",
    origin: "https://electrical-services-frantend-jw4x.vercel.app",
    credentials: true,
  })
);

/* ================= ROUTES ================= */
app.use("/api/admin", adminRoutes);
app.use("/api/adminservice", serviceRoutes);
app.use("/api/adminhero", adminHeroRoutes);
app.use("/api/adminnavbar", navbarRoutes);
app.use("/api/adminabout", aboutRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/pricing", pricingRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/footer", footerRoutes);

/* ================= TEST ================= */
app.get("/", (req, res) => {
  res.json("Server is running 🚀");
});

/* ================= DB ================= */
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ Mongo error", err));

/* ================= START ================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server on ${PORT}`));
