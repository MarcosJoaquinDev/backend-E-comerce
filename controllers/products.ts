import { productsIndex } from 'lib/data/algolia';
type ProductsFields = {
  id:string,
  price:number,
  title:string,
  stock:number,
  description:string
  image:string,
}
type SearchProductsQuery = {
  results:number,
  offset?:number,
  products:ProductsFields,
}
export async function searchProducts(query:string,limit:number,offset:number):Promise<SearchProductsQuery>{
  const result:any = await productsIndex.search(query,{
    offset,
    length:limit
  })
  const hitsResults = result.hits.map( hit => hit.fields);
  return {
    results: result.nbHits,
    products:hitsResults};
}
export async function searchProductsByCategory(category:string,limit:number,offset:number):Promise<SearchProductsQuery>{
  const results:any = await productsIndex.search(category,{
    offset,
    length:limit
  })
  const hitsResults = results.hits.map( hit => hit.fields);
  return {products:hitsResults,offset,results:results.nbHits}
}
export const searchProductsById = async(productId:number):Promise<ProductsFields> =>{
  try{
    return (await productsIndex.search(productId.toString()) as any).hits[0].fields;
  }catch(err){
    return err;
  }
}