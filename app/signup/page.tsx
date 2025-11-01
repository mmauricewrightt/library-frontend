'use client'
import { useState } from 'react'

export default function SignupPage() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName]   = useState('')
  const [email, setEmail]         = useState('')
  const [password, setPassword]   = useState('')
  const [confirm, setConfirm]     = useState('')
  const [message, setMessage]     = useState<string | null>(null)

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setMessage(null)

    // simple front-end validation
    if (!firstName || !lastName || !email || !password || !confirm) {
      setMessage('Please fill in all fields.')
      return
    }
    if (password !== confirm) {
      setMessage('Passwords do not match.')
      return
    }

    // UI only for now — later we’ll send to Supabase
    setMessage('✅ Sign up info captured (UI only). Backend wiring comes next.')
  }

  return (
    <section className="max-w-lg">
      <h1 className="text-2xl font-semibold mb-4">Sign Up</h1>

      <form onSubmit={onSubmit} className="space-y-4 border rounded-2xl p-5 bg-white shadow">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">First Name</label>
            <input
              className="border rounded-md p-2 w-full"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              placeholder="Jane"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Last Name</label>
            <input
              className="border rounded-md p-2 w-full"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              placeholder="Doe"
            />
          </div>
        </div>

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

        <div className="grid md:grid-cols-2 gap-4">
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
          <div>
            <label className="block font-semibold mb-1">Confirm Password</label>
            <input
              type="password"
              className="border rounded-md p-2 w-full"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              placeholder="••••••••"
            />
          </div>
        </div>

        {/* Role fixed to member for signups */}
        <div>
          <label className="block font-semibold mb-1">Account Type</label>
          <select className="border rounded-md p-2 w-full" value="member" disabled>
            <option value="member">Member (default)</option>
          </select>
          <p className="text-xs text-slate-500 mt-1">Only members can self-register. Librarians/Admins are created by staff.</p>
        </div>

        <button
          type="submit"
          className="bg-sky-600 hover:bg-sky-700 text-white font-semibold px-4 py-2 rounded-md"
        >
          Create Account
        </button>

        {message && (
          <p className="text-sm mt-2 {message.startsWith('✅') ? 'text-green-700' : 'text-red-600'}">
            {message}
          </p>
        )}
      </form>
    </section>
  )
}
