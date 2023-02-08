import { NextApiRequest, NextApiResponse } from 'next';
import methods from 'micro-method-router';
import { middlewareAuth } from 'lib/middleware';
import { checkTheAddressFields } from 'lib/request'
import { ValueAddressSchema } from 'lib/schema'
import { setUser } from 'controllers/user'

const patchMe = async (req:NextApiRequest,res:NextApiResponse,token)=>{
  const adress  = req.query.adress as string;
  const {value} = req.body;
  const email = token.email;
  try{
    await ValueAddressSchema.validate(req.body);
    checkTheAddressFields(adress);
    const changes = { adress, value};
    await setUser(email,changes);
    const response = `the ${adress} field was successfully changed to ${value}`;
    res.json(response);
  }catch(err){
    res.status(404).json(err.message || err);
  }
}
const handle = methods({
  patch:patchMe,
})
export default middlewareAuth(handle);