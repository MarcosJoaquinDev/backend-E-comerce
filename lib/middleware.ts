import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';
import { decode } from 'lib/jwtoken';
import parse from 'parse-bearer-token';
// ver- testear
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
export function handlerCORS(callback) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    // Run the cors middleware
    // nextjs-cors uses the cors package, so we invite you to check the documentation https://github.com/expressjs/cors
    await NextCors(req, res, {
      // Options
      methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
      origin: "*",
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });

    // Rest of the API logic
    callback(req, res);
    //res.json({ message: "Hello NextJs Cors!" });
  };
}