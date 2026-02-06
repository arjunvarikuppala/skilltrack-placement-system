import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";


const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());



app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/student",studentRoutes);


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


const PORT = process.env.PORT ;




