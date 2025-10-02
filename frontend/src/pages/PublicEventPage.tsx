import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function PublicEventPage() {
  const { token } = useParams()
  const [event, setEvent] = useState<any>(null)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch((import.meta.env.VITE_API_URL || 'http://localhost:4000/api') + `/events/public/${token}`)
        if (!res.ok) throw new Error('not found')
        setEvent(await res.json())
      } catch {
        setNotFound(true)
      }
    }
    load()
  }, [token])

  if (notFound) return <div className="p-6 text-center">Event not found</div>
  if (!event) return <div className="p-6 text-center">Loading...</div>

  return (
    <div className="mx-auto max-w-2xl p-6">
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h1 className="text-2xl font-bold">{event.title}</h1>
        <p className="text-gray-600">{new Date(event.dateTime).toLocaleString()}</p>
        <p className="text-gray-600">{event.location}</p>
        {event.description && <p className="mt-3">{event.description}</p>}
      </div>
    </div>
  )
}


