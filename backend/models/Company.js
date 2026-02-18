import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: String,
  hrName: String,
  website: String,
  location: String,
  verified: { type: Boolean, default: false },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }
}, { timestamps: true });

export default mongoose.model("Company", companySchema);
