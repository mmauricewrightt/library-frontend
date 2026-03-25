'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setMessage(null)

    if (!email || !password) {
      setMessage('Please enter both email and password.')
      return
    }

    // ==========================
    // 📤 SEND DATA TO BACKEND
    // ==========================
    console.log("Entering 📤 SEND DATA TO BACKEND")

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })

    // ==========================
    // 📥 HANDLE RESPONSE
    // ==========================
    console.log("Entering 📥 HANDLE RESPONSE")

    const data = await res.json()

    if (!res.ok) {
      setMessage(data.error)
    } else {
      setMessage('✅ Valid Credentials')
      localStorage.setItem("role", data.user.role)

      // Redirect based on role
      if (data.user.role === "admin") {
        router.push('/admin')
      } else {
        router.push('/')
      }
    }

    // UI only — we’ll connect to Supabase later
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
