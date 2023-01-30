import { NextApiRequest, NextApiResponse } from 'next';
import { middlewareAuth } from 'lib/middleware';
import methods from 'micro-method-router';
import  { getUser, setUser } from 'controllers/user'

const handle = methods({
  async get(req:NextApiRequest,res:NextApiResponse,token){
    const data = await getUser(token.email);
    res.json({data})
  },
  async patch(req:NextApiRequest,res:NextApiResponse,token){
    const modify  = req.body;
    const result = await setUser(token.email,modify);
    res.json({result})
  }
})
export default middlewareAuth(handle);
