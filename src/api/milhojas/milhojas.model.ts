import { Schema,Document,model } from 'mongoose';

export interface MilhojaDocument extends Document{
  milhojaName:string;
  taste:string;
  detail:string;
  image:string;
  size:string;
  price:string;


  createdAt: Date;
  updateAt:Date;
}

const MilhojasSchema = new Schema({
  milhojaName:{
    type:String,
    require:true
  },
  taste:{
    type:String,
    require:true
  },
  detail:{
    type:String,
    require:true
  },
  image:{
    type:String,
    require: true
  },
  size:{
    type:String,
    require:true
  },
  price:{
    type:String,
    require:true
  },amount:{
    type:Number,
    default: 1
  }
},{
    timestamps:true,
    versionKey:false
  })

const Milhojas = model<MilhojaDocument>('Milhojas',MilhojasSchema);
export default Milhojas;
