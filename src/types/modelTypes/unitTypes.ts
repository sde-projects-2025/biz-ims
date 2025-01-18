import { Document } from "mongoose";

export interface IUnit extends Document {
  unitName: string;
  unitAbbreviation: string;
}

export interface NewUnitReqBody {
  unitName: string;
  unitAbbreviation: string;
}
