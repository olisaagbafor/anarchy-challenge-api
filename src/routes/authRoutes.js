import express from "express";
import passport from "passport";
import { googleOAuth, gitHubOAuth } from "../middlewares/passportConfig.js";
import { logout, getMe, login, register } from "../controllers/authController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
googleOAuth(passport);
gitHubOAuth(passport);

const router = express.Router();

// =============== Google Authentication ======================
router.get("/google", passport.authenticate("google", { scope: ["email", "profile"] }));
router.get("/google/callback", passport.authenticate("google", { successRedirect: "/api/v1/auth/session" }));
// =============== GitHub Authentication ======================
router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));
router.get("/github/callback", passport.authenticate("github", { successRedirect: "/api/v1/auth/session" }));
router.get("/session", authenticate, (req, res, next) => res.redirect(`${process.env.CLIENT_DOMAIN}`));

router.post("/login", login);
router.get("/logout", logout);
router.post("/register", register);
router.get("/me", authenticate, getMe);

export default router;
