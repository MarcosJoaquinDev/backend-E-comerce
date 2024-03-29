import type { NextApiRequest, NextApiResponse } from 'next';
import * as yup from 'yup';

let AuthSchema = yup.object().shape({
  email: yup.string().required(),
}).noUnknown(true).strict();

function authBodySchema(callback){
  return async function(req:NextApiRequest,res:NextApiResponse){
    try{
      await AuthSchema.validate(req.body);
      callback(req,res);
    }catch(e){
      res.status(400).json({queryError:e})
    }
  }
}

let AuthTokenSchema = yup.object().shape({
  email: yup.string().required(),
  code: yup.number().positive().required(),
}).noUnknown(true).strict();

function authTokenBodySchema(callback){
  return async function(req:NextApiRequest,res:NextApiResponse){
    try{
      await AuthTokenSchema.validate(req.body);
      callback(req,res);
    }catch(e){
      res.status(400).json({queryError:e})
    }
  }
}
let UserDataSchema = yup.object().shape({
  username: yup.string(),
  adress: yup.string(),
  phone: yup.number(),
}).noUnknown(true).strict();

let ValueAddressSchema = yup.object().shape({
  value: yup.string().required(),
}).noUnknown(true).strict();

export { authBodySchema, authTokenBodySchema ,UserDataSchema ,ValueAddressSchema}