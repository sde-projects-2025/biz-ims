import mongoose from "mongoose";
import { TryCatch } from "../middlewares/errorMiddlewares.js";
import User from "../models/userModel.js";
import { NewUserReqBody, UserType } from "../types/modelTypes/userTypes.js";
import ErrorHandler from "../utils/customError.js";
import { successResponse } from "../utils/responseFunction.js";
import { isObjectIdValid } from "../utils/validations/validateFunctions/commonValidationsFunctions.js";
import { isUserValid } from "../utils/validations/validateFunctions/userValidationFunctions.js";

export const getAllUsers = TryCatch(async (req, res, next) => {
  const users = await User.find({ isActive: true });

  return res
    .status(200)
    .json(successResponse(users, "Users Data Found Successfully!!"));
});

export const getUserById = TryCatch(async (req, res, next) => {
  const id: string = isObjectIdValid(req.params.id);

  const user = await User.findById(id);

  if (!user) {
    return next(new ErrorHandler("Users not Found !!", 404));
  }

  return res
    .status(200)
    .json(successResponse(user, `User by id ${id} retrieved successfully`));
});

export const addNewUser = TryCatch(async (req, res, next) => {
  const reqObj: NewUserReqBody = req.body;

  const supplierObj: UserType = {
    ...reqObj,
    isActive: true,
  };

  const validatedUser = isUserValid(supplierObj);

  const existingUser = await User.findOne({
    email: validatedUser.email,
  });

  if (existingUser) return next(new ErrorHandler("User already Exists!!", 403));

  const newUser = await User.create(validatedUser);

  return res
    .status(201)
    .json(successResponse(newUser, "User created successfully"));
});

export const updateUser = TryCatch(async (req, res, next) => {
  const id = isObjectIdValid(req.params.id);
  const reqObj: UserType = req.body;

  const validatedUser = isUserValid(reqObj);

  const existingUser = await User.findById(id);
  if (!existingUser) {
    return next(new ErrorHandler("User Not Found", 404));
  }

  const existingUserByemail = await User.findOne({
    email: validatedUser.email,
    _id: { $ne: new mongoose.Types.ObjectId(id) },
  });

  if (existingUserByemail) {
    return next(
      new ErrorHandler("User with same Email is already exists", 400)
    );
  }

  const updatedUser = await User.findByIdAndUpdate(id, validatedUser, {
    new: true,
  });

  return res
    .status(200)
    .json(successResponse(validatedUser, "User Updated Successfully"));
});

export const deleteUser = TryCatch(async (req, res, next) => {
  const id = isObjectIdValid(req.params.id);

  const existingUser = await User.findById(id);

  if (!existingUser)
    return next(new ErrorHandler(`User does not Exist!!`, 404));

  const deletedUser = await User.findByIdAndDelete(id);

  return res
    .status(200)
    .json(successResponse(deletedUser, "User deleted successfully"));
});
