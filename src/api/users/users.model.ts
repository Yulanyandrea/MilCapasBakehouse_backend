import { Schema,Document,model} from 'mongoose';

export interface UserDocument extends Document{
  fullname:string;
  password:string;
  email:string;
  role:string;

  createdAt: Date;
  updateAt:Date;
}

const UserSchema = new Schema({
  fullname:{
    type:String,
    require:true
  },
  password:{
    type:String,
    require:true
  },
  role:{
    type:String,
    default:'ADMIN'

  },
  email:{
    type:String,
    require:true
  },
},
  {
    timestamps:true,
    versionKey:false
  }
)

const User = model<UserDocument>('user',UserSchema);
export default User;
