import { verifyCodeAndExpires } from 'controllers/auth'
import { User } from 'models/User';
type resultToken = {
  token:string,
  error?:string,
}
type userData = {
  email:string;
  orders:[];
}
type modify = 'name' | 'lastname' | 'username';

async function userToken(email:string,code:number):Promise<resultToken>{
  const result = await verifyCodeAndExpires(email,code);
  const emailNotFound = !result;
  if(emailNotFound){
    return {token:null,error:'Este email no esta registrado'}
  }
  const codeVerify = result.res;
  if(codeVerify){
    const newUser = new User(result.userId);
    const token = await newUser.encryptedUserInformation();
    return {token};
   
  }else{
    return {token:null,error:result.message}
  }
}
async function getUser(email:string):Promise<userData> {
  const id = await User.userId(email);
  if(!id){
    return {email: 'Error con el email',orders:null }
  }
  const user = new User(id);
  await user.pull();
  return user.data;
} 
type AddressValueChanges = {
  adress:string,
  value:string,
} 
type ValueChanges = {
  name?:string,
  lastname?:string,
  username?:string,
} 
async function setUser(email:string,modify:AddressValueChanges):Promise<userData> {
  // modify Ejem : "name":"otro nombre"
  const id = await User.userId(email);
  if(!id){
    return {email: 'Error con el email',orders:null }
  }
  const user = new User(id);
  await user.pull();
  // traigo la data de firestore
  user.data[modify.adress] = modify.value;
  await user.push();
  return user.data;
}
async function setUserData(email:string,modify:ValueChanges):Promise<userData> {
  // modify Ejem : "name":"otro nombre"
  const id = await User.userId(email);
  if(!id){
    return {email: 'Error con el email',orders:null }
  }
  const user = new User(id);
  await user.pull();
  // traigo la data de firestore
  for (const m in modify) {
    modify[m]?
    user.data = {
      ...user.data,
      [m]:modify[m]
    }:
    ''
  }
  await user.push();
  return user.data;
}
async function setNewOrderInUserData(userId:string,orderId:string){
  const user = new User(userId);
  await user.pull();
  user.data.orders.push(orderId)
  await user.push();
}
export { userToken, getUser, setUser, setNewOrderInUserData, setUserData }