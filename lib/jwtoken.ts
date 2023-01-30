import jwt from 'jsonwebtoken';

export function generate(obj){
  return jwt.sign(obj, process.env.JWT_SECRET);
}
export function decode(token:string){
  try{
    const obj =  jwt.verify(token,process.env.JWT_SECRET);
    return obj;
  }catch(err){
    console.error('Token invalido')
  }
}