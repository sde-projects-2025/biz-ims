import { Document } from "mongoose";

export interface SupplierType {
  name: string;
  contactPersonName: string;
  phone: string;
  email: string;
  address: string;
  isActive: boolean;
}

export interface ISupplier extends SupplierType, Document {}

export interface NewSupplierReqBody extends SupplierType {}
