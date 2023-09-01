import jwt, { decode } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { getUser } from '../api/users/users.services';
import { UserDocument } from '../api/users/users.model';
import { AuthTypes, roles } from './auth.types';
import { token } from 'morgan';

const key=process.env.MONGO_DB_URI as string


//sign token
export function signToken(payload:any){
  const token=jwt.sign(payload,key,{expiresIn:'10h'})
  return token;
}

// verify token
export function verifyToken(token:string): UserDocument | boolean {
  try {
    const decoded=jwt.verify(token,key) as UserDocument
    return decoded

  } catch (error) {
    return false
  }
}

// authenticated
export async function Auth(req:AuthTypes,res:Response,next:NextFunction){
  const token=req.headers?.authorization?.split(' ')[1];
  if(!token){
    return res.status(404).json({message:'Unauthorized'})
  }
  const decode=verifyToken(token) as UserDocument
  if(!decode){
    return res.status(401).json({message:'Unauthorized'})
  }
  const user= await getUser({email:decode.email})
  if(!user){
    return res.status(401).json({message:'Unauthorized'})
  }
  req.user=user
  next();
  return true
}

// role
export function handleRole(allRoles:roles){
  return (req:AuthTypes,res:Response,next:NextFunction)=>{
    const { role }=req.user as UserDocument;
    if(!allRoles.includes(role)){
      return res.status(403).json({message:'Forbidden'})
    }
    next();
    return true;
  }

}
