import { NextApiRequest, NextApiResponse } from 'next';
import methods from 'micro-method-router';
import { middlewareAuth } from 'lib/middleware';
import * as yup from 'yup';

let bodySchema = yup.object().shape({
  adress: yup.string().required()
});
// falta resolver si lo parametros para modificar los datos del usuario
// van a ser por query o por body
const postMe = async (req:NextApiRequest,res:NextApiResponse)=>{
  const { adress } = req.query;
  res.json({test:true})
}
const handlerSchemaMiddleware = querySchema(postMe,bodySchema);

function querySchema(handle,body){
  return function(req:NextApiRequest,res:NextApiResponse){
    console.log(req.query);
  }
}



const handle = methods({
  patch:handlerSchemaMiddleware,
})
export default middlewareAuth(handle);