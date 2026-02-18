import express from "express";
import { createCompany, getCompanies } from "../controllers/companyController.js";
import { protect } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", protect, allowRoles("officer"), createCompany);
router.get("/", protect, getCompanies);

export default router;
