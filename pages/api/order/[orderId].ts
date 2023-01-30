import type { NextApiRequest, NextApiResponse } from 'next';
import methods from 'micro-method-router';
import { getOrderByID } from 'controllers/order';
export default methods({
  async get(req:NextApiRequest,res:NextApiResponse){
    const order = req.query.orderId as string;
    try{
      const results = await getOrderByID(order);
      res.json({results});
    }catch(e){
      res.status(401).json(e)
    }
  }
})