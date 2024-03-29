import methods from 'micro-method-router'
import type { NextApiRequest, NextApiResponse } from 'next';
import { middlewareRequest } from 'lib/request';
import { searchProductsById } from 'controllers/products'
import { handlerCORS } from 'lib/middleware';
const handle = methods({
  async get(req:NextApiRequest, res:NextApiResponse,id) {
    const results = await searchProductsById(id);
    res.json(results)
  }
})
const handleProduct = middlewareRequest(handle);
export default handlerCORS(handleProduct);