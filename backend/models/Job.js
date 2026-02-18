import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true
  },
  title: String,
  minCGPA: Number,
  maxBacklogs: Number,
  requiredSkills: [String],
  salary: String,
  location: String,
  deadline: Date,
  status: { type: String, default: "open" }
}, { timestamps: true });

export default mongoose.model("Job", jobSchema);
