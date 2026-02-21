import express from "express";
import {
  applyJob,
  getApplicants,
  updateStatus,
} from "../controllers/applicationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/apply", protect, applyJob);
router.get("/job/:jobId", protect, getApplicants);
router.put("/:id/status", protect, updateStatus);

export default router;