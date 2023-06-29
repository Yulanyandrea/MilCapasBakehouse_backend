import { Schema,Document,model} from 'mongoose';
import bcrypt from 'bcrypt';
import { userProfile } from './user.type';

export interface UserDocument extends Document{
  fullname:string;
  password:string;
  email:string;
  role: 'USER' | 'ADMIN';
  address:string;
  passwordResetToken?: string;
  passwordResetExpires?: Date;

  profile: userProfile;

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
    enum:['USER','ADMIN'],
    default: 'USER',
  },
  email:{
    type:String,
    require:true
  },
  address:{
    type:String,
    require:true
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
},
  {
    timestamps:true,
    versionKey:false
  }
)

UserSchema.virtual("profile").get(function profile(){
  const { fullname, email, address } = this;

  return {
    fullname,
    email,
    address
  };
})

// Middlewares
UserSchema.pre('save', async function save(next: Function) {
  const user = this  as UserDocument;

  try {
    if(!user.isModified('password')) {
      return next();
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);

    user.password = hash;
  } catch (error: any) {
    next(error);
  }
});

// Methods
async function comparePassword(this: UserDocument, candidatePassword: string, next: Function): Promise<boolean> {
  const user = this;

  try {
    const isMatch = await bcrypt.compare(candidatePassword, user.password)

    return isMatch;
  } catch (error: any) {
    next(error);
    return false;
  }
};

UserSchema.methods.comparePassword = comparePassword;


const User = model<UserDocument>('user',UserSchema);
export default User;
