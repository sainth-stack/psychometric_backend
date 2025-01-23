

// @desc Get all users

import UserModel from "../models/UserModel.js";
import { successResponse } from "../utils/responseHandler.js";

// @route GET /api/users
export const fetchAllUsers = async (req, res) => {
  const users = await UserModel.find();
  successResponse(res, 200, "Users fetched successfully", users);
};


// @desc Create a user
// @route POST /api/users
export const createUser = async (req, res) => {
  const { username, email } = req.body;

  if (!username || !email) {
    res.status(400);
    throw new Error("Username and email are required");
  }

  const userExists = await UserModel.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await UserModel.create({ username, email });
  successResponse(res, 201, "User created successfully", user);
};
