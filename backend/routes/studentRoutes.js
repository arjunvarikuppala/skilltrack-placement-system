import express from "express";
import {
  saveProfile,
  getProfile
} from "../controllers/studentController.js";

import { protect } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Only students
router.post(
  "/profile",
  protect,
  allowRoles("student"),
  saveProfile
);

router.get(
  "/profile",
  protect,
  allowRoles("student"),
  getProfile
);

export default router;
