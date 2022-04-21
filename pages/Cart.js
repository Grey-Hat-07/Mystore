import React from 'react'
import { useState, useEffect } from 'react';
import baseUrl from '../helpers/baseUrl';
import { Cartproduct } from '../component/Cartproduct';
export default function Cart() {
    const [data, setData] = useState({});
    const [total,setTotal] = useState(0);
    useEffect(async() => {
     const res = await fetch(`${baseUrl}/api/cart`);
      const data = await res.json();
      setData(data);
      
    })

        
       
   //console.log(total);
    return (
        <div>
            {
                data.products? data.products.map((product) =>{ 
                    setTotal(total+product.quantity)
                    return(<div key={product._id}>
                    <Cartproduct  product={product} />
                    {/* <p>{product.quantity} x {product.product.price}</p> */}
                    </div>
                )}): <h2>Cart is empty</h2>
            }
            
            {total}
        </div>
    )
}



