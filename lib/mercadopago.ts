import mercadopago from 'mercadopago';
mercadopago.configure({
  access_token: process.env.MP_TOKEN
});
const preference = {
  items: [],
  back_urls: {
    success:'http://mypage.com',
    pending:'http://mypage.com/pending',
    failure:'http://mypage.com/failure'
  },
  notification_url:"https://backend-e-comerce.vercel.app/api/ipn/mercadopago",
  external_reference:"",
};
type Product = {
  title:string,
  description:string,
  price:number,
}
type MerchantOrderResponse = {
  orderId:string,
  status:string
}
export async function createaPreference(orderId:string,product:Product):Promise<string>{
  preference.items.push({
    title:product.title,
    description:product.description,
    quantity: 1,
    currency_id: 'ARS',
    unit_price: 100
  });
  preference.external_reference = orderId;
  const { body } = await mercadopago.preferences.create(preference);
  return body.init_point;
}
export async function getMerchantOrder(id:string):Promise<MerchantOrderResponse>{
  const {body} = await mercadopago.merchant_orders.get(id);
  return {
    orderId : body.external_reference,
    status:body.order_status
  }
}