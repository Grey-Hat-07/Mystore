import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import baseUrl from '../helpers/baseUrl'
export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const handlesubmit = async(e) => {
    e.preventDefault()
    const res=await fetch(`${baseUrl}/api/Signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    })
    const res2 = await res.json();
    if(res2.error){
      alert(res2.error)
    }
    else{
      console.log(res2)
      router.push('/Login')            
    }
  }
  return (
    <div className='container card cardwidth '>
      <h1 className='text-center'>Signup</h1>
      <form onSubmit={handlesubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" id="name" aria-describedby="emailHelp" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <small id="emailHelp" className="form-text text-muted">We ll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className='text-center mt-3 mb-3'>
        <button type="submit" className="btn btn-primary">Submit</button>
        </div>
        </form>
        <Link href='/Login'><a className='text-center'>Already have account?</a></Link>
    </div>
  )
}
