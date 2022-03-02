// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import initDB from "../../helpers/initDB";
import product from '../../Models/product';
initDB();
export default (req, res)=> {
    product.find({},(err,products)=>{
        if(err){
            res.status(500).send(err);
            
        }
        else{
            res.status(200).json(products);
        }
    })
    
}
