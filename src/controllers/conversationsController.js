import ConversationModel from "../models/ConversationModel.js";
import ErrorResponse from "../helpers/ErrorResponse.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import UserModel from "../models/UserModel.js";
import ChatModel from "../models/ChatModel.js";
import textGenerator, { getRandomNumber } from "../helpers/textGenerator.js";

//@description: Get All Conversation
//@return: json object of Conversation
//@route:   GET /api/v1/conversations
//@access: Private
export const getConversations = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

//@description: Get Single Conversation
//@return:  object of Conversation
//@route:   GET /api/v1/conversations/:id
//@access:  Private
export const getConversation = asyncHandler(async (req, res, next) => {
  const conversation = await ConversationModel.findById(req.params.id).populate("user");

  if (!conversation) {
    return next(new ErrorResponse("Conversation not found", 404));
  }

  res.status(200).send({ success: true, data: conversation });
});

//@description: Create new Conversation
//@return:  object of Conversation
//@route:   POST /api/v1/chats/:chat_id/conversations
//@access:  Private
export const createConversation = asyncHandler(async (req, res, next) => {
  const chat = await ChatModel.findById(req.params.chat_id);
  if (!chat) {
    return next(new ErrorResponse("Chat not Found", 404));
  }
  req.body.user = req.user._id;
  req.body.responses = [textGenerator.generateParagraphs(getRandomNumber(4))];
  const conversation = await ConversationModel.create(req.body);
  chat.conversations.unshift(conversation);
  await chat.save();

  res.status(201).json({ success: true, data: conversation });
});

//@description: Update Conversation
//@return:  object of Conversation
//@route:   PUT /api/v1/conversations/:id
//@access:  Private
export const updateConversation = asyncHandler(async (req, res, next) => {
  const conversation = await ConversationModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!conversation) {
    return next(new ErrorResponse("Conversation not found", 404));
  }
  return res.status(200).send({ success: true, data: conversation });
});

//@description: Update Conversation
//@return:  Conversation response
//@route:   PATCH /api/v1/conversations/:id
//@access:  Private
export const addResponse = asyncHandler(async (req, res, next) => {
  const conversation = await ConversationModel.findById(req.params.id);

  if (!conversation) {
    return next(new ErrorResponse("Conversation not found", 404));
  }
  const response = textGenerator.generateParagraphs(getRandomNumber(6));
  conversation.responses.unshift(response);
  await conversation.save();
  return res.status(200).send({ success: true, data: conversation });
});

//@description: Delete Conversation
//@return:  empty object
//@route:   DELETE /api/v1/conversations/:id
//@access:  Private
export const deleteConversation = asyncHandler(async (req, res, next) => {
  const conversation = await ConversationModel.findById(req.params.id);

  if (!conversation) {
    return next(new ErrorResponse("Conversation not found", 404));
  }

  conversation.delete();

  return res.send({ success: true, data: {} });
});
