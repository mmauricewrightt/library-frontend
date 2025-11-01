'use client'
import { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState<string | null>(null)

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setMessage(null)

    if (!email || !password) {
      setMessage('Please enter both email and password.')
      return
    }

    // UI only — we’ll connect to Supabase later
    setMessage('✅ Login info captured (UI only). Backend wiring comes next.')
  }

  return (
    <section className="max-w-md">
      <h1 className="text-2xl font-semibold mb-4">Login</h1>

      <form onSubmit={onSubmit} className="space-y-4 border rounded-2xl p-5 bg-white shadow">
        <div>
          <label className="block font-semibold mb-1">Email</label>
          <input
            type="email"
            className="border rounded-md p-2 w-full"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Password</label>
          <input
            type="password"
            className="border rounded-md p-2 w-full"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          className="bg-sky-600 hover:bg-sky-700 text-white font-semibold px-4 py-2 rounded-md"
        >
          Sign In
        </button>

        {message && (
          <p className={`text-sm mt-2 ${message.startsWith('✅') ? 'text-green-700' : 'text-red-600'}`}>
            {message}
          </p>
        )}
      </form>
    </section>
  )
}
