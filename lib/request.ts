import type { NextApiRequest, NextApiResponse } from "next";
type queryPagination = {
  limit:number,
  offset:number,
}
const MaxLimit = 10;
//testear
export const parseParamsFromQuery = (req:NextApiRequest):queryPagination=>{
  let queryLimit = parseInt(req.query.limit as string);
  let queryOffset = parseInt(req.query.offset as string);
  queryLimit = queryLimit <= 0 || queryLimit > MaxLimit || isNaN(queryLimit) ?  MaxLimit : queryLimit;
  queryOffset = queryOffset < 0 || isNaN(queryOffset)? 0 : queryOffset;
  return {
    limit:queryLimit,
    offset:queryOffset
  }
}
//testear
export const middlewareRequest = (callback)=>{
  return function(req:NextApiRequest,res:NextApiResponse){
    try{
      const idParam = parseInt(req.query.id as string);
      if(isNaN(idParam)){
       throw 'Error: no es un numero';
      }else{
        callback(req,res,idParam);
      }
    }catch(e){
      res.status(404).json(e);
    } 
  }
}
// testear
export function checkTheAddressFields(adress:string){
  const fields = ['name','lastname','email','username'];
  const check = fields.find( f => f == adress );
  if(check){
    return true;
  }else{
    throw 'Error: Este campo no corresponde con los datos de usuario';
  }
}