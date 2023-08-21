import type { NextApiRequest, NextApiResponse } from "next";
type queryPagination = {
  limit:number,
  offset:number,
}
const MaxLimit = 5;
export const parseParamsFromQuery = (limit:string,offset:string):queryPagination=>{
  let queryLimit = parseInt(limit);
  let queryOffset = parseInt(offset);
  queryLimit = queryLimit <= 0 || queryLimit > MaxLimit || isNaN(queryLimit) ?  MaxLimit : queryLimit;
  queryOffset = queryOffset < 0 || isNaN(queryOffset)? 0 : queryOffset;
  return {
    limit:queryLimit,
    offset:queryOffset
  }
}
export const middlewareRequest = (callback)=>{
  return function(req:NextApiRequest,res:NextApiResponse){
    try{
      const idParam = parseInt(req.query.id as string);
      if(isNaN(idParam)){
       throw 'Error: invalid param';
      }else{
        callback(req,res,idParam);
      }
    }catch(e){
      res.status(404).json(e);
    }
  }
}
export function checkTheAddressFields(adress:string){
  const fields = ['username','adress','phone'];
  const check = fields.find( f => f == adress );
  if(check){
    return true;
  }else{
    throw 'Error: Este campo no corresponde con los datos de usuario';
  }
}