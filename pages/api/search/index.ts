import type { NextApiRequest, NextApiResponse } from 'next';
import methods from 'micro-method-router';
import { parseParamsFromQuery } from 'lib/request';
import { searchProducts } from 'controllers/products'

export default methods({
  get:async (req:NextApiRequest,res:NextApiResponse)=>{
    const { limit, offset } = parseParamsFromQuery(req);
    const response = await searchProducts(limit,offset);
    res.json(response);
  }
})