import { DocumentDefinition } from 'mongoose';
import Customer , {CustomerDocument} from './customers.model';


export function createCustomer (customer:DocumentDefinition<Omit<CustomerDocument,'createAt'|'updateAt'>>){
  return Customer.create(customer)
}

export function getAllCustomer (){
  return  Customer.find()
}

export function getCustomerById(id:string){
  const customer = Customer.findById(id);
  return customer;
}

export function updateCustomer(id:string, customer:DocumentDefinition<Omit<CustomerDocument,'createAt'|'updateAt'>>){
  const updateCustomer = Customer.findByIdAndUpdate(id,customer,{new:true})
  return updateCustomer;
}

export function deleteCustomer(id:string){
  const deleteMilhoja = Customer.findByIdAndDelete(id);
  return deleteMilhoja;
}
