import Company from "../models/Company.js";

export const createCompany = async (req, res) => {
  try {
    const company = await Company.create({
      ...req.body,
      createdBy: req.user.id
    });
    res.status(201).json(company);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCompanies = async (req, res) => {
  const companies = await Company.find();
  res.json(companies);
};
