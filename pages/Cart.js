import React from 'react'
import { useState, useEffect } from 'react';
import baseUrl from '../helpers/baseUrl';
export default function Cart() {
    const [data, setData] = useState({});
    useEffect(async() => {
     const res = await fetch(`${baseUrl}/api/cart`);
      const data = await res.json();
      setData(data);

    })
    console.log(data);
    return (
        <div>Cart
            {data.userId}
        </div>
    )
}



