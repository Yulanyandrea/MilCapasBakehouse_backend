import { DocumentDefinition } from 'mongoose';
import Milhojas, {MilhojaDocument} from './milhojas.model';

export function createMilhojas (milhoja:DocumentDefinition<Omit<MilhojaDocument,'createAt'|'updateAt'>>){
  return Milhojas.create(milhoja)
}

export function getAllMilhojas (){
  return Milhojas.find()
}

export function getMilhojaById(id:string){
  const milhoja = Milhojas.findById(id);
  return milhoja;
}

export function updateMilhoja(id:string, milhoja:DocumentDefinition<Omit<MilhojaDocument,'createAt'|'updateAt'>>){
  const updateMilhoja = Milhojas.findByIdAndUpdate(id,milhoja,{new:true})
  return updateMilhoja;
}

export function deleteMilhoja(id:string){
  const deleteMilhoja = Milhojas.findByIdAndDelete(id);
  return deleteMilhoja;
}
