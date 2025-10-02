import React from 'react'
import { Link, Navigate } from 'react-router-dom'

export default function App() {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
  if (token) return <Navigate to="/dashboard" />
  return (
    <div className="min-h-dvh bg-gradient-to-br from-brand-50 via-white to-brand-100">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-brand-600"></div>
          <span className="text-lg font-semibold tracking-tight">Evently</span>
        </div>
        <nav className="hidden gap-6 text-sm text-gray-600 sm:flex">
          <a href="#features" className="hover:text-gray-900">Features</a>
          <a href="#security" className="hover:text-gray-900">Security</a>
          <a href="#faq" className="hover:text-gray-900">FAQ</a>
        </nav>
        <div className="flex items-center gap-2">
          <Link className="rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100" to="/login">Log in</Link>
          <Link className="rounded-md bg-brand-600 px-4 py-2 text-white shadow-soft hover:bg-brand-700" to="/signup">Get Started</Link>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 py-16 md:grid-cols-2">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl">Track events with a beautiful, fast, and secure app</h1>
          <p className="text-gray-600">Create events in seconds, share public links, and stay organized with upcoming and past filters.</p>
          <div className="flex flex-wrap gap-3">
            <Link className="rounded-md bg-brand-600 px-5 py-2.5 text-white shadow-soft hover:bg-brand-700" to="/signup">Create your account</Link>
            <Link className="rounded-md border border-gray-300 px-5 py-2.5 text-gray-800 hover:bg-white" to="/login">I already have an account</Link>
          </div>
          <ul className="mt-6 grid gap-3 text-sm text-gray-700">
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-brand-600"></span> Email + password auth</li>
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-brand-600"></span> Upcoming / past filters</li>
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-brand-600"></span> Shareable public links</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-soft">
          {/* Hero preview card */}
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-brand-50 to-white">
            <div className="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-brand-200 blur-2xl"></div>
            <div className="absolute -right-16 -bottom-16 h-48 w-48 rounded-full bg-brand-100 blur-2xl"></div>

            <div className="relative grid gap-4 p-5 md:grid-cols-5">
              {/* Left: calendar preview */}
              <div className="md:col-span-3">
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-500">Upcoming</p>
                    <h3 className="text-lg font-semibold">Team Offsite</h3>
                  </div>
                  <span className="rounded-full bg-brand-600/10 px-3 py-1 text-xs font-medium text-brand-700">12 Oct, 10:00 AM</span>
                </div>
                <div className="grid grid-cols-7 gap-1 rounded-lg border border-gray-200 bg-white p-3 text-center text-xs">
                  {Array.from({ length: 35 }).map((_, i) => (
                    <div key={i} className={`h-7 rounded ${i===11||i===18? 'bg-brand-600 text-white' : 'bg-gray-50 text-gray-600'}`}></div>
                  ))}
                </div>
              </div>

              {/* Right: event card with image */}
              <div className="md:col-span-2">
                <div className="card p-0 overflow-hidden">
                  <div className="relative h-36 w-full">
                    <img
                      alt="Modern conference audience"
                      className="absolute inset-0 h-full w-full object-cover"
                      src="https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=1600&auto=format&fit=crop"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold">Product Launch Meetup</h4>
                    <p className="mt-1 text-sm text-gray-600">DLF Cyberhub • Gurgaon</p>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="rounded-md bg-brand-600/10 px-2 py-1 text-xs font-medium text-brand-700">Shareable</span>
                      <span className="rounded-md bg-green-600/10 px-2 py-1 text-xs font-medium text-green-700">Free</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
