import { DocumentDefinition, FilterQuery  } from 'mongoose';
import User, {UserDocument} from './users.model';

export function createUser (user:DocumentDefinition<Omit<UserDocument,'createAt'|'updateAt'>>){
  return User.create(user)
}

export function getAllUser (){
  return User.find()
}

export function getUser(filter: FilterQuery<UserDocument>){
  const user=User.findOne(filter);
  return user
}

export function getUserById(id:string){
  const user = User.findById(id);
  return user;
}

export function updateUser(id:string, user:DocumentDefinition<Omit<UserDocument,'createAt'|'updateAt'>>){
  const updateUser = User.findByIdAndUpdate(id,user,{new:true})
  return updateUser;
}

export function deleteMilhoja(id:string){
  const deleteMilhoja = User.findByIdAndDelete(id);
  return deleteMilhoja;
}
