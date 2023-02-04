import type { NextApiRequest, NextApiResponse } from 'next';
import methods from 'micro-method-router';
import { parseParamsFromQuery } from 'lib/request';
import { searchProducts } from 'controllers/products'

export default methods({
  get:async (req:NextApiRequest,res:NextApiResponse)=>{ 
    console.log(req);
    
    const queryLimit  = req.query.limit as string;
    const queryOffset  = req.query.offset as string;
    const { limit, offset } = parseParamsFromQuery(queryLimit,queryOffset);
    const response = await searchProducts(limit,offset);
    res.json(response);
  }
})