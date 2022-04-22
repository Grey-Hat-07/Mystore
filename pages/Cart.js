import React from 'react'
import { useState, useEffect } from 'react';
import baseUrl from '../helpers/baseUrl';
import { Cartproduct } from '../component/Cartproduct';
import StripeCheckout from 'react-stripe-checkout';
export default function Cart() {
    const [data, setData] = useState({});
    let total=0;
    useEffect(async() => {
     const res = await fetch(`${baseUrl}/api/cart`);
      const data = await res.json();
      setData(data);
      
    })
    const handlecheckout = async (paymentInfo) => {
        console.log(paymentInfo);
        try{
        const res = await fetch(`${baseUrl}/api/payment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({paymentInfo})
        });
        const res2 = await res.json();
        console.log(res2);}
        catch(err){
            console.log(err);
        }
    }
        
       
   //console.log(total);
    return (
        <div>
            {
                data.products? data.products.map((product) =>{ 
                    total=total+product.quantity;
                    return(<div key={product._id}>
                    <Cartproduct  product={product} />
                    {/* <p>{product.quantity} x {product.product.price}</p> */}
                    </div>
                )}): <h2>Cart is empty</h2>
            }
            
            {total}
            <StripeCheckout
                name = "Mystore"
                description = "Buy some stuff"
                amount = {total*100}
                image = "https://pbs.twimg.com/profile_images/1267713887165485061/WUR4QXtd_400x400.jpg"
                currency='INR'
                zipCode = {true}
                shippingAddress={true}
                billingAddress={true}
                stripeKey = "pk_test_51Kr0ULSCU4JaQVc0HiE7N2mRZQDdyqpcxOztHJn2qTdAmwAqoCaSKfWmGaSoP8A4ppcFRwRRkqCZDxZKxHizZxVc00kZ7y1zTr"
                token = {(paymentInfo) => handlecheckout(paymentInfo)}
            >
            <button className='btn btn-success'>
                Checkout
            </button>
            </StripeCheckout>
        </div>
    )
}



