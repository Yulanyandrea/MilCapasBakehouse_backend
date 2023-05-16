import { Request,Response,NextFunction } from 'express';
import Milhojas,{ MilhojaDocument } from './milhojas.model';
import { createMilhojas,
getAllMilhojas,
getMilhojaById,
deleteMilhoja,
updateMilhoja,
} from './milhojas.services';

export async function handleCreateMilhoja(req:Request,res:Response,next:NextFunction) {
  const data = req.body;
  try {
    const milhojas = await createMilhojas(data)
    return res.status(200).json(milhojas)
  } catch (error:any) {
    return res.status(500).json(error.message)
  }

}

export async function handleGetAllMilhojas(req:Request,res:Response,next:NextFunction) {
  try {
    const milhojas = await getAllMilhojas();
    return res.status(200).json(milhojas)
  } catch (error) {
    return res.status(500).json(error)

  }
}

export async function handleGetMilhojasId(req:Request,res:Response,next:NextFunction) {
  const { id } = req.params;
  try {
    const getMilhojas =await getMilhojaById(id);
    if(!getAllMilhojas){
      return res.status(404).json({message:"Milhoja not found"})
    }
  } catch (error) {
    return res.status(500).json(error)
  }
}

export async function handleUpdateMilhoja(req:Request,res:Response,next:NextFunction) {
  const data = req.body;
  const { id } = req.params;
  try {
    const updateMil = await updateMilhoja(id,data)
    return res.status(200).json(updateMil)
  } catch (error) {
    return res.status(500).json(error)
  }

}

export async function handleDeleteMilhoja(req:Request,res:Response,next:NextFunction) {
  const { id } = req.params;
  try {
    const milhoja = await getMilhojaById(id);
    if(!milhoja){
      return res.status(404).json({message:"milhoja not found"})
    }
    await milhoja.remove();
  } catch (error) {
    return res.status(505).json(error)
  }
}
