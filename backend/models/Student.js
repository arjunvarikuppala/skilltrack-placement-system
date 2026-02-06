import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  rollNo: String,

  branch: String,

  cgpa: Number,

  backlogs: Number,

  skills: [String],

  resumeUrl: String,

  batchYear: Number,

  placed: {
    type: Boolean,
    default: false,
  },

}, { timestamps: true });

export default mongoose.model("Student", studentSchema);
