import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    responses: [mongoose.Schema.Types.Mixed],
  },
  { timestamps: true }
);

export default mongoose.model("Conversation", conversationSchema);
