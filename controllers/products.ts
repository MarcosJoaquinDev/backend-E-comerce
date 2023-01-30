import { productsIndex } from 'lib/data/algolia';
type ProductsFields = {
  id:string,
  price:number,
  title:string,
  stock:number,
  description:string
}
export async function searchProducts(limit:number,offset:number):Promise<ProductsFields>{
  const results:any = await productsIndex.search('',{
    hitsPerPage: limit,
    offset
  })
  const hitsResults = results.hits.map( hit => hit.fields); 
  return hitsResults;
}
export const searchProductsById = async(productId:number):Promise<ProductsFields> =>{
  try{
    return (await productsIndex.search(productId.toString()) as any).hits[0].fields;
  }catch(err){
    return err;
  }
}