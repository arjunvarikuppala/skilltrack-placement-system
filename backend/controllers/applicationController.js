import Job from "../models/Job.js";
import Student from "../models/Student.js";
import Application from "../models/Application.js";

// STUDENT APPLY
export const applyJob = async (req, res) => {
  try {
    const { jobId } = req.body;

    const job = await Job.findById(jobId);
    const student = await Student.findOne({ userId: req.user.id });

    if (!job || !student) {
      return res.status(404).json({ message: "Job or Student not found" });
    }

    if (student.cgpa < job.minCGPA) {
      return res.status(403).json({ message: "CGPA not eligible" });
    }

    if (student.backlogs > job.maxBacklogs) {
      return res.status(403).json({ message: "Backlogs not eligible" });
    }

    const missingSkills = job.requiredSkills.filter(
      skill => !student.skills.includes(skill)
    );

    if (missingSkills.length > 0) {
      return res.status(403).json({
        message: "Missing required skills",
        missingSkills,
      });
    }

    const exists = await Application.findOne({
      jobId,
      studentId: req.user.id,
    });

    if (exists) {
      return res.status(400).json({ message: "Already applied" });
    }

    const application = await Application.create({
      jobId,
      studentId: req.user.id,
    });

    res.status(201).json({
      message: "Application submitted",
      application,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// OFFICER VIEW APPLICANTS
export const getApplicants = async (req, res) => {
  try {
    const { jobId } = req.params;

    const applications = await Application.find({ jobId })
      .populate("studentId", "name email")
      .populate("jobId", "title");

    res.json(applications);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// OFFICER UPDATE STATUS
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(application);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
