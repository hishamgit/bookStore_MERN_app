import dotenv from 'dotenv'
dotenv.config()
import jwt from 'jsonwebtoken';

export const createSecretToken=(id,email,username)=>{
   return jwt.sign({id,email,username},
      process.env.JWT_KEY,{
      expiresIn:"1h"
   })
}