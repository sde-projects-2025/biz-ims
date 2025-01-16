import { Document } from "mongoose";

export interface IRole extends Document {
  roleId: string;
  roleName: string;
}

export interface NewRoleReqBody {
  roleId: string;
  roleName: string;
}
