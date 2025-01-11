import { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  roleId: Schema.Types.ObjectId;
  storeId: Schema.Types.ObjectId;
  isActive: boolean;
}
