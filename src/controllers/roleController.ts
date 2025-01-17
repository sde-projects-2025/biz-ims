import { Request, Response, NextFunction } from "express";
import Role from "../models/roleModel.js";
import mongoose from "mongoose";
import { TryCatch } from "../middlewares/errorMiddlewares.js";
import { successResponse } from "../utils/responseFunction.js";
import ErrorHandler from "../utils/customError.js";
import { NewRoleReqBody } from "../types/modelTypes/roleTypes.js";

export const getAllRolesData = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const roles = await Role.find({});

    return res
      .status(200)
      .json(successResponse(roles, "Roles Data Fetched Successfully"));
  }
);

export const deleteRole = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const existingRole = await Role.findById(id);

    if (!existingRole) {
      return next(new ErrorHandler(`Role ${id} does not Exist!!`, 404));
    }

    const deletedRole = await Role.findByIdAndDelete(id);

    return res
      .status(200)
      .json(successResponse(deletedRole, "Role deleted successfully"));
  }
);

export const updateRole = TryCatch(async (req, res, next) => {
  const { roleId, roleName }: NewRoleReqBody = req.body;
  const id = req.params.id;

  const existingRole = await Role.findById(id);
  if (!existingRole) {
    return next(new ErrorHandler("Invalid Role ID", 400));
  }

  const existingRoleByName = await Role.findOne({
    roleId: roleId,
    roleName: roleName,
    _id: { $ne: new mongoose.Types.ObjectId(id) },
  });

  if (existingRoleByName) {
    return next(new ErrorHandler("Role name already exists", 400));
  }

  const updatedRole = await Role.findByIdAndUpdate(
    id,
    { roleId, roleName },
    { new: true }
  );

  return res
    .status(200)
    .json(successResponse(updatedRole, "Role Update Successfully"));
});

export const createRole = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { roleId, roleName }: NewRoleReqBody = req.body;

    const existingRole = await Role.findOne({ roleId });

    if (existingRole) {
      return next(new ErrorHandler("Role already Exists!!", 403));
    }

    const newRole = new Role({ roleId, roleName });

    await newRole.save();

    return res
      .status(201)
      .json(successResponse(newRole, "Role created successfully"));
  }
);

export const getRoleById = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const role = await Role.findById(id);

    if (!role) {
      return next(new ErrorHandler("Role not found !!", 404));
    }

    return res
      .status(200)
      .json(successResponse(role, `Role by id ${id} retrieved successfully`));
  }
);
