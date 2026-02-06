import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Only officer can access
router.get(
  "/officer",
  protect,
  allowRoles("officer"),
  (req, res) => {
    res.json({ message: "Welcome Officer" });
  }
);

// Any logged-in user
router.get(
  "/profile",
  protect,
  (req, res) => {
    res.json({ user: req.user });
  }
);

export default router;

