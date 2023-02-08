import {NextApiRequest,NextApiResponse} from 'next';
import methods from 'micro-method-router';
import {airtableDataBase} from 'lib/data/airtable';
import {productsIndex} from 'lib/data/algolia';

export default  methods({
  async post(req:NextApiRequest,res:NextApiResponse){
    const {password} = req.body;
    const check = password === process.env.SYNC_PRODUCTS;
    if(!check){
      res.status(401);
    }
    airtableDataBase('products').select({
    }).eachPage(async function page(records, fetchNextPage) {
        const arrayRecords = records.map(i => {
          return {objectID:i.id ,fields: i.fields}
        })
        const response = await productsIndex.saveObjects(arrayRecords);  
        console.log(response);
        fetchNextPage();
    
    }, function done(err) {
        if (err) { console.error(err); return; }
        console.log('termino');
        res.status(200).json({ok:true})
        
    });
  }
})