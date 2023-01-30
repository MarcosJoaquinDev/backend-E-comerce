import { Record } from 'models/Record';
import { userCollection, orderCollection } from 'lib/data/firebase'
import { generate ,decode} from 'lib/jwtoken';

export class User extends Record{
  constructor(id:string){
    super(id,'user');
  }
  async encryptedUserInformation(){
   await this.pull()
   return generate(this.data);
  }
  static async findDocumentUserId(email:string):Promise<string>{
    const cleanEmail = email.trim().toLocaleLowerCase();
    const response = await userCollection.where('email','==',cleanEmail).get();
    if(response.docs[0]){
      const userID =  response.docs[0].id;
      return userID;
    }else{  
      return null;
    }
  }
  static userId = async(email:string) => this.findDocumentUserId(email)

}