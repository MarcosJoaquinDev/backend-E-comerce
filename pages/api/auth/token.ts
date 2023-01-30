import {NextApiRequest,NextApiResponse} from 'next';
import methods from 'micro-method-router';
import { userToken } from 'controllers/user';
import { authTokenBodySchema } from 'lib/schema';

const postAuthToken = async (req:NextApiRequest,res:NextApiResponse)=>{
  const {email, code} = req.body; 
  const result = await userToken(email,code);
  if(result.error){
    res.status(401).json({Error:result.error})
  }else{
    res.json(result);
  }
}
const handlerWithValidate = authTokenBodySchema(postAuthToken);

export default methods({
  post: handlerWithValidate
})