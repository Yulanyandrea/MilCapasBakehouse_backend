import * as dotenv from 'dotenv';
import express from 'express';
import configExpress from './config/express';
import conectDb from './config/database';
import routes from './routes';

dotenv.config();
const app=express();

const port=process.env.Port || 8080;
configExpress(app)
conectDb()
routes(app)

app.listen(port, ()=>{
  console.log(`server is running on port ${port}`)
})
