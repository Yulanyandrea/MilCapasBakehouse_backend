import mongoose from "mongoose";

 async function conectDb() {
  const uri=process.env.MONGO_DB_URI;
  if(!uri){
    throw new Error('Mongo DB uri is not defined')
  }try {
    await mongoose.connect(uri)
    console.log('conected to data base')
  } catch (error) {
    console.error(error)
  }

}

export default conectDb;
