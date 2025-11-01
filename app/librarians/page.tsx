'use client'
import { useMemo, useState } from 'react'

type Librarian = { userID: number; firstName: string; lastName: string; email: string }

const INITIAL: Librarian[] = [] // empty for now—will wire to Supabase later

export default function LibrariansPage() {
  const [q, setQ] = useState('')

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase()
    if (!term) return INITIAL
    return INITIAL.filter(l =>
      [l.firstName, l.lastName, l.email]
        .filter(Boolean)
        .some(x => x!.toLowerCase().includes(term))
    )
  }, [q])

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
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td className="p-3 text-slate-500" colSpan={4}>
                  No librarians yet.
                </td>
              </tr>
            ) : (
              filtered.map((l) => (
                <tr key={l.userID} className="border-t">
                  <td className="p-3">{l.userID}</td>
                  <td className="p-3">{l.firstName}</td>
                  <td className="p-3">{l.lastName}</td>
                  <td className="p-3">{l.email}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}
