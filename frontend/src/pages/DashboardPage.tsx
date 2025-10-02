import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

type EventItem = { id: string; title: string; dateTime: string; location: string; description?: string }
type Filter = 'all' | 'upcoming' | 'past'

export default function DashboardPage() {
  const [events, setEvents] = useState<EventItem[]>([])
  const [filter, setFilter] = useState<Filter>('upcoming')
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) navigate('/login')
  }, [navigate])

  useEffect(() => {
    async function fetchEvents() {
      const token = localStorage.getItem('token')
      const res = await fetch((import.meta.env.VITE_API_URL || 'http://localhost:4000/api') + '/events' + (filter === 'all' ? '' : `?filter=${filter}`), {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.ok) setEvents(await res.json())
    }
    fetchEvents()
  }, [filter])

  function logout() {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className="mx-auto max-w-5xl p-4">
      <header className="flex items-center justify-between py-4">
        <h1 className="text-2xl font-semibold tracking-tight">Your Events</h1>
        <div className="flex items-center gap-2">
          <Link to="/events/new" className="btn-primary">New Event</Link>
          <button onClick={logout} className="rounded-md border border-gray-300 px-4 py-2 hover:bg-gray-50">Logout</button>
        </div>
      </header>

      <div className="mb-4 flex gap-2">
        {(['upcoming', 'past', 'all'] as Filter[]).map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`rounded-full px-3 py-1 text-sm ${filter===f?'bg-brand-600 text-white':'bg-gray-200'}`}>{f}</button>
        ))}
      </div>

      <ul className="grid gap-4 sm:grid-cols-2">
        {events.map((e) => (
          <li key={e.id} className="rounded-xl border border-gray-200 bg-white p-5 shadow-soft">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold">{e.title}</h3>
                <p className="text-sm text-gray-600">{new Date(e.dateTime).toLocaleString()}</p>
                <p className="text-sm text-gray-600">{e.location}</p>
              </div>
              <ShareButton id={e.id} />
            </div>
            {e.description && <p className="mt-3 text-sm leading-6 text-gray-800">{e.description}</p>}
          </li>
        ))}
      </ul>
    </div>
  )
}

function ShareButton({ id }: { id: string }) {
  async function share() {
    const token = localStorage.getItem('token')
    const res = await fetch((import.meta.env.VITE_API_URL || 'http://localhost:4000/api') + `/events/${id}/share`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` }
    })
    const data = await res.json()
    const url = `${window.location.origin}/e/${data.token}`
    await navigator.clipboard.writeText(url)
    alert('Share link copied to clipboard')
  }
  return <button className="text-sm text-gray-700 underline" onClick={share}>Share</button>
}


