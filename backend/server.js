import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/application", applicationRoutes); // 🔥 THIS WAS MISSING

// DB CONNECT
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });

  } catch (err) {
    console.error("DB Error:", err.message);
    process.exit(1);
  }
};

connectDB();
