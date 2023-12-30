import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    display_name: {
      type: String,
      required: [true, "Please what should we call you"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please add an email address"],
      unique: true,
      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please add a valid email, got {VALUE}."],
    },
    picture: String,
  },
  {
    timestamps: true,
  }
);

// Sign JWT and return token
userSchema.methods.getSignedJWT = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Compares entered password with stored password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.statics.findOneOrCreate = async function (profile) {
  if (!profile) return null;
  let user = await this.model("User").findOne({ email: profile.email });
  if (!user) {
    user = await this.model("User").create(profile);
  }
  return user;
};

export default mongoose.model("User", userSchema);
