import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    try {
      const res = await fetch(import.meta.env.VITE_API_URL || 'http://localhost:4000/api' + '/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      if (!res.ok) throw new Error('Login failed')
      const data = await res.json()
      localStorage.setItem('token', data.token)
      navigate('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Login failed')
    }
  }

  return (
    <div className="min-h-dvh flex items-center justify-center bg-gradient-to-br from-brand-50 via-white to-brand-100 p-4">
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-soft">
        <h2 className="mb-6 text-center text-2xl font-semibold">Welcome back</h2>
        <form className="space-y-4" onSubmit={onSubmit}>
          <label className="block space-y-1">
            <span className="text-sm font-medium text-gray-700">Email</span>
            <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label className="block space-y-1">
            <span className="text-sm font-medium text-gray-700">Password</span>
            <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button className="btn-primary w-full" type="submit">Login</button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          No account? <Link to="/signup" className="text-brand-700 underline">Sign up</Link>
        </p>
      </div>
    </div>
  )
}


