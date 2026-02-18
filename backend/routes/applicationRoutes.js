import express from "express";
import {
  applyJob,
  getApplicants,
  updateStatus,
} from "../controllers/applicationController.js";

import { protect } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// student applies to job
router.post(
  "/apply",
  protect,
  allowRoles("student"),
  applyJob
);

// officer views applicants for a job
router.get(
  "/job/:jobId",
  protect,
  allowRoles("officer"),
  getApplicants
);

// officer updates application status
router.put(
  "/:id",
  protect,
  allowRoles("officer"),
  updateStatus
);

export default router;
