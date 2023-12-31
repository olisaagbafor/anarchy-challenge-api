import ChatModel from "../models/ChatModel.js";
import ErrorResponse from "../helpers/ErrorResponse.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import UserModel from "../models/UserModel.js";
import ConversationModel from "../models/ConversationModel.js";
import textGenerator, { getRandomNumber } from "../helpers/textGenerator.js";

//@description: Get All Chat
//@return: json object of Chat
//@route:   GET /api/v1/users/:user_id/chats
//@route:   GET /api/v1/chats
//@access: Private
export const getChats = asyncHandler(async (req, res, next) => {
  if (req.params.user_id) {
    const user = await UserModel.findById(req.params.user_id);

    if (!user) {
      return next(new ErrorResponse("User not found", 404));
    }

    const chats = await ChatModel.find({ user: req.params.user_id }).sort("-createdAt");
    res.status(200).json({ success: true, count: chats.length, data: chats });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

//@description: Get a Chat
//@return:  object of Chat
//@route:   GET /api/v1/chats/:id
//@access:  Private
export const getChat = asyncHandler(async (req, res, next) => {
  const chat = await ChatModel.findById(req.params.id);

  if (!chat) {
    return next(new ErrorResponse("Chat not found", 404));
  }

  res.status(200).send({ success: true, data: chat });
});

//@description: Create new Chat
//@return:  object of Chat
//@route:   POST /api/v1/users/:user_id/chats
//@access:  Private
export const createChat = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findById(req.user._id);
  if (!user) {
    return next(new ErrorResponse("User not Found", 404));
  }

  const newConversation = {
    user: user,
    question: req.body.question,
    responses: [textGenerator.generateParagraphs(getRandomNumber(3))],
  };

  const conversation = await ConversationModel.create(newConversation);
  req.body.conversations = [conversation];
  req.body.user = user;
  req.body.title = textGenerator.generateWords(getRandomNumber(4));

  const chat = await ChatModel.create(req.body);

  res.status(201).json({ success: true, data: chat });
});

//@description: Update Chat
//@return:  object of Chat
//@route:   PUT /api/v1/chats/:id
//@access:  Private
export const updateChat = asyncHandler(async (req, res, next) => {
  const { user, ...rest } = req.body;
  const chat = await ChatModel.findByIdAndUpdate(req.params.id, rest, {
    new: true,
    runValidators: true,
  });

  if (!chat) {
    return next(new ErrorResponse("Chat not found", 404));
  }
  return res.status(200).send({ success: true, data: chat });
});

//@description: Delete Chat
//@return:  empty object
//@route:   DELETE /api/v1/chats/:id
//@access:  Private
export const deleteChat = asyncHandler(async (req, res, next) => {
  const chat = await ChatModel.findById(req.params.id);

  if (!chat) {
    return next(new ErrorResponse("Chat not found", 404));
  }

  chat.delete();

  return res.send({ success: true, data: {} });
});
