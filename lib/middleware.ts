import { NextApiRequest, NextApiResponse } from 'next';
import { decode } from 'lib/jwtoken';
import parse from 'parse-bearer-token';

export const middlewareAuth = (callback)=>{
  return function(req:NextApiRequest,res:NextApiResponse){
    const token = parse(req);    
    if(!token){
     res.status(401).json({message:'aca no hay token'});
    }
    const decodedToken = decode(token)
    if(decodedToken){
      callback(req,res,decodedToken);
    }else{
      res.status(401).json({message:'token incorrecto'})
    } 
  }
}