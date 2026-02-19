import Student from "../models/Student.js";


// CREATE / UPDATE PROFILE
export const saveProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const {
      rollNo,
      branch,
      cgpa,
      backlogs,
      skills,
      batchYear,
    } = req.body;

    if (!rollNo || !branch) {
      return res.status(400).json({
        message: "rollNo and branch are required",
      });
    }

    const student = await Student.findOneAndUpdate(
      { userId: req.user._id },
      {
        rollNo,
        branch,
        cgpa,
        backlogs,
        skills,
        batchYear,
        userId: req.user._id,
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      message: "Profile saved successfully",
      student,
    });

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};


// GET PROFILE
export const getProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const student = await Student.findOne({
      userId: req.user._id,
    });

    if (!student) {
      return res.status(404).json({
        message: "Profile not found",
      });
    }

    res.status(200).json(student);

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
