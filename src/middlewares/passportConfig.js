import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";

import dotenv from "dotenv";
import UserModel from "../models/UserModel.js";
dotenv.config();

export const gitHubOAuth = (passport) => {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: `${process.env.API_DOMAIN}/github/callback`,
      },
      async function (accessToken, refreshToken, profile, done) {
        const userProfile = {
          display_name: profile._json.name,
          email: profile._json.email,
          picture: profile._json.avatar_url,
        };
        try {
          const user = await UserModel.findOneOrCreate(userProfile);
          return done(null, user);
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );

  manageUser(passport);
};

export const googleOAuth = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.API_DOMAIN}/google/callback`,
        // passReqToCallback: true,
        scope: ["profile", "email"],
        // scope: ["profile", "email", "openid", "https://www.googleapis.com/auth/user.birthday.read", "https://www.googleapis.com/auth/user.gender.read"],
      },
      async (accessToken, refreshToken, profile, done) => {
        const userProfile = {
          display_name: profile._json.name,
          email: profile._json.email,
          picture: profile._json.picture,
        };
        try {
          const user = await UserModel.findOneOrCreate(userProfile);
          return done(null, user);
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );

  manageUser(passport);
};

const manageUser = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};
