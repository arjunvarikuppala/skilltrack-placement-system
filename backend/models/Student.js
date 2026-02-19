import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    rollNo: {
      type: String,
      required: true,
    },
    branch: {
      type: String,
      required: true,
    },
    cgpa: {
      type: Number,
    },
    backlogs: {
      type: Number,
      default: 0,
    },
    skills: {
      type: [String],
    },
    batchYear: {
      type: Number,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);
