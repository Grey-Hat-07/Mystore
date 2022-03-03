import product from '../../../Models/product' ;
 
 export default async (req,res) => {
    const {pid}=req.query;
    const item=await product.findOne({_id:pid});
    res.status(200).json(item);

}
