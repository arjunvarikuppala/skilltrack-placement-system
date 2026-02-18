import Job from "../models/Job.js";

export const createJob = async (req, res) => {
  const job = await Job.create(req.body);
  res.status(201).json(job);
};

export const getJobs = async (req, res) => {
  const jobs = await Job.find({ status: "open" })
    .populate("companyId", "name location");
  res.json(jobs);
};
