import type { NextApiRequest, NextApiResponse } from 'next';
import methods from 'micro-method-router';
import { sendCode } from 'controllers/auth';
import { authBodySchema } from 'lib/schema';
import { handlerCORS } from 'lib/middleware';

const postAuthMe = async (req:NextApiRequest,res:NextApiResponse)=>{
  const { email } = req.body;
  try{
    await sendCode(email);
    res.json({message:'the code was sent to this email: ' + email});
  }catch(e){
    res.status(404).json({Error:e.message});
  }
}
const postAuthMeWithValidate = authBodySchema(postAuthMe);
const handle = methods({
  post:postAuthMeWithValidate
})
export default handlerCORS(handle)
