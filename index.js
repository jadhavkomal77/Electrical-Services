
// import "dotenv/config";
// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import path from "path";
// import cookieParser from "cookie-parser";
// import fs from "fs";

// import adminRoutes from "./routes/admin/adminRoutes.js";
// import adminHeroRoutes from "./routes/adminHeroRoutes.js";
// import aboutRoutes from "./routes/aboutRoutes.js";
// import serviceRoutes from "./routes/serviceRoutes.js";
// import navbarRoutes from "./routes/navbarRoutes.js";
// import projectRoutes from "./routes/projectRoutes.js";
// import pricingRoutes from "./routes/pricingRoutes.js";
// import bookingRoutes from "./routes/bookingRoutes.js";
// import contactRoutes from "./routes/contactRoutes.js";
// import footerRoutes from "./routes/footerRoutes.js";

// const app = express();
// const __dirname = path.resolve();

// app.use(cookieParser());
// app.use(express.json());

// /* ================= CORS ================= */
// const allowedOrigins = [
//   "http://localhost:5173",
//   "https://electrical-services-frontend-jw4x.vercel.app",
// ];



// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin) return callback(null, true);

//       if (allowedOrigins.includes(origin)) {
//         return callback(null, true);
//       }

//       return callback(new Error("Not allowed by CORS"));
//     },
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

// /* ================= ROUTES ================= */
// app.use("/api/admin", adminRoutes);
// app.use("/api/adminhero", adminHeroRoutes);
// app.use("/api/adminabout", aboutRoutes);
// app.use("/api/adminservice", serviceRoutes);
// app.use("/api/adminnavbar", navbarRoutes);
// app.use("/api/projects", projectRoutes);
// app.use("/api/pricing", pricingRoutes);
// app.use("/api/booking", bookingRoutes);
// app.use("/api/contact", contactRoutes);
// app.use("/api/footer", footerRoutes);

// /* ================= TEST ROUTE ================= */
// app.get("/", (req, res) => {
//   res.json("Server is Running! 🚀");
// });

// /* ================= SERVE FRONTEND (DIST) ================= */
// if (process.env.NODE_ENV === "production") {
//   const distPath = path.join(__dirname, "dist");

//   if (fs.existsSync(distPath)) {
//     app.use(express.static(distPath));

//     app.get("*", (req, res) => {
//       res.sendFile(path.join(distPath, "index.html"));
//     });
//   }
// }

// /* ================= DB ================= */
// if (!process.env.MONGO_URL) {
//   console.error("❌ FATAL: MONGO_URL environment variable is missing!");
// }

// mongoose
//   .connect(process.env.MONGO_URL)
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// /* ================= START SERVER ================= */
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });

// export default app;









import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import adminRoutes from "./routes/admin/adminRoutes.js";
import adminHeroRoutes from "./routes/adminHeroRoutes.js";
import aboutRoutes from "./routes/aboutRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import navbarRoutes from "./routes/navbarRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import pricingRoutes from "./routes/pricingRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import footerRoutes from "./routes/footerRoutes.js";

const app = express();

app.use(cookieParser());
app.use(express.json());

/* ================= CORS ================= */
const allowedOrigins = [
  "http://localhost:5173",
  "https://electrical-services-frontend-jw4x.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* ================= ROUTES ================= */
app.use("/api/admin", adminRoutes);
app.use("/api/adminhero", adminHeroRoutes);
app.use("/api/adminabout", aboutRoutes);
app.use("/api/adminservice", serviceRoutes);
app.use("/api/adminnavbar", navbarRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/pricing", pricingRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/footer", footerRoutes);

/* ================= TEST ROUTE ================= */
app.get("/", (req, res) => {
  res.json("Server is Running! 🚀");
});

/* ================= DB ================= */
if (!process.env.MONGO_URL) {
  console.error("❌ FATAL: MONGO_URL environment variable is missing!");
}

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

/* ================= START SERVER ================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

export default app;
