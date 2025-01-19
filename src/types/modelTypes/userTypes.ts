import { Schema, Document } from "mongoose";

export interface UserType {
  name: string;
  email: string;
  password: string;
  roleId: string;
  storeId: string;
  isActive: boolean;
}

export interface IUser extends Omit<UserType, "roleId" | "storeId">, Document {
  roleId: Schema.Types.ObjectId;
  storeId: Schema.Types.ObjectId;
}

export interface NewUserReqBody extends UserType {}
