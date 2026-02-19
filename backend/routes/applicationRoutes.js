import express from "express";
import {
  applyJob,
  getApplicants,
  updateStatus,
} from "../controllers/applicationController.js";

import { protect } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();


// ==============================
// STUDENT → APPLY JOB
// ==============================
router.post(
  "/apply",
  protect,
  allowRoles("student"),
  applyJob
);


// ==============================
// OFFICER → VIEW APPLICANTS
// ==============================
router.get(
  "/job/:jobId",
  protect,
  allowRoles("officer"),
  getApplicants
);


// ==============================
// OFFICER → UPDATE STATUS
// ==============================
router.put(
  "/status/:id",
  protect,
  allowRoles("officer"),
  updateStatus
);


export default router;
