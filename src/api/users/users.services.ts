import { DocumentDefinition } from 'mongoose';
import User, {UserDocument} from './users.model';

export function createMilhojas (milhoja:DocumentDefinition<Omit<UserDocument,'createAt'|'updateAt'>>){
  return User.create(milhoja)
}

export function getAllMilhojas (){
  return User.find()
}

export function getMilhojaById(id:string){
  const milhoja = User.findById(id);
  return milhoja;
}

export function updateMilhoja(id:string, milhoja:DocumentDefinition<Omit<UserDocument,'createAt'|'updateAt'>>){
  const updateMilhoja = User.findByIdAndUpdate(id,milhoja,{new:true})
  return updateMilhoja;
}

export function deleteMilhoja(id:string){
  const deleteMilhoja = User.findByIdAndDelete(id);
  return deleteMilhoja;
}
