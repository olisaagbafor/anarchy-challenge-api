import express from "express";
import ChatModel from "../models/ChatModel.js";
import advancedResults from "../middlewares/advancedResults.js";
import { authenticate } from "../middlewares/authMiddleware.js";

import { getChats, getChat, createChat, updateChat, deleteChat } from "../controllers/chatsControler.js";

import conversationsRoutes from "./conversationsRoutes.js";

const router = express.Router({ mergeParams: true });

router.get("/", advancedResults(ChatModel, ["user"]), getChats);
router.post("/", authenticate, createChat);
router.get("/:id", authenticate, getChat);
router.put("/:id", authenticate, updateChat);
router.delete("/:id", authenticate, deleteChat);

router.use("/:chat_id/conversations", conversationsRoutes);

export default router;
