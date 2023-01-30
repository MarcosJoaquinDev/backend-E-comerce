import { NextApiRequest, NextApiResponse } from 'next';
import methods from 'micro-method-router';
import { getMerchantOrder } from 'lib/mercadopago'
import { changeStatusOrder } from 'controllers/order'

export default methods({
  async post(req:NextApiRequest, res:NextApiResponse){
    const { topic } = req.query;
    if(topic==='merchant_order'){
      const {orderId,status} = await getMerchantOrder(req.query.id as string);
      await changeStatusOrder(orderId,status);
      res.status(200);
    }
    res.status(200);
  }
})