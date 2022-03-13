import React from 'react'
import { useEffect, useState } from 'react'
import baseUrl from '../helpers/baseUrl'
import { parseCookies } from 'nookies';
export default function Account() {
    const [data, setData] = useState({});
    useEffect(async() => {
     const res = await fetch(`${baseUrl}/api/account`);
      const data = await res.json();
      setData(data);


    })


  return (
    <div>Account
     {data.name}
     {data.email}
      
    </div>
  )



}
