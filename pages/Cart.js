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
   
    return (
        <div>
            {
                data.products? data.products.map(product => (
                    <Cartproduct key={product._id} product={product} total={total} setTotal={setTotal} />
                )): <h2>Cart is empty</h2>
            }
            {total }

        </div>
    )
}



