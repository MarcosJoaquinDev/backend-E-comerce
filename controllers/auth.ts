import { Auth } from 'models/Auth'
import { sendCodeToEmail } from 'lib/sendgrid'

async function sendCode(email:string){
  const authId = await Auth.findOrCreateNewRecord(email);
  const authModel = new Auth(authId);
  await authModel.pull()
  await authModel.resetCode();
  const authEmail:string = authModel.data.email; 
  const authCode:number = authModel.data.code;
  await sendCodeToEmail(authEmail,authCode);
}
async function verifyCodeAndExpires(email:string,code:number){
  const authCollectionDocumentId = await Auth.findAuth(email);  
  if(authCollectionDocumentId){
    const instanceAuth = new Auth(authCollectionDocumentId);
    const result = await instanceAuth.verifyCode(code);
    return result;
  }else{
    return null
  }

}

export { sendCode,verifyCodeAndExpires} 