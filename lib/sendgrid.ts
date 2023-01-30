import sendgrind from '@sendgrid/mail';

sendgrind.setApiKey(process.env.SENDGRIND_API_KEY);
 
export async function sendCodeToEmail(email:string,code:number){
  const msg = {
    to: email,
    from: 'marcosjuako@hotmail.com',
    subject: 'Codigo de verificacion',
    text: 'and easy to do anywhere, even with Node.js',
    html: `<strong><h1>code:${code}</strong>`,
  }
  try{
    await sendgrind.send(msg);
    console.log('Email sent')
  }catch(err){
    console.error(err)
  }

}