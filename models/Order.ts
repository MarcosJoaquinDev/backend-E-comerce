import { orderCollection } from 'lib/data/firebase';
type OrderDetails = {
  productDetails: {
    title:string
    description: string,
    price:number,
  }
  status?:string,
  userId:string,
}
export class Order {
  ref:FirebaseFirestore.DocumentReference;
  data:any;
  collection:FirebaseFirestore.CollectionReference;
  constructor(idRef?){
    this.collection = orderCollection;
    idRef?
    this.ref = this.collection.doc(idRef):'';
  }
  private async pull(){
    const snapShot = await this.ref.get();
    this.data = snapShot.data();
  }
  private async push(){
   await this.ref.update(this.data);
  }
  getOrdersUser = async (userId:string):Promise<OrderDetails[]> => { 
    const order = await this.collection.where('userId','==',userId).get();
    const orderDetails = order.docs.map( i =>{
      const {title, description, price} = i.data().productDetails;
      return { userId:i.data().userId,productDetails:{title, description, price} }
    } ); 
    return orderDetails;
  }
  async getOrderById():Promise<OrderDetails>{
    await this.pull();
    if(this.data){
      return this.data;
    }else{
      throw 'Error: este ID no se encuentra en las orders'
    }
  }
  async createAPurchaseOrder(newOrder:OrderDetails):Promise<string>{
    const res = await this.collection.add(newOrder);
    return res.id;
  }
  async setStatus(status:string){
    await this.pull();
    this.data.status = status;
    await this.push()
  }
}