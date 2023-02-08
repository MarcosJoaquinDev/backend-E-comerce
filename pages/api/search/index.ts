import type { NextApiRequest, NextApiResponse } from 'next';
import methods from 'micro-method-router';
import { parseParamsFromQuery } from 'lib/request';
import { searchProducts } from 'controllers/products'

export default methods({
  get:async (req:NextApiRequest,res:NextApiResponse)=>{ 
    const queryLimit  = req.query.limit as string;
    const queryOffset  = req.query.offset as string;
    const queryProduct = req.query.q as string;
    const { limit, offset } = parseParamsFromQuery(queryLimit,queryOffset);
    const response = await searchProducts(queryProduct,limit,offset);
    res.json(response);
  }
})