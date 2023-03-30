import { NextApiRequest, NextApiResponse } from 'next';
import { middlewareAuth } from 'lib/middleware';
import { UserDataSchema } from 'lib/schema'
import methods from 'micro-method-router';
import  { getUser, setUserData } from 'controllers/user'
import { handlerCORS } from 'lib/middleware';

const handle = methods({
  async get(req:NextApiRequest,res:NextApiResponse,token){
    const data = await getUser(token.email);
    res.json({data})
  },
  async post(req:NextApiRequest,res:NextApiResponse,token){
    try{
      await UserDataSchema.validate(req.body);
      const data = await setUserData(token.email,req.body);
      res.json({data})
    }catch(e){
      res.status(400).json({queryError:e})
    }
  },
})

const handleMe =  middlewareAuth(handle);
export default handlerCORS(handleMe);