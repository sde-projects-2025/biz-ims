import { Schema, model } from "mongoose";
import { IUnit } from "../types/modelTypes/unitTypes.js";

const unitSchema: Schema<IUnit> = new Schema(
  {
    unitName: {
      type: String,
      required: [true, "Please enter Role Identity"],
      unique: [true, "Unit already exists"],
      trim: true,
    },
    unitAbbreviation: {
      type: String,
      required: [true, "Please enter Role Name"],
      trim: true,
    },
  },
  { timestamps: true }
);

const Units = model<IUnit>("Units", unitSchema);

export default Units;
