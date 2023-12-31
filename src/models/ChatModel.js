import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    user: { type: mongoose.ObjectId, ref: "User" },
    title: { type: String, required: [true, "Please add a title"] },
    conversations: [{ type: mongoose.ObjectId, ref: "Conversation" }, { timestamps: true }],
    is_shared: { type: Boolean, default: false },
    is_archived: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Chat", chatSchema);
