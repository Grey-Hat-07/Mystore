import Stripe from "stripe";
import { v4 as uuidV4 } from "uuid";
import Cart from '../../Models/Cart';

const stripe = Stripe(process.env.STRIPE_SECRET_KEY)
export default async (req, res) => {
    const { paymentInfo } = req.body;
    const { user } = req.cookies;
    try{const cart = await Cart.findOne({ userId: user });
    let total = 0;
    cart.products.forEach(product => {
        total = total + product.quantity;
    });
    const prevcustomer = await stripe.customers.list({
        email: paymentInfo.email
    })
    console.log(total);
    const isExist = prevcustomer.data.length > 0;
    let newCustomer;
    if (!isExist) {
        newCustomer = await stripe.customers.create({
            email: paymentInfo.email,
            source: paymentInfo.id
        })
    }
    const charge = await stripe.charges.create({
        currency: "INR",
        amount: total * 100,
        receipt_email: paymentInfo.email,
        customer: isExist ? prevcustomer.data[0].id : newCustomer.id,
        description: "Purchased the product from mystore"
    }, {
        idempotencyKey: uuidV4()
    })
    if(charge.status === "succeeded"){

        res.status(200).json({ message: "Payment Successful" });
    }
    else{
        res.status(500).json({ message: "Payment Failed" });
    }}
    catch(err){
        console.log(err);
        res.status(500).json({ message: "Payment Failed" });
    }

};