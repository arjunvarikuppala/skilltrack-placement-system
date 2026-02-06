import Student from "../models/Student.js";

// CREATE / UPDATE PROFILE
export const saveProfile = async (req, res) => {
  try {

    const data = {
      ...req.body,
      userId: req.user.id,
    };

    const student = await Student.findOneAndUpdate(
      { userId: req.user.id },
      data,
      { upsert: true, new: true }
    );

    res.json(student);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET PROFILE
export const getProfile = async (req, res) => {
  try {

    const student = await Student.findOne({
      userId: req.user.id,
    });

    res.json(student);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
