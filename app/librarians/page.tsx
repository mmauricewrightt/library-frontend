'use client'
import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../../lib/supabase'

type Librarian = {
  userid: number
  firstname: string
  lastname: string
  email: string
  usertype: string
}

export default function LibrariansPage() {
  const [q, setQ] = useState('')
  const [data, setData] = useState<Librarian[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      setError(null)
      const { data, error } = await supabase
        .from('users') // table name in Supabase
        .select('*')
        .eq('usertype', 'librarian') // only librarians
        .order('userid', { ascending: true })

      if (cancelled) return
      if (error) setError(error.message)
      else setData((data as Librarian[]) || [])
      setLoading(false)
    }
    load()
    return () => { cancelled = true }
  }, [])

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase()
    if (!term) return data
    return data.filter(l =>
      [l.firstname, l.lastname, l.email]
        .filter(Boolean)
        .some(x => x!.toLowerCase().includes(term))
    )
  }, [q, data])

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Librarians</h1>

      <div className="flex gap-2">
        <input
          className="border rounded-md p-2 w-full"
          placeholder="Search by name or email…"
          value={q}
          onChange={e => setQ(e.target.value)}
        />
        <button
          onClick={() => setQ('')}
          className="px-3 py-2 rounded-md border bg-white hover:bg-slate-50"
        >
          Clear
        </button>
      </div>

      <div className="overflow-auto border rounded-xl bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-slate-700">
            <tr>
              <th className="text-left p-3">#</th>
              <th className="text-left p-3">First Name</th>
              <th className="text-left p-3">Last Name</th>
              <th className="text-left p-3">Email</th>
              <th className="text-left p-3">User Type</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td className="p-3" colSpan={5}>Loading…</td></tr>
            ) : error ? (
              <tr><td className="p-3 text-red-600" colSpan={5}>Error: {error}</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td className="p-3 text-slate-500" colSpan={5}>No librarians found.</td></tr>
            ) : (
              filtered.map(l => (
                <tr key={l.userid} className="border-t">
                  <td className="p-3">{l.userid}</td>
                  <td className="p-3">{l.firstname}</td>
                  <td className="p-3">{l.lastname}</td>
                  <td className="p-3">{l.email}</td>
                  <td className="p-3">{l.usertype}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}
