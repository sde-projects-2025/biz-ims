import { Schema, model } from "mongoose";
import { IRole } from "../types/modelTypes/roleTypes.js";

const roleSchema: Schema<IRole> = new Schema(
  {
    roleId: {
      type: String,
      required: [true, "Please enter Role Identity"],
    },
    roleName: {
      type: String,
      required: [true, "Please enter Role Name"],
    },
  },
  { timestamps: true }
);

const Role = model<IRole>("Role", roleSchema);

export default Role;
