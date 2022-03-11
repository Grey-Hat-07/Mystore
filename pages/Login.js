import Link from 'next/link'
import { useState } from 'react'
export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handlesubmit = (e) => {
    e.preventDefault()
    console.log(email, password)
  }
  return (
    <div className='container card cardwidth '>
      <h1 className='text-center'>Login</h1>
      <form>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className='text-center mt-3 mb-3'>
        <button type="submit" className="btn btn-primary" onClick={handlesubmit}>Submit</button>
        </div>
        </form>
        <Link href='/Signup'><a className='text-center'>Don't have Account?</a></Link>
    </div>
  )
}
