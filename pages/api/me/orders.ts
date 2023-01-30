import { NextApiRequest, NextApiResponse } from 'next';
import { middlewareAuth } from 'lib/middleware';
import methods from 'micro-method-router';
import { getMyOrders, createNewOrder } from 'controllers/order'

const handle = methods({
  async get(req:NextApiRequest,res:NextApiResponse,token){
    const email = token.email;
    const orders = await getMyOrders(email);
    res.json({orders})
  },
  async post(req:NextApiRequest,res:NextApiResponse,token){
    const productId = parseInt(req.query.productId as string);
    const email = token.email;
    try{
      const urlMercadoPago = await createNewOrder(email,productId);
      res.json({urlMercadoPago})
    }catch(err){
      res.status(404).json(err);
    }
  }
})

export default middlewareAuth(handle);
