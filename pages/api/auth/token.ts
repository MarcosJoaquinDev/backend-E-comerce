import {NextApiRequest,NextApiResponse} from 'next';
import methods from 'micro-method-router';
import { userToken } from 'controllers/user';
import { authTokenBodySchema } from 'lib/schema';
import { handlerCORS } from 'lib/middleware';

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

const handle = methods({
  post: handlerWithValidate
})
export default handlerCORS(handle);