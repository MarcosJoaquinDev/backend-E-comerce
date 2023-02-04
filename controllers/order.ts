import { User } from 'models/User';
import { Order } from 'models/Order';
import {searchProductsById} from 'controllers/products'
import { setNewOrderInUserData } from 'controllers/user'
import { createaPreference } from 'lib/mercadopago'
type OrderDetails = {
  productDetails: {
    title:string
    description: string,
    price:number,
  }
  userId:string,
  status?:string
}
export async function getMyOrders(email:string):Promise<OrderDetails[]>{
  const id = await User.findDocumentUserId(email);
  const order = new Order();
  const myOrders = await order.getOrdersUser(id);  
  return myOrders;
}
export async function getOrderByID(orderId:string):Promise<OrderDetails>{
  const order = new Order(orderId);
  const result = await order.getOrderById();
  return result
}
export async function createNewOrder(email:string,productId:number):Promise<string>{
  const userId = await User.userId(email);
  try{
    const productDetail = await searchProductsById(productId);
    const { title, description, price } = productDetail;
    const order = {
      productDetails: {
        title,
        description,
        price,
      },
      status:'',
      userId,
    }
    const newOrder = new Order();
    const orderId = await newOrder.createAPurchaseOrder(order);
    await setNewOrderInUserData(userId,orderId);
    const urlMercadoPago = await createaPreference(orderId,order.productDetails);
    return urlMercadoPago;
  }catch(err){
    throw 'Not find Product'
  }

}
export async function changeStatusOrder(idOrder:string,status:string){
  const orderChange = new Order(idOrder);
  await orderChange.setStatus(status);
}