import { Schema, Document, model } from "mongoose";

interface IRole extends Document {
  roleName: "admin" | "manager" | "sales executive";
}

const roleSchema: Schema<IRole> = new Schema(
  {
    roleName: {
      type: String,
      required: [true, "Please enter Role"],
      enum: ["admin", "manager", "sales executive"],
      default: "sales executive",
    },
  },
  { timestamps: true }
);

const Role = model<IRole>("Role", roleSchema);

export default Role;
