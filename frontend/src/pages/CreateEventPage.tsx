import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function CreateEventPage() {
  const [title, setTitle] = useState('')
  const [dateTime, setDateTime] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    try {
      const token = localStorage.getItem('token')
      const res = await fetch((import.meta.env.VITE_API_URL || 'http://localhost:4000/api') + '/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title, dateTime, location, description })
      })
      if (!res.ok) throw new Error('Failed to create event')
      navigate('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Failed to create event')
    }
  }

  return (
    <div className="min-h-dvh flex items-center justify-center bg-gradient-to-br from-brand-50 via-white to-brand-100 p-4">
      <div className="w-full max-w-lg rounded-xl border border-gray-200 bg-white p-6 shadow-soft">
        <h2 className="mb-6 text-center text-xl font-semibold">Create Event</h2>
        <form className="space-y-4" onSubmit={onSubmit}>
          <label className="block space-y-1">
            <span className="text-sm font-medium text-gray-700">Title</span>
            <input className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </label>
          <label className="block space-y-1">
            <span className="text-sm font-medium text-gray-700">Date & Time</span>
            <input type="datetime-local" className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" value={dateTime} onChange={(e) => setDateTime(e.target.value)} required />
          </label>
          <label className="block space-y-1">
            <span className="text-sm font-medium text-gray-700">Location</span>
            <input className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" value={location} onChange={(e) => setLocation(e.target.value)} required />
          </label>
          <label className="block space-y-1">
            <span className="text-sm font-medium text-gray-700">Description</span>
            <textarea className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} />
          </label>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button className="w-full rounded-md bg-brand-600 px-4 py-2 text-white hover:bg-brand-700" type="submit">Save</button>
        </form>
      </div>
    </div>
  )
}


