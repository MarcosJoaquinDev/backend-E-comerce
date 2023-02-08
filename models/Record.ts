import { authCollection, userCollection, firestore }  from 'lib/data/firebase'
//import { Auth } from './Auth';
type colletionType = 'auth'| 'user' | 'order';
export class Record {
  id:string;
  ref:FirebaseFirestore.DocumentReference;
  data:any;
  collection:FirebaseFirestore.CollectionReference;
  constructor(id:string,collectionRef:colletionType){
    this.collection = firestore.collection(collectionRef);
    this.ref = this.collection.doc(id);
    this.id = id;
  }
  async pull(){
    const snapShot = await this.ref.get();
    this.data = snapShot.data();
  }
  async push(){
    this.ref.update(this.data);
  }
  static async findAuth(email:string):Promise<string>{
    const cleanEmail = email.trim().toLocaleLowerCase();
    const response = await authCollection.where('email','==',cleanEmail).get();
    if(response.docs[0]){
      const authID =  response.docs[0].id;
      return authID;
    }else{  
      return null;
    }
  }
  private static async createRecord(email:string):Promise<FirebaseFirestore.DocumentReference>{
    const newUser = await userCollection.add({email,orders:[]});
    const newAuth = await authCollection.add({
        email,
        userId:newUser.id,
        code:0,
        expires:new Date()
      });
      return newAuth
  }
  static async findOrCreateNewRecord(email:string):Promise<string>{
    const authExist = await this.findAuth(email);
    if(!authExist){
      const auth = await this.createRecord(email);
      return auth.id;
    }
    return authExist
  }
}