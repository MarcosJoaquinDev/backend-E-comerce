import type { NextApiRequest, NextApiResponse } from 'next';
import methods from 'micro-method-router';
import { parseParamsFromQuery } from 'lib/request';
import { searchProducts } from 'controllers/products'
import { handlerCORS } from 'lib/middleware';

const handle = methods({
  get:async (req:NextApiRequest,res:NextApiResponse)=>{
    const queryLimit  = req.query.limit as string;
    const queryOffset  = req.query.offset as string;
    const queryProduct = req.query.q as string;
    const { limit, offset } = parseParamsFromQuery(queryLimit,queryOffset);
    const response = await searchProducts(queryProduct,limit,offset);
    res.json(response);
  }
})
export default handlerCORS(handle);