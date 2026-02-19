import Job from "../models/Job.js";
import Student from "../models/Student.js";
import Application from "../models/Application.js";


// ==============================
// STUDENT APPLY JOB
// ==============================
export const applyJob = async (req, res) => {
  try {
    const { jobId } = req.body;

    console.log("TOKEN USER ID:", req.user.id);
    console.log("JOB ID:", jobId);

    // 🔍 Find job
    const job = await Job.findById(jobId);

    // 🔍 Find student profile
    const student = await Student.findOne({
      userId: req.user.id,
    });

    console.log("FOUND STUDENT:", student);

    if (!job || !student) {
      return res.status(404).json({
        message: "Job or Student not found",
      });
    }

    // 🎓 Eligibility checks
    if (student.cgpa < job.minCGPA) {
      return res.status(403).json({
        message: "CGPA not eligible",
      });
    }

    if (student.backlogs > job.maxBacklogs) {
      return res.status(403).json({
        message: "Backlogs not eligible",
      });
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

    // 🛑 Prevent duplicate apply
    const exists = await Application.findOne({
      jobId,
      studentId: req.user.id,
    });

    if (exists) {
      return res.status(400).json({
        message: "Already applied",
      });
    }

    // ✅ Create application
    const application = await Application.create({
      jobId,
      studentId: req.user.id,
      status: "Pending",
    });

    res.status(201).json({
      message: "Application submitted",
      application,
    });

  } catch (err) {
    console.error("APPLY JOB ERROR:", err);
    res.status(500).json({
      error: err.message,
    });
  }
};



// ==============================
// GET APPLICANTS
// ==============================
export const getApplicants = async (req, res) => {
  try {
    const { jobId } = req.params;

    const applications = await Application.find({ jobId })
      .populate("studentId", "rollNo branch cgpa")
      .populate("jobId", "title companyName");

    res.json(applications);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// ==============================
// UPDATE APPLICATION STATUS
// ==============================
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
