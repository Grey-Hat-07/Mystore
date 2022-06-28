import React from 'react'
import { useEffect, useState } from 'react'
import baseUrl from '../helpers/baseUrl'
export default function Account() {
    const [data, setData] = useState();
    useEffect(async() => {
     const res = await fetch(`${baseUrl}/api/account`);
      const data = await res.json();
      setData(data);
    },[])
  return (
    <div><h1>Account</h1>
     {data&&data.name}
     {data&&data.email}
    </div>
  )



}
