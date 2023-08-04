import { Router } from "express";
import {
  deleteUserAccount,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController";
import { requireAuth } from "../middlewares/authentication";

const router = Router();

router.get("/profile", requireAuth, getUserProfile);
router.patch("/profile", requireAuth, updateUserProfile);
router.delete("/profile", requireAuth, deleteUserAccount);

export default router;
