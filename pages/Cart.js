import React from 'react'
import { useState, useEffect } from 'react';
import baseUrl from '../helpers/baseUrl';
import { Cartproduct } from '../component/Cartproduct';
import { useRouter } from 'next/router';
// import StripeCheckout from 'react-stripe-checkout';
export default function Cart() {
    const [data, setData] = useState({});
    const [userData, setUserData] = useState({});
    const router = useRouter();
    let total=0;
    //useEffect section
    useEffect(async() => {
     const res = await fetch(`${baseUrl}/api/cart`);
      const cartdata = await res.json();
      setData(cartdata);
      
    })
    useEffect(async() => {
        const res = await fetch(`${baseUrl}/api/account`);
        const usedata = await res.json();
        setUserData(usedata);
        console.log(usedata);
    },[]);
    //useEffect section end
    const createOrder = async({paymentId, razorpayOrderId}) => {
      const res = await fetch(`${baseUrl}/api/Order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          products : data.products,
          email : userData.email,
          total : total,
          paymentId ,
          razorpayOrderId
        })
      });
      const res2 = await res.json();
      if(res2) {
        router.push('/');
      }
    }
    // razorpay section
    const initializeRazorpay = () => {
        return new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = "https://checkout.razorpay.com/v1/checkout.js";
    
          script.onload = () => {
            resolve(true);
          };
          script.onerror = () => {
            resolve(false);
          };
    
          document.body.appendChild(script);
        });
      };
      const makePayment = async () => {
        const res = await initializeRazorpay();
    
        if (!res) {
          alert("Razorpay SDK Failed to load");
          return;
        }
    
        // Make API call to the serverless API
        const data = await fetch(`${baseUrl}/api/Razorpay`, { 
            method: "POST" 
        }).then((t) =>
          t.json()
        );
        console.log(data);
        var options = {
          key: process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
          name: "Mystore",
          currency: data.currency,
          amount: data.amount,
          order_id: data.id,
          description: "Thankyou for your test donation",
          image: "https://pbs.twimg.com/profile_images/1267713887165485061/WUR4QXtd_400x400.jpg",
          handler: function (response) {
            // Validate payment at server - using webhooks is a better idea.
            createOrder({ paymentId: response.razorpay_payment_id, razorpayOrderId: response.razorpay_order_id });
            alert(response.razorpay_payment_id);
            alert(response.razorpay_order_id);
            alert(response.razorpay_signature);
          },
          prefill: {
            name: userData.name,
            email: userData.email
          },
        };
    
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      };
    // razorpay section end
    // const handlecheckout = async (paymentInfo) => {
    //     console.log(paymentInfo);
    //     try{
    //     const res = await fetch(`${baseUrl}/api/payment`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({paymentInfo})
    //     });
    //     const res2 = await res.json();
    //     console.log(res2);}
    //     catch(err){
    //         console.log(err);
    //     }
    // }
        
       
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
            <button className='btn btn-success btn-outline-primary' onClick={makePayment}>
                Purchase
            </button>

            {/* <StripeCheckout
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
            </StripeCheckout> */}
        </div>
    )
}



