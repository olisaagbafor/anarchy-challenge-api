import { Strategy as GoogleStrategy } from "passport-google-oauth20";

import dotenv from "dotenv";
import UserModel from "../models/UserModel.js";
dotenv.config();

export const googleOAuth = (passport) => {
  // passport.use(
  //   new GoogleStrategy(
  //     {
  //       clientID: process.env.GOOGLE_CLIENT_ID,
  //       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  //       callbackURL: "http://localhost:5000/api/v1/auth/google/callback",
  //       passReqToCallback: true,
  //       scope: ["profile", "email", "openid", "https://www.googleapis.com/auth/user.birthday.read", "https://www.googleapis.com/auth/user.gender.read"],
  //     },
  //     async function (accessToken, refreshToken, profile, cb) {
  //       try {
  //         user = await UserModel.create(newUser);
  //         // return done(null, user);
  //         UserModel.findOrCreate({ googleId: profile.id }, function (err, user) {
  //           return cb(err, user);
  //         });
  //       } catch (err) {
  //         return cb();
  //       }
  //     }
  //   )
  // );

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/api/v1/auth/google/callback",
        // passReqToCallback: true,
        scope: ["profile", "email"],
        // scope: ["profile", "email", "openid", "https://www.googleapis.com/auth/user.birthday.read", "https://www.googleapis.com/auth/user.gender.read"],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await UserModel.findOne({ email: profile._json.email });
          // if user exists return the user
          if (user) {
            return done(null, user);
          }
          // if user does not exist create a new user</em>;
          let newUser = {
            display_name: profile._json.name,
            email: profile._json.email,
            picture: profile._json.picture,
          };
          user = await UserModel.create(newUser);
          return done(null, user);
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );
};
