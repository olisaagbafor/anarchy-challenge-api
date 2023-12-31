import express from "express";
import ConversationModel from "../models/ConversationModel.js";
import advancedResults from "../middlewares/advancedResults.js";
import { authenticate } from "../middlewares/authMiddleware.js";

import { getConversations, getConversation, createConversation, updateConversation, deleteConversation } from "../controllers/conversationsController.js";

const router = express.Router({ mergeParams: true });

router.get("/", advancedResults(ConversationModel, ["user"]), getConversations);
router.post("/", authenticate, createConversation);
router.get("/:id", authenticate, getConversation);
router.put("/:id", authenticate, updateConversation);
router.delete("/:id", authenticate, deleteConversation);

export default router;
