import express from "express";
import UserModel from "../models/UserModel.js";
import advancedResults from "../middlewares/advancedResults.js";
import { authenticate, authorize } from "../middlewares/authMiddleware.js";

import { getUsers, getSingleUser, createUser, updateUser, deleteUser } from "../controllers/usersController.js";

const router = express.Router();

router.get("/", advancedResults(UserModel), getUsers);
router.post("/", authenticate, createUser);
router.get("/:id", authenticate, getSingleUser);
router.put("/:id", authenticate, authorize("admin"), updateUser);
router.delete("/:id", authenticate, authorize("admin"), deleteUser);

export default router;
