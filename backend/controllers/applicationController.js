import Job from "../models/Job.js";
import Student from "../models/Student.js";
import Application from "../models/Application.js";


// ========================================
// STUDENT APPLY JOB
// ========================================
export const applyJob = async (req, res) => {
  try {
    const { jobId } = req.body;

    if (!jobId) {
      return res.status(400).json({
        message: "Job ID is required",
      });
    }

    // 1️⃣ Find Job
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    // 2️⃣ Find Student Profile
    const student = await Student.findOne({
      userId: req.user.id,
    });

    if (!student) {
      return res.status(404).json({
        message: "Student profile not found",
      });
    }

    // 3️⃣ Eligibility Checks
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

    // 4️⃣ Prevent Duplicate Application
    const exists = await Application.findOne({
      jobId,
      studentId: req.user.id,
    });

    if (exists) {
      return res.status(400).json({
        message: "You already applied for this job",
      });
    }

    // 5️⃣ Create Application (status uses default from model)
    const application = await Application.create({
      jobId,
      studentId: req.user.id,
    });

    res.status(201).json({
      message: "Application submitted successfully",
      application,
    });

  } catch (err) {
    console.error("APPLY JOB ERROR:", err);
    res.status(500).json({
      error: "Server error",
    });
  }
};


// ========================================
// GET APPLICANTS FOR A JOB (Company)
// ========================================
export const getApplicants = async (req, res) => {
  try {
    const { jobId } = req.params;

    const applications = await Application.find({ jobId })
      .populate({
        path: "studentId",
        select: "name email",
      })
      .populate({
        path: "jobId",
        select: "title companyName",
      });

    res.status(200).json(applications);

  } catch (err) {
    console.error("GET APPLICANTS ERROR:", err);
    res.status(500).json({
      error: "Server error",
    });
  }
};


// ========================================
// UPDATE APPLICATION STATUS (Company)
// ========================================
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        message: "Status is required",
      });
    }

    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    application.status = status;
    await application.save();

    res.status(200).json({
      message: "Status updated successfully",
      application,
    });

  } catch (err) {
    console.error("UPDATE STATUS ERROR:", err);
    res.status(500).json({
      error: "Server error",
    });
  }
};