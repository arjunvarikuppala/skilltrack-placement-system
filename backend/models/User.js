import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String,
     required:[true,"name is required"]
     },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: { type: String, required: true },

  role: {
    type: String,
    enum: ["student", "faculty", "officer", "recruiter"],
    default: "student",
  },

}, { timestamps: true ,
   strict:"throw"

});

export default mongoose.model("User", userSchema);
