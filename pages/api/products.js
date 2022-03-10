// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import initDB from "../../helpers/initDB";
import product from '../../Models/product';
initDB();
export default async(req, res)=> {
    switch(req.method){
    case 'GET': await getproduct(req,res);
                break;
    case 'POST':await postproduct(req,res);
                break;
}
}
const getproduct= async (req,res) => {
    product.find({},(err,products)=>{
        if(err){
            res.status(500).send(err);
            
        }
        else{
            res.status(200).json(products);
        }
    })
}
const postproduct= async (req,res) => {
    const {name,price,description,image}=req.body;
    if(!name || !price || !description || !image){
        res.status(400).json({error:"Please provide all the required fields"});
    }
    const Product =await new product({name,price,description,image}).save();
    res.status(200).json(Product);
}