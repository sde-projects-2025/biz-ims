import { Document } from "mongoose";

export interface UnitType {
  unitName: string;
  unitAbbreviation: string;
}

export interface IUnit extends UnitType, Document {}

export interface NewUnitReqBody extends UnitType {}
