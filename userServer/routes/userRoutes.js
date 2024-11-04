import express from "express";
import {
  register,
  login,
  forgetPassword,
  verifyOtp,
  updatePassowrd,
  getOtpTime,
  getAccess,
} from "../controllers/register.js";
const router = express.Router();

router.route("/register").post(register);
router.post("/login", login);
router.post("/forget-password", forgetPassword);
router.post("/otp", verifyOtp);
router.patch("/update-password", updatePassowrd);
router.post("/otp-time", getOtpTime);
router.post("/get-access", getAccess);

export default router;
