import { Record } from 'models/Record'
import addMinutes from 'date-fns/addMinutes';
import isAfter from 'date-fns/isAfter';
import gen from 'random-seed';
const seed = process.env.RANDOM_SEED;
const random = gen.create(seed);

type codeResult = {
  res:boolean;
  message:string;
  userId?:string;
}
export class Auth extends Record {
  constructor(id:string){
    super(id,'auth');
  }
  async resetCode(){
    const now = new Date();
    this.data.code =  random.intBetween(10000,99999);
    this.data.expires = addMinutes(now,5);
    await this.push();
  }
  async verifyCode(code:number):Promise<codeResult>{
    await this.pull();
    const codeOk =  this.data.code == code;
    const now = new Date();
    const expires = this.data.expires.toDate();
    const dateExpires = isAfter(expires,now);    
    if(dateExpires && codeOk){
      return {res:true,message:'Codigo válido',userId:this.data.userId};
    }
    if(codeOk == false){
      return {res:false,message:'Codigo incorrecto'}
    }
    if(dateExpires==false){
      return {res:false,message:'El codigo venció'}
    }
  }
}


