import { productsIndex } from 'lib/data/algolia';
type ProductsFields = {
  id:string,
  price:number,
  title:string,
  stock:number,
  description:string
  image:string,
}
export async function searchProducts(query:string,limit:number,offset:number):Promise<ProductsFields>{
  const results:any = await productsIndex.search(query,{
    offset,
    length:limit
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