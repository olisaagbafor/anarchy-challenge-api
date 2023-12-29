import express from "express";
import passport from "passport";
import { googleOAuth } from "../middlewares/passportConfig.js";
googleOAuth(passport);

import { login, logout, getMe, register, updateDetails, forgotPassword, confirmVerifyEmail, verifyEmail, resetPassword, updatePassword, sendTokenResponse } from "../controllers/authController.js";

import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

// =============== Google Authentication ======================
router.get("/google", passport.authenticate("google", { scope: ["email", "profile"] }));

router.get("/google/callback", passport.authenticate("google", { session: false }), (req, res) => {
  sendTokenResponse(req.user, 200, res);
});

router.post("/login", login);
router.get("/logout", logout);
router.get("/verify-email/:verifyToken", confirmVerifyEmail);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:resetToken", resetPassword);
router.get("/me", authenticate, getMe);
router.post("/register", register);
router.put("/me/update-details", authenticate, updateDetails);
router.put("/me/update-password", authenticate, updatePassword);

export default router;
