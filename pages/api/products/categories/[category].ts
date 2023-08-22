import methods from 'micro-method-router'
import type { NextApiRequest, NextApiResponse } from 'next';
import { parseParamsFromQuery } from 'lib/request';
import { searchProductsByCategory  } from 'controllers/products'
import { handlerCORS } from 'lib/middleware';
const handle = methods({
  async get(req:NextApiRequest, res:NextApiResponse) {
    const queryLimit  = req.query.limit as string;
    const queryOffset  = req.query.offset as string;
    const category = req.query.category as any;
    const { limit, offset } = parseParamsFromQuery(queryLimit,queryOffset);
    const results = await searchProductsByCategory(category,limit,offset);
    res.json(results)
  }
})
export default handlerCORS(handle);