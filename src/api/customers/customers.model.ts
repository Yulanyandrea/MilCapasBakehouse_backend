import { Schema,Document,model} from 'mongoose';

export interface CustomerDocument extends Document{
  fullName:string;
  address:string;
  phone:string;
  finalOrder:string;
  finalPayment:number;

  createdAt: Date;
  updateAt:Date;

}

const CustomerSchema = new Schema({
  fullName:{
    type:String,
    require:true
  },
  address:{
    type:String,
    require:true
  },
  phone:{
    type:String,
    require:true
  },
  finalOrder:{
    type:String,
    require:true
  },
  finalpayment:{
    type:Number,
    require:true
  },
},{
  timestamps:true,
  versionKey:false
})

const Customer = model<CustomerDocument>('customer',CustomerSchema);
export default Customer;
