import mongoose from "mongoose";

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

userSchema.statics.findOneOrCreate = async function (profile) {
  if (!profile) return null;
  let user = await this.model("User").findOne({ email: profile.email });
  if (!user) {
    user = await this.model("User").create(profile);
  }
  return user;
};

export default mongoose.model("User", userSchema);
