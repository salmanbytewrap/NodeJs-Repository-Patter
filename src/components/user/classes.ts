import { Document } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    phone: number;
    verified:boolean,
    password:string
  }