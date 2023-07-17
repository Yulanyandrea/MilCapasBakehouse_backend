import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

import { userProfile } from './user.type';

export interface UserDocument extends Document {
  completeName: string;
  email: string;
  password: string; // 1234 -> hash - SHA256 -> 64 chars -> 32 bytes ->
  role: 'USER' | 'ADMIN';
  address:string;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  createdAt: Date;
  updatedAt: Date;


  profile: userProfile;
  comparePassword: (password: string) => Promise<boolean>;
}

const UserSchema= new Schema({
completeName:{
    type:String,
    require:true,
  },
  email:{
    type:String,
    require:true,
    unique:true,
  },
  address:{
    type:String,
    unique:true,
  },
  password:{
    type:String,
    require:true,
    min:6,
  },
  role:{
    type:String,
    enum:['USER','ADMIN'],
    default: 'USER',
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
},
  {
    timestamps:true,
    versionKey:false

  });

// Virtuals
UserSchema.virtual('profile').get(function profile() {
  const { completeName, email, address } = this;

  return {
    completeName,
    email,
    address
  };

});

// Middlewares
UserSchema.pre('save', async function save(next: Function) {
  const user = this as UserDocument;

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

const User = model<UserDocument>('User', UserSchema);

export default User;
