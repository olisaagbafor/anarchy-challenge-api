import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.ObjectId, ref: "User" },
    question: { type: String, required: true },
    responses: [mongoose.Schema.Types.Mixed],
  },
  { timestamps: true }
);

export default mongoose.model("Conversation", conversationSchema);
