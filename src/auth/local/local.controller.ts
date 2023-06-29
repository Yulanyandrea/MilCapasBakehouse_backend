import { Request, Response, NextFunction } from 'express';
import { getUser } from '../../api/users/users.services';
import { signToken } from '../auth.services';

export  async function handleLoginUser(req:Request,res:Response,next:NextFunction){
  const { email, password }=req.body;
  try {
    const userLogIn = await getUser({email});
    if(!userLogIn){
      return res.status(404).json({message:'Invalid email or password'})
    }

    const validatePassword = await userLogIn.comparePassword(password)
    if(!validatePassword){
      return res.status(404).json({message:'Invalid email or password'})
    }
    const payload = userLogIn.profile;

    //token
    const token = signToken(payload);
    return res.status(200).json({profile:userLogIn,token})
  } catch (error:any) {
    return res.status(500).json(error.message)

  }
}
