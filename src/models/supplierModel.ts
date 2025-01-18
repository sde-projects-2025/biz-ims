import { Schema, model } from "mongoose";
import { ISupplier } from "../types/modelTypes/supplierTypes.js";
import validator from "validator";

const supplierSchema: Schema<ISupplier> = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter Supplier Name"],
      trim: true,
    },
    contactPersonName: {
      type: String,
      required: [true, "Please enter Supplier Contact"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Please enter Supplier Phone Number"],
      validate: validator.default.isMobilePhone,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please enter Email"],
      unique: [true, "Email Already Exists"],
      lowercase: true,
      trim: true,
      validate: validator.default.isEmail,
    },
    address: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Supplier = model<ISupplier>("Supplier", supplierSchema);

export default Supplier;
