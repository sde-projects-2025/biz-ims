import { Schema, model } from "mongoose";
import validator from "validator";
import { IUser } from "../types/modelTypes/userTypes.js";

const userSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter Name"],
    },
    email: {
      type: String,
      required: [true, "Please enter Email"],
      unique: [true, "Email Already Exists"],
      lowercase: true,
      trim: true,
      validate: validator.default.isEmail,
    },
    password: {
      type: String,
      required: [true, "Please enter Password"],
      minlength: 6,
    },
    roleId: {
      type: Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },
    storeId: {
      type: Schema.Types.ObjectId,
      ref: "Store",
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const User = model<IUser>("User", userSchema);

export default User;
