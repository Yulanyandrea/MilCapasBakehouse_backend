import { Request,Response,NextFunction } from 'express';
import { createUser,
  getAllUser,
  getUserById,
  updateUser
} from './users.services';

export async function handleCreateUser(req:Request,res:Response,next:NextFunction) {
  const data = req.body;
  try {
    const user = await createUser(data)
    return res.status(200).json(user)
  } catch (error:any) {
    return res.status(500).json(error.message)
  }

}

export async function handleGetAllUsers(req:Request,res:Response,next:NextFunction) {
  try {
    const user = await getAllUser();
    return res.status(200).json(user)
  } catch (error) {
    return res.status(500).json(error)

  }
}

export async function handleGetUsersId(req:Request,res:Response,next:NextFunction) {
  const { id } = req.params;
  try {
    const getUser =await getUserById(id);
    if(!getUser){
      return res.status(404).json({message:"User not found"})
    }
  } catch (error) {
    return res.status(500).json(error)
  }
}

export async function handleUpdateUser(req:Request,res:Response,next:NextFunction) {
  const data = req.body;
  const { id } = req.params;
  try {
    const updateU = await updateUser(id,data)
    return res.status(200).json(updateU)
  } catch (error) {
    return res.status(500).json(error)
  }

}

export async function handleDeleteUser(req:Request,res:Response,next:NextFunction) {
  const { id } = req.params;
  try {
    const user = await getUserById(id);
    if(!user){
      return res.status(404).json({message:"user not found"})
    }
    await user.remove();
  } catch (error) {
    return res.status(505).json(error)
  }
}
