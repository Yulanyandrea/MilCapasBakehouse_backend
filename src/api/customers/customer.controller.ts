import { Request,Response,NextFunction } from 'express';
import Customer,{ CustomerDocument } from './customers.model';
import { createCustomer,
getAllCustomer,
getCustomerById,
updateCustomer,
} from './customer.services';

export async function handleCreateCustomer(req:Request,res:Response,next:NextFunction) {
  const data = req.body;
  try {
    const customer = await createCustomer(data)
    return res.status(200).json(customer)
  } catch (error:any) {
    return res.status(500).json(error.message)
  }

}

export async function handleGetCustomer(req:Request,res:Response,next:NextFunction) {
  try {
    const milhojas = await getAllCustomer();
    return res.status(200).json(milhojas)
  } catch (error) {
    return res.status(500).json(error)

  }
}

export async function handleGetCustomerId(req:Request,res:Response,next:NextFunction) {
  const { id } = req.params;
  try {
    const getCustomer =await getCustomerById(id);
    if(!getCustomer){
      return res.status(404).json({message:"Customer not found"})
    }
  } catch (error) {
    return res.status(500).json(error)
  }
}

export async function handleUpdateCustomer(req:Request,res:Response,next:NextFunction) {
  const data = req.body;
  const { id } = req.params;
  try {
    const updateCus = await updateCustomer(id,data)
    return res.status(200).json(updateCus)
  } catch (error) {
    return res.status(500).json(error)
  }

}

export async function handleDeleteCustomer(req:Request,res:Response,next:NextFunction) {
  const { id } = req.params;
  try {
    const customer = await getCustomerById(id);
    if(!customer){
      return res.status(404).json({message:"customer not found"})
    }
    await customer.remove();
  } catch (error) {
    return res.status(505).json(error)
  }
}

