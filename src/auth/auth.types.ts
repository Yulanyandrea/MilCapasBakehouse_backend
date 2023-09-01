import { Request } from "express";
import { UserDocument } from "../api/users/users.model";


export  interface AuthTypes extends Request{
  user?: UserDocument ;
}

export type role='USER'|'ADMIN';

export type roles=role[];
