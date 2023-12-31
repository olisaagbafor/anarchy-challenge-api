import colors from "colors";
import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";

export default function (app) {
  //invoking imported dependencies
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(
    cors({
      origin: ["http://localhost:3000", "https://anarchy-frontend-olisaagbafor.onrender.com"], // Allow requests from your React app's origin
      methods: "GET,POST,PUT,DELETE", // Allow specific HTTP methods
      credentials: true, // Allow cookies for authenticated requests
    })
  );
  app.use(
    session({
      secret: process.env.COOKIE_SECRET,
      name: "anarchy-ai",
      cookie: { maxAge: 7200000, secure: process.env.NODE_ENV == "production" },
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
}
